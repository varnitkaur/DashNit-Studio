import {
  CraftCard,
  CraftStage,
  CatalogProduct,
  RawMaterial,
  LogisticsOrder,
  UserProfile,
  CartItem,
  UserCart,
} from '../types';

const API_BASE = '/api/v1';

// Auth Services (Role-Based: Customer vs Admin)
export async function apiLogin(credentials: {
  email?: string;
  role?: string;
  phone?: string;
}): Promise<UserProfile | null> {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        return data.data;
      }
    }
  } catch (err) {
    console.warn('[API] Auth login error, falling back:', err);
  }
  return null;
}

export async function apiRegister(payload: {
  name: string;
  email: string;
  phone?: string;
  role?: string;
}): Promise<UserProfile | null> {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        return data.data;
      }
    }
  } catch (err) {
    console.warn('[API] Auth register error:', err);
  }
  return null;
}

// Cart Tracking Services ("Kisi ne add to cart kiya to uska data dikhna chahiye")
export async function apiFetchCart(userId: string): Promise<UserCart | null> {
  try {
    const res = await fetch(`${API_BASE}/cart/${encodeURIComponent(userId)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        return data.data;
      }
    }
  } catch (err) {
    console.warn('[API] Could not fetch user cart:', err);
  }
  return null;
}

export async function apiSaveCart(
  userId: string,
  items: CartItem[],
  customerName?: string,
  customerPhone?: string,
  customerEmail?: string
): Promise<void> {
  try {
    await fetch(`${API_BASE}/cart/${encodeURIComponent(userId)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, customerName, customerPhone, customerEmail }),
    });
  } catch (err) {
    console.warn('[API] Could not persist cart update:', err);
  }
}

export async function apiEmptyCart(userId: string): Promise<void> {
  try {
    await fetch(`${API_BASE}/cart/${encodeURIComponent(userId)}`, {
      method: 'DELETE',
    });
  } catch (err) {
    console.warn('[API] Could not empty cart:', err);
  }
}

export async function apiFetchActiveCarts(): Promise<UserCart[]> {
  try {
    const res = await fetch(`${API_BASE}/admin/active-carts`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        return data.data;
      }
    }
  } catch (err) {
    console.warn('[API] Could not fetch active carts for admin:', err);
  }
  return [];
}

// Customer Orders
export async function apiFetchCustomerOrders(customerName: string): Promise<LogisticsOrder[]> {
  try {
    const res = await fetch(`${API_BASE}/orders/customer/${encodeURIComponent(customerName)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        return data.data;
      }
    }
  } catch (err) {
    console.warn('[API] Could not fetch customer orders:', err);
  }
  return [];
}

// Craft Cards
export async function apiFetchCraftCards(): Promise<CraftCard[] | null> {
  try {
    const res = await fetch(`${API_BASE}/cards`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        return data.data;
      }
    }
  } catch (err) {
    console.warn('[API] Could not fetch cards from backend, using local fallback:', err);
  }
  return null;
}

export async function apiCreateCraftCard(card: CraftCard): Promise<void> {
  try {
    await fetch(`${API_BASE}/cards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card),
    });
  } catch (err) {
    console.warn('[API] Could not persist new card to backend:', err);
  }
}

export async function apiUpdateCardStage(id: string, stage: CraftStage): Promise<void> {
  try {
    await fetch(`${API_BASE}/cards/${encodeURIComponent(id)}/stage`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage }),
    });
  } catch (err) {
    console.warn(`[API] Could not update card ${id} stage to backend:`, err);
  }
}

export async function apiUpdateCardDetails(id: string, payload: Partial<CraftCard>): Promise<void> {
  try {
    await fetch(`${API_BASE}/cards/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn(`[API] Could not update card ${id} details to backend:`, err);
  }
}

// Catalog Products
export async function apiFetchProducts(): Promise<CatalogProduct[] | null> {
  try {
    const res = await fetch(`${API_BASE}/products`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        return data.data;
      }
    }
  } catch (err) {
    console.warn('[API] Could not fetch products from backend, using local fallback:', err);
  }
  return null;
}

export async function apiTriggerBatchPour(sku: string): Promise<void> {
  try {
    await fetch(`${API_BASE}/products/${encodeURIComponent(sku)}/stock`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ delta: 12, criticalLow: false, statusText: 'Batch #JA-2402 in progress' }),
    });
  } catch (err) {
    console.warn(`[API] Could not update product ${sku} stock to backend:`, err);
  }
}

// Raw Materials
export async function apiFetchRawMaterials(): Promise<RawMaterial[] | null> {
  try {
    const res = await fetch(`${API_BASE}/raw-materials`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        return data.data;
      }
    }
  } catch (err) {
    console.warn('[API] Could not fetch raw materials from backend, using local fallback:', err);
  }
  return null;
}

export async function apiReorderRawMaterial(name: string, qtyText: string): Promise<void> {
  try {
    await fetch(`${API_BASE}/raw-materials/${encodeURIComponent(name)}/reorder`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ addStock: 25, note: `PO Sent via WhatsApp (${qtyText})` }),
    });
  } catch (err) {
    console.warn(`[API] Could not update raw material ${name} to backend:`, err);
  }
}

// Logistics Orders
export async function apiFetchLogisticsOrders(): Promise<LogisticsOrder[] | null> {
  try {
    const res = await fetch(`${API_BASE}/orders`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        return data.data;
      }
    }
  } catch (err) {
    console.warn('[API] Could not fetch logistics orders from backend, using local fallback:', err);
  }
  return null;
}

export async function apiCreateOrder(order: LogisticsOrder): Promise<void> {
  try {
    await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
  } catch (err) {
    console.warn('[API] Could not persist new order:', err);
  }
}
