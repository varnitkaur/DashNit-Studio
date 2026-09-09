import { CraftCard, CraftStage, CatalogProduct, RawMaterial, LogisticsOrder } from '../types';

const API_BASE = '/api/v1';

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
