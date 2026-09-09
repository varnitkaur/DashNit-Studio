import { AICommissionParseResult, CraftType } from '../types';

/**
 * Client-Side Heuristic Fallback Engine
 * Ensures 100% uninterrupted operation if offline or running Vite standalone
 */
export function parseCommissionHeuristically(text: string): AICommissionParseResult {
  const lower = text.toLowerCase();
  const isCrochet =
    lower.includes('crochet') ||
    lower.includes('tote') ||
    lower.includes('yarn') ||
    lower.includes('bag') ||
    lower.includes('throw') ||
    lower.includes('blanket') ||
    lower.includes('stitch') ||
    lower.includes('wool');

  const isWaxMelt = lower.includes('wax melt') || lower.includes('melt') || lower.includes('tarts');
  const craftType: CraftType = isCrochet ? 'crochet' : isWaxMelt ? 'wax_melt' : 'candle';

  // Extract phone if present
  const phoneMatch = text.match(/(?:\+91[\s-]?)?[6789]\d{9}|(?:\+91[\s-]?)?\d{5}[\s-]?\d{5}/);
  const customerPhone = phoneMatch ? phoneMatch[0] : '+91 98765 43210';

  // Extract customer name
  let customerName = 'Valued Guest';
  const nameMatch = text.match(/(?:from|name is|i am|for|client:)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
  if (nameMatch) {
    customerName = nameMatch[1].trim();
  } else if (lower.includes('maya')) {
    customerName = 'Maya Kapoor';
  } else if (lower.includes('ananya')) {
    customerName = 'Ananya Sharma';
  } else if (lower.includes('rhea')) {
    customerName = 'Rhea K.';
  } else if (lower.includes('priya')) {
    customerName = 'Priya Mehta';
  }

  // Inscription
  let vinylInscription: string | undefined;
  const quoteMatch = text.match(/[“"']([^"']{3,45})[”"']/);
  if (quoteMatch) {
    vinylInscription = `“${quoteMatch[1]}”`;
  } else if (lower.includes('happy 25th')) {
    vinylInscription = '“Happy 25th Maya!”';
  } else if (lower.includes('anniversary')) {
    vinylInscription = '“Forever & Always”';
  } else if (lower.includes('warmth') || lower.includes('blessed')) {
    vinylInscription = '“May this home be blessed with warmth”';
  }

  // Scent matching
  let scentProfile: string | undefined;
  if (!isCrochet) {
    if (lower.includes('lavender')) scentProfile = 'French Lavender & Himalayan Cedarwood';
    else if (lower.includes('sandalwood') || lower.includes('chandan')) scentProfile = 'Royal Mysore Sandalwood & Amber';
    else if (lower.includes('vanilla') || lower.includes('cashmere')) scentProfile = 'Madagascar Vanilla Bean & Warm Cashmere';
    else if (lower.includes('rose') || lower.includes('floral')) scentProfile = 'Indian Damascena Rose & Smoked Oud';
    else scentProfile = 'French Lavender & Pure Cedarwood';
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
        { name: 'Oatmeal Wool', hex: '#E5DBD0' },
      ];
    }
  }

  // Monogram
  let monogram: string | undefined;
  const monoMatch = text.match(/\b([A-Z]\.[A-Z]\.?|[A-Z]{2,3})\b/);
  if (monoMatch && isCrochet) {
    monogram = monoMatch[1];
  } else if (isCrochet && lower.includes('monogram')) {
    monogram = 'M.K.';
  }

  const isUrgent =
    lower.includes('urgent') ||
    lower.includes('asap') ||
    lower.includes('tomorrow') ||
    lower.includes('rush') ||
    lower.includes('2 days') ||
    lower.includes('saturday') ||
    lower.includes('birthday');

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
        ? 'Custom Daisy Motif Crochet Tote'
        : 'Botanical Wax Melt Gift Box',
    subtitle:
      craftType === 'candle'
        ? `Scent: ${scentProfile} • Amber Glass Jar`
        : `Yarn: ${yarnPalette?.map((y) => y.name).join(' + ')}`,
    scentProfile,
    vinylInscription,
    yarnPalette,
    monogram,
    giftNote: text.length > 25 ? `“${text.slice(0, 120)}...”` : undefined,
    price,
    urgent: isUrgent,
    leadTimeDays,
    confidenceScore: 0.96,
    aiHarmonyRecommendation:
      craftType === 'candle'
        ? 'Formulation: 8.5% Botanical Fragrance Load infused at 65°C in Pure Soy Wax 464 with crackling Rosewood Wick.'
        : 'Stitch Architecture: GOTS-Certified 4-Ply Organic Combed Cotton in reinforced double-crochet stitch.',
  };
}

/**
 * Main Client API Dispatcher
 * Calls the Express server `/api/v1/ai/parse-commission` with graceful fallback
 */
export async function requestAICommissionParse(message: string): Promise<{
  data: AICommissionParseResult;
  source: string;
}> {
  try {
    const res = await fetch('/api/v1/ai/parse-commission', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.data) {
        return { data: json.data, source: json.source || 'server_api' };
      }
    }
  } catch {
    // Network or server offline; proceed directly to client heuristic engine
  }

  // Instant client-side execution
  return {
    data: parseCommissionHeuristically(message),
    source: 'client_heuristic_engine',
  };
}
