import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { GoogleGenAI } from '@google/genai';
import { AICommissionParseResult, CraftType } from './types';
import { connectDatabase } from './db';
import { CraftCardModel } from './models/CraftCard';
import { ProductModel } from './models/Product';
import { RawMaterialModel } from './models/RawMaterial';
import { LogisticsOrderModel } from './models/LogisticsOrder';
import { UserModel } from './models/User';
import { CartModel } from './models/Cart';
import {
  initialCraftCards,
  mockCatalogProducts,
  mockRawMaterials,
  mockLogisticsOrders,
  seedUsers,
  initialCarts,
} from './seedData';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Enable CORS for local Vite dev server
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Connect to MongoDB Atlas
connectDatabase();

// Heuristic fallback parser when Gemini API key is not configured or offline
function heuristicParse(text: string): AICommissionParseResult {
  const lower = text.toLowerCase();
  const isCrochet =
    lower.includes('crochet') ||
    lower.includes('tote') ||
    lower.includes('yarn') ||
    lower.includes('bag') ||
    lower.includes('throw') ||
    lower.includes('blanket') ||
    lower.includes('stitch');

  const isWaxMelt = lower.includes('wax melt') || lower.includes('melt');
  const craftType: CraftType = isCrochet ? 'crochet' : isWaxMelt ? 'wax_melt' : 'candle';

  // Extract phone if present
  const phoneMatch = text.match(/(?:\+91[\s-]?)?[6789]\d{9}|(?:\+91[\s-]?)?\d{5}[\s-]?\d{5}/);
  const customerPhone = phoneMatch ? phoneMatch[0] : '+91 98765 43210';

  // Extract customer name (heuristics)
  let customerName = 'Valued Client';
  const nameIntroMatch = text.match(/(?:from|name is|i am|for|client:)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
  if (nameIntroMatch) {
    customerName = nameIntroMatch[1].trim();
  } else if (lower.includes('maya')) {
    customerName = 'Maya Kapoor';
  } else if (lower.includes('ananya')) {
    customerName = 'Ananya Sharma';
  } else if (lower.includes('rhea')) {
    customerName = 'Rhea K.';
  }

  // Inscription
  let vinylInscription: string | undefined;
  const quoteMatch = text.match(/[“"']([^"']{3,40})[”"']/);
  if (quoteMatch) {
    vinylInscription = `“${quoteMatch[1]}”`;
  } else if (lower.includes('happy') || lower.includes('birthday') || lower.includes('anniversary')) {
    vinylInscription = '“Celebrating with Light & Love”';
  }

  // Scent matching
  let scentProfile: string | undefined;
  if (!isCrochet) {
    if (lower.includes('lavender')) scentProfile = 'French Lavender & Cedarwood';
    else if (lower.includes('sandalwood') || lower.includes('chandan')) scentProfile = 'Royal Mysore Sandalwood & Amber';
    else if (lower.includes('vanilla')) scentProfile = 'Warm Cashmere & Madagascar Vanilla';
    else if (lower.includes('rose')) scentProfile = 'Indian Rose & Oud Damascena';
    else scentProfile = 'French Lavender & Himalayan Cedar';
  }

  // Yarn palette
  let yarnPalette: { name: string; hex: string }[] | undefined;
  if (isCrochet) {
    yarnPalette = [
      { name: 'Sage Leaf', hex: '#8EA885' },
      { name: 'Warm Buttercup', hex: '#F4D35E' },
    ];
    if (lower.includes('terracotta') || lower.includes('rust')) {
      yarnPalette = [
        { name: 'Terracotta', hex: '#9d3e1d' },
        { name: 'Oatmeal', hex: '#E5DBD0' },
      ];
    }
  }

  // Monogram
  let monogram: string | undefined;
  const monoMatch = text.match(/\b([A-Z]\.[A-Z]\.?|[A-Z]{2,3})\b/);
  if (monoMatch && isCrochet) {
    monogram = monoMatch[1];
  }

  const isUrgent =
    lower.includes('urgent') ||
    lower.includes('asap') ||
    lower.includes('tomorrow') ||
    lower.includes('rush') ||
    lower.includes('2 days') ||
    lower.includes('anniversary');

  const price = isCrochet ? 1499 : isWaxMelt ? 499 : 849;
  const leadTimeDays = isUrgent ? 2 : isCrochet ? 5 : 4;

  return {
    customerName,
    customerPhone,
    craftType,
    title:
      craftType === 'candle'
        ? `Bespoke Soy Candle (${scentProfile?.split('&')[0].trim() || 'Botanical Blend'})`
        : craftType === 'crochet'
        ? 'Handcrafted Daisy Motif Tote'
        : 'Botanical Wax Melt Gift Box',
    subtitle:
      craftType === 'candle'
        ? `Scent: ${scentProfile} • Amber Glass Jar`
        : `Yarn: ${yarnPalette?.map((y) => y.name).join(' + ')}`,
    scentProfile,
    vinylInscription,
    yarnPalette,
    monogram,
    giftNote: text.length > 20 ? text : undefined,
    price,
    urgent: isUrgent,
    leadTimeDays,
    confidenceScore: 0.94,
    aiHarmonyRecommendation:
      craftType === 'candle'
        ? 'Formulation Suggestion: 8.5% fragrance load in Pure Golden Wax 464 with crackling Rosewood Wick for optimal scent throw.'
        : 'Material Suggestion: 100% GOTS-Certified 4-Ply Organic Combed Cotton in double-crochet density.',
  };
}

/**
 * AI Concierge Endpoint: POST /api/v1/ai/parse-commission
 */
app.post('/api/v1/ai/parse-commission', async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Valid message text is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    const parsed = heuristicParse(message);
    return res.json({
      success: true,
      source: 'heuristic_fallback',
      data: parsed,
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are the lead Artisan Concierge at DashNit Crochet & Candle atelier in Jaipur, India.
Analyze this inbound customer custom order inquiry and extract structured workshop commission data.

Inbound Customer Inquiry:
"""${message}"""

Respond ONLY with a valid, clean JSON object (no markdown quotes, no explanations) adhering strictly to this schema:
{
  "customerName": "Full name or Valued Client",
  "customerPhone": "Indian phone number with +91 if found, else default '+91 98765 43210'",
  "craftType": "candle" or "crochet" or "wax_melt",
  "title": "Concise artisanal title, e.g. Bespoke Soy Candle (Amber Jar)",
  "subtitle": "Specifications summary, e.g. French Lavender & Cedarwood • Wood Wick",
  "scentProfile": "Primary botanical scent notes, or null for crochet",
  "vinylInscription": "Gold vinyl inscription to print on glass or null",
  "yarnPalette": [{"name": "Color Name", "hex": "#HEX"}],
  "monogram": "2-3 letter initials for embroidery or null",
  "giftNote": "Personalized gift note text to print on card or null",
  "price": number in INR,
  "urgent": boolean true if deadline < 48 hours or mentions urgent/rush,
  "leadTimeDays": number estimated days,
  "confidenceScore": number between 0.85 and 1.0,
  "aiHarmonyRecommendation": "Artisan note on wick/wax/yarn pairing"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const outputText = response.text || '';
    const cleanJsonText = outputText
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    const parsed: AICommissionParseResult = JSON.parse(cleanJsonText);

    return res.json({
      success: true,
      source: 'gemini_2_5_flash',
      data: parsed,
    });
  } catch (error) {
    console.warn('[Gemini AI Concierge] API call encountered error, falling back to heuristic engine:', error);
    const parsed = heuristicParse(message);
    return res.json({
      success: true,
      source: 'heuristic_fallback',
      data: parsed,
      notice: 'Fallback engaged due to API error or rate limits',
    });
  }
});

/* ==========================================================================
   CRAFT CARDS (KANBAN QUEUE) CRUD ENDPOINTS
   ========================================================================== */

app.get('/api/v1/cards', async (_req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const cards = await CraftCardModel.find().sort({ createdAt: -1 });
      if (cards.length > 0) {
        return res.json({ success: true, source: 'mongodb', data: cards });
      }
    }
    return res.json({ success: true, source: 'seed_memory', data: initialCraftCards });
  } catch (error) {
    console.error('Error fetching craft cards:', error);
    return res.json({ success: true, source: 'fallback_seed', data: initialCraftCards });
  }
});

app.post('/api/v1/cards', async (req: Request, res: Response) => {
  try {
    const cardData = req.body;
    if (!cardData.id || !cardData.title) {
      return res.status(400).json({ success: false, error: 'id and title are required' });
    }

    if (mongoose.connection.readyState === 1) {
      const savedCard = await CraftCardModel.findOneAndUpdate(
        { id: cardData.id },
        cardData,
        { upsert: true, new: true }
      );
      return res.status(201).json({ success: true, source: 'mongodb', data: savedCard });
    }
    return res.status(201).json({ success: true, source: 'memory_echo', data: cardData });
  } catch (error) {
    console.error('Error creating craft card:', error);
    return res.status(500).json({ success: false, error: 'Failed to create craft card' });
  }
});

app.patch('/api/v1/cards/:id/stage', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { stage } = req.body;

  if (!stage) {
    return res.status(400).json({ success: false, error: 'stage is required' });
  }

  try {
    if (mongoose.connection.readyState === 1) {
      const updatedCard = await CraftCardModel.findOneAndUpdate(
        { id },
        { $set: { stage } },
        { new: true }
      );
      if (updatedCard) {
        return res.json({ success: true, source: 'mongodb', data: updatedCard });
      }
    }
    return res.json({ success: true, source: 'memory_echo', data: { id, stage } });
  } catch (error) {
    console.error('Error updating card stage:', error);
    return res.status(500).json({ success: false, error: 'Failed to update stage' });
  }
});

app.patch('/api/v1/cards/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatePayload = req.body;

  try {
    if (mongoose.connection.readyState === 1) {
      const updatedCard = await CraftCardModel.findOneAndUpdate(
        { id },
        { $set: updatePayload },
        { new: true }
      );
      if (updatedCard) {
        return res.json({ success: true, source: 'mongodb', data: updatedCard });
      }
    }
    return res.json({ success: true, source: 'memory_echo', data: { id, ...updatePayload } });
  } catch (error) {
    console.error('Error updating craft card:', error);
    return res.status(500).json({ success: false, error: 'Failed to update craft card' });
  }
});

/* ==========================================================================
   CATALOG PRODUCTS CRUD ENDPOINTS
   ========================================================================== */

app.get('/api/v1/products', async (_req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const products = await ProductModel.find();
      if (products.length > 0) {
        return res.json({ success: true, source: 'mongodb', data: products });
      }
    }
    return res.json({ success: true, source: 'seed_memory', data: mockCatalogProducts });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.json({ success: true, source: 'fallback_seed', data: mockCatalogProducts });
  }
});

app.patch('/api/v1/products/:sku/stock', async (req: Request, res: Response) => {
  const { sku } = req.params;
  const { delta, stockCount, statusText, criticalLow } = req.body;

  try {
    if (mongoose.connection.readyState === 1) {
      const updateObj: Record<string, any> = {};
      if (typeof delta === 'number') {
        updateObj.$inc = { stockCount: delta };
      } else if (typeof stockCount === 'number') {
        updateObj.$set = { ...updateObj.$set, stockCount };
      }
      if (statusText !== undefined) {
        updateObj.$set = { ...updateObj.$set, statusText };
      }
      if (criticalLow !== undefined) {
        updateObj.$set = { ...updateObj.$set, criticalLow };
      }

      const updated = await ProductModel.findOneAndUpdate({ sku }, updateObj, { new: true });
      if (updated) {
        return res.json({ success: true, source: 'mongodb', data: updated });
      }
    }
    return res.json({ success: true, source: 'memory_echo', sku, delta, stockCount });
  } catch (error) {
    console.error('Error updating product stock:', error);
    return res.status(500).json({ success: false, error: 'Failed to update product stock' });
  }
});

/* ==========================================================================
   RAW MATERIALS CRUD ENDPOINTS
   ========================================================================== */

app.get('/api/v1/raw-materials', async (_req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const materials = await RawMaterialModel.find();
      if (materials.length > 0) {
        return res.json({ success: true, source: 'mongodb', data: materials });
      }
    }
    return res.json({ success: true, source: 'seed_memory', data: mockRawMaterials });
  } catch (error) {
    console.error('Error fetching raw materials:', error);
    return res.json({ success: true, source: 'fallback_seed', data: mockRawMaterials });
  }
});

app.patch('/api/v1/raw-materials/:name/reorder', async (req: Request, res: Response) => {
  const { name } = req.params;
  const { addStock = 25, note } = req.body;

  try {
    if (mongoose.connection.readyState === 1) {
      const updated = await RawMaterialModel.findOneAndUpdate(
        { name },
        {
          $inc: { stockLevel: addStock },
          $set: { status: 'normal', note: note || `PO Sent via WhatsApp (+${addStock})` },
        },
        { new: true }
      );
      if (updated) {
        return res.json({ success: true, source: 'mongodb', data: updated });
      }
    }
    return res.json({ success: true, source: 'memory_echo', name, addStock, note });
  } catch (error) {
    console.error('Error updating raw material:', error);
    return res.status(500).json({ success: false, error: 'Failed to update raw material' });
  }
});

/* ==========================================================================
   LOGISTICS ORDERS CRUD ENDPOINTS
   ========================================================================== */

app.get('/api/v1/orders', async (_req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const orders = await LogisticsOrderModel.find().sort({ createdAt: -1 });
      if (orders.length > 0) {
        return res.json({ success: true, source: 'mongodb', data: orders });
      }
    }
    return res.json({ success: true, source: 'seed_memory', data: mockLogisticsOrders });
  } catch (error) {
    console.error('Error fetching logistics orders:', error);
    return res.json({ success: true, source: 'fallback_seed', data: mockLogisticsOrders });
  }
});

app.post('/api/v1/orders', async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    // Always persist to memory cache for immediate responsiveness across all admin tabs
    mockLogisticsOrders.unshift(orderData);

    // Auto-generate Craft Cards for each item so artisan staff immediately sees it on the Kanban Board!
    if (Array.isArray(orderData.items)) {
      orderData.items.forEach((item: any, idx: number) => {
        initialCraftCards.unshift({
          id: orderData.orderId ? `${orderData.orderId}-${idx + 1}` : `DN-${Date.now().toString().slice(-4)}`,
          stage: 'new_placed',
          title: item.title,
          subtitle: orderData.shippingCity ? `${orderData.shippingCity} • Online Storefront` : 'Online Boutique Storefront',
          type: item.category === 'crochet' ? 'crochet' : item.category === 'wax_melt' ? 'wax_melt' : 'candle',
          customerName: orderData.customerName || 'Valued Client',
          customerPhone: orderData.customerPhone || '+91 98765 43210',
          price: (item.price || 849) * (item.quantity || 1),
          tag: item.fulfillmentMode === 'ready_to_ship' ? 'Ready to Ship' : 'Made to Order',
          dueText: 'Due in 4 days',
          details: {
            artisan: 'Dashrath M.',
            giftNote: item.customDetails,
          },
        });
      });
    }

    if (mongoose.connection.readyState === 1) {
      const newOrder = await LogisticsOrderModel.create(orderData);
      return res.status(201).json({ success: true, source: 'mongodb', data: newOrder });
    }
    return res.status(201).json({ success: true, source: 'memory_echo', data: orderData });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ success: false, error: 'Failed to create order' });
  }
});

app.get('/api/v1/orders/customer/:customerName', async (req: Request, res: Response) => {
  const { customerName } = req.params;
  try {
    if (mongoose.connection.readyState === 1) {
      const orders = await LogisticsOrderModel.find({
        customerName: { $regex: new RegExp(customerName, 'i') },
      }).sort({ createdAt: -1 });
      return res.json({ success: true, source: 'mongodb', data: orders });
    }
    const filtered = mockLogisticsOrders.filter((o) =>
      o.customerName.toLowerCase().includes(customerName.toLowerCase())
    );
    return res.json({ success: true, source: 'memory_echo', data: filtered });
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch customer orders' });
  }
});

/* ==========================================================================
   ROLE-BASED AUTHENTICATION ENDPOINTS (ADMIN VS CUSTOMER)
   ========================================================================== */

app.post('/api/v1/auth/login', async (req: Request, res: Response) => {
  const { email, role, phone } = req.body;

  try {
    if (mongoose.connection.readyState === 1) {
      let query: Record<string, any> = {};
      if (email) query.email = email.toLowerCase().trim();
      else if (phone) query.phone = phone.trim();

      let user = await UserModel.findOne(query);
      if (!user && (email || phone)) {
        // Find in seed users
        const foundSeed = seedUsers.find(
          (u) =>
            (email && u.email.toLowerCase() === email.toLowerCase()) ||
            (phone && u.phone === phone)
        );
        if (foundSeed) {
          user = await UserModel.create(foundSeed);
        }
      }

      if (user) {
        return res.json({
          success: true,
          source: 'mongodb',
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            avatar: user.avatar,
            token: `jwt-token-${user.id}-${Date.now()}`,
          },
        });
      }
    }

    // Fallback authentication using seedUsers list
    const fallbackUser = seedUsers.find(
      (u) =>
        (email && u.email.toLowerCase() === email.toLowerCase()) ||
        (role && u.role === role) ||
        (phone && u.phone === phone)
    );

    if (fallbackUser) {
      return res.json({
        success: true,
        source: 'seed_memory',
        data: {
          ...fallbackUser,
          token: `demo-token-${fallbackUser.id}`,
        },
      });
    }

    // Auto-create customer profile on the fly if not found
    const newCustomer = {
      id: `user-cust-${Date.now()}`,
      name: email ? email.split('@')[0] : 'Valued Client',
      email: email || 'guest@client.com',
      phone: phone || '+91 98765 00000',
      role: role || 'customer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    };

    return res.json({
      success: true,
      source: 'auto_guest',
      data: { ...newCustomer, token: `guest-token-${Date.now()}` },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ success: false, error: 'Login failed' });
  }
});

app.post('/api/v1/auth/register', async (req: Request, res: Response) => {
  const { name, email, phone, role = 'customer' } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Name and email are required' });
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name,
    email: email.toLowerCase().trim(),
    phone,
    role,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
  };

  try {
    if (mongoose.connection.readyState === 1) {
      const created = await UserModel.create(newUser);
      return res.status(201).json({ success: true, source: 'mongodb', data: created });
    }
    return res.status(201).json({ success: true, source: 'memory_echo', data: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

app.get('/api/v1/auth/users', async (_req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const users = await UserModel.find().sort({ role: 1 });
      if (users.length > 0) {
        return res.json({ success: true, source: 'mongodb', data: users });
      }
    }
    return res.json({ success: true, source: 'seed_memory', data: seedUsers });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.json({ success: true, source: 'seed_fallback', data: seedUsers });
  }
});

/* ==========================================================================
   CUSTOMER CART & REAL-TIME ACTIVITY TRACKING
   ("Kisi ne add to cart ya order kiya to uska data dikhna chahiye")
   ========================================================================== */

app.get('/api/v1/cart/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    if (mongoose.connection.readyState === 1) {
      const cart = await CartModel.findOne({ userId });
      if (cart) {
        return res.json({ success: true, source: 'mongodb', data: cart });
      }
    }
    const seedCart = initialCarts.find((c) => c.userId === userId);
    return res.json({
      success: true,
      source: 'memory_echo',
      data: seedCart || { userId, customerName: 'Guest', items: [], subtotal: 0, updatedAt: new Date().toISOString() },
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch cart' });
  }
});

app.post('/api/v1/cart/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { items, customerName, customerPhone, customerEmail } = req.body;

  const subtotal = Array.isArray(items)
    ? items.reduce((sum: number, item: any) => sum + (item.price || 0) * (item.quantity || 1), 0)
    : 0;

  const cartPayload = {
    userId,
    customerName: customerName || 'Valued Client',
    customerPhone,
    customerEmail,
    items: items || [],
    subtotal,
    updatedAt: new Date(),
  };

  try {
    // Update memory fallback state for immediate cross-tab reflection
    const existingIndex = initialCarts.findIndex((c) => c.userId === userId);
    if (existingIndex >= 0) {
      initialCarts[existingIndex] = {
        ...initialCarts[existingIndex],
        ...cartPayload,
        updatedAt: new Date().toISOString(),
      };
    } else {
      initialCarts.unshift({
        userId,
        customerName: customerName || 'Valued Client',
        customerPhone,
        items: items || [],
        subtotal,
        updatedAt: new Date().toISOString(),
      });
    }

    if (mongoose.connection.readyState === 1) {
      const updatedCart = await CartModel.findOneAndUpdate(
        { userId },
        { $set: cartPayload },
        { upsert: true, new: true }
      );
      return res.json({ success: true, source: 'mongodb', data: updatedCart });
    }
    return res.json({ success: true, source: 'memory_echo', data: cartPayload });
  } catch (error) {
    console.error('Error updating cart:', error);
    return res.status(500).json({ success: false, error: 'Failed to update cart' });
  }
});

app.delete('/api/v1/cart/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    // Clear in memory fallback as well
    const existingIndex = initialCarts.findIndex((c) => c.userId === userId);
    if (existingIndex >= 0) {
      initialCarts[existingIndex].items = [];
      initialCarts[existingIndex].subtotal = 0;
      initialCarts[existingIndex].updatedAt = new Date().toISOString();
    }

    if (mongoose.connection.readyState === 1) {
      await CartModel.findOneAndUpdate(
        { userId },
        { $set: { items: [], subtotal: 0, updatedAt: new Date() } }
      );
    }
    return res.json({ success: true, message: 'Cart emptied successfully' });
  } catch (error) {
    console.error('Error emptying cart:', error);
    return res.status(500).json({ success: false, error: 'Failed to empty cart' });
  }
});

/**
 * ADMIN ENDPOINT: Live Customer Cart & Ingestion Activity Monitor
 * Returns all active customer carts in the database so the atelier manager can see who is currently shopping!
 */
app.get('/api/v1/admin/active-carts', async (_req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const carts = await CartModel.find({ 'items.0': { $exists: true } }).sort({ updatedAt: -1 });
      if (carts.length > 0) {
        return res.json({ success: true, source: 'mongodb', data: carts });
      }
    }
    return res.json({ success: true, source: 'seed_memory', data: initialCarts });
  } catch (error) {
    console.error('Error fetching active carts for admin:', error);
    return res.json({ success: true, source: 'seed_fallback', data: initialCarts });
  }
});

/* ==========================================================================
   HEALTH CHECK
   ========================================================================== */

app.get('/api/v1/health', (_req: Request, res: Response) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus =
    dbState === 1 ? 'connected' : dbState === 2 ? 'connecting' : 'disconnected';

  res.json({
    status: 'operational',
    service: 'DashNit Studio Server & AI Concierge',
    atelier: 'Jaipur Craft House Unit 02',
    database: dbStatus,
    cluster: 'Cluster0.cljcckl.mongodb.net (dashnit_studio)',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
    timestamp: new Date().toISOString(),
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`[DashNit Server] Operations & MongoDB listening on http://localhost:${port}`);
  });
}

export default app;
