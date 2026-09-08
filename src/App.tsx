import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CraftingBoard } from './components/CraftingBoard';
import { CatalogInventory } from './components/CatalogInventory';
import { OrdersLogistics } from './components/OrdersLogistics';
import { AnalyticsRevenue } from './components/AnalyticsRevenue';
import { ArchitectureView } from './components/ArchitectureView';
import { CustomOrderStudio } from './components/CustomOrderStudio';
import {
  InspectCardModal,
  DailyBatchSheetModal,
  PurchaseOrderModal,
  ShippingLabelModal,
  DocsModal,
} from './components/Modals';
import {
  initialCraftCards,
  mockCatalogProducts,
  mockRawMaterials,
  mockLogisticsOrders,
} from './data/mockData';
import { ActiveNavTab, CraftCard, CraftStage, LogisticsOrder, RawMaterial } from './types';
import { CheckCircle2 } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('crafting-queue');
  const [searchQuery, setSearchQuery] = useState('');

  // Main data states
  const [craftCards, setCraftCards] = useState<CraftCard[]>(initialCraftCards);
  const [products, setProducts] = useState(mockCatalogProducts);
  const [rawMaterials, setRawMaterials] = useState(mockRawMaterials);
  const [logisticsOrders, setLogisticsOrders] = useState(mockLogisticsOrders);

  // Modals state
  const [inspectCard, setInspectCard] = useState<CraftCard | null>(null);
  const [showBatchSheet, setShowBatchSheet] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [showPOModal, setShowPOModal] = useState(false);
  const [selectedRawForPO, setSelectedRawForPO] = useState<RawMaterial | undefined>(undefined);
  const [selectedOrderForLabel, setSelectedOrderForLabel] = useState<LogisticsOrder | null>(null);
  const [globalToast, setGlobalToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setGlobalToast(msg);
    setTimeout(() => setGlobalToast(null), 3500);
  };

  // Stage change handler
  const handleUpdateCardStage = (cardId: string, newStage: CraftStage) => {
    setCraftCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, stage: newStage } : c))
    );
  };

  // Commission creation handler
  const handleCommissionCreated = (newCard: CraftCard) => {
    setCraftCards((prev) => [newCard, ...prev]);
    triggerToast(`New commission ${newCard.id} successfully queued into Jaipur Atelier!`);
    // Optional: Switch to crafting queue to show the live update
    setTimeout(() => {
      setActiveTab('crafting-queue');
    }, 1200);
  };

  // Purchase Order submission handler
  const handleSubmitPO = (materialName: string, qty: string) => {
    setRawMaterials((prev) =>
      prev.map((m) =>
        m.name === materialName
          ? {
              ...m,
              status: 'normal',
              stockLevel: m.stockLevel + 25,
              note: `PO Sent via WhatsApp (${qty})`,
            }
          : m
      )
    );
    triggerToast(`Automated WhatsApp PO sent to mill for ${qty} of ${materialName}`);
  };

  // Batch pour trigger handler
  const handleTriggerBatchPour = (sku: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.sku === sku
          ? {
              ...p,
              stockCount: (p.stockCount || 0) + 12,
              criticalLow: false,
              statusText: 'Batch #JA-2402 in progress',
            }
          : p
      )
    );
    triggerToast(`Triggered batch pour for SKU: ${sku}`);
  };

  const lowStockCount = rawMaterials.filter(
    (m) => m.status === 'low' || m.status === 'critical'
  ).length;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D221E] flex flex-col font-['Plus_Jakarta_Sans']">
      {/* Global Toast */}
      {globalToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#2D221E] text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top-3 border border-[#9d3e1d]">
          <CheckCircle2 className="w-4 h-4 text-[#A3D9BC]" />
          <span>{globalToast}</span>
        </div>
      )}

      {/* Fixed Top Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewCommission={() => setActiveTab('custom-studio')}
        totalActiveOrders={craftCards.length}
      />

      <div className="flex flex-1 pt-16">
        {/* Fixed Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          craftingActiveCount={craftCards.length}
          lowStockCount={lowStockCount}
          readyOrdersCount={logisticsOrders.filter((o) => o.status === 'ready_for_packing' || o.status === 'manifested').length}
          onOpenDocs={() => setShowDocs(true)}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 ml-64 p-6 lg:p-8 max-w-[1600px] overflow-x-hidden">
          {activeTab === 'crafting-queue' && (
            <CraftingBoard
              cards={craftCards}
              onUpdateCardStage={handleUpdateCardStage}
              onOpenNewCommission={() => setActiveTab('custom-studio')}
              onOpenBatchSheet={() => setShowBatchSheet(true)}
              onOpenOfflineSlips={() => setShowBatchSheet(true)}
              onInspectCard={(card) => setInspectCard(card)}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === 'catalog-and-inventory' && (
            <CatalogInventory
              products={products}
              rawMaterials={rawMaterials}
              onAddProduct={() => {
                triggerToast('Opening catalog SKU registration wizard...');
              }}
              onOpenPurchaseOrder={(raw) => {
                setSelectedRawForPO(raw);
                setShowPOModal(true);
              }}
              onTriggerBatchPour={handleTriggerBatchPour}
            />
          )}

          {activeTab === 'orders-and-logistics' && (
            <OrdersLogistics
              orders={logisticsOrders}
              onOpenLabelModal={(order) => setSelectedOrderForLabel(order)}
              onOpenGiftNoteModal={(order) => {
                triggerToast(`Printing calligraphy wax-sealed gift note for ${order.customerName}...`);
              }}
              onOpenBatchManifestModal={() => {
                triggerToast('Generating batch 3PL manifest & courier handover sheet (PDF)...');
              }}
            />
          )}

          {activeTab === 'analytics-and-revenue' && <AnalyticsRevenue />}

          {activeTab === 'architecture' && <ArchitectureView />}

          {activeTab === 'custom-studio' && (
            <CustomOrderStudio onCommissionCreated={handleCommissionCreated} />
          )}
        </main>
      </div>

      {/* Modals */}
      {inspectCard && (
        <InspectCardModal
          card={inspectCard}
          onClose={() => setInspectCard(null)}
          onUpdateStage={handleUpdateCardStage}
        />
      )}

      {showBatchSheet && (
        <DailyBatchSheetModal
          cards={craftCards}
          onClose={() => setShowBatchSheet(false)}
        />
      )}

      {showPOModal && (
        <PurchaseOrderModal
          rawMaterial={selectedRawForPO}
          onClose={() => setShowPOModal(false)}
          onSubmitPO={handleSubmitPO}
        />
      )}

      {selectedOrderForLabel && (
        <ShippingLabelModal
          order={selectedOrderForLabel}
          onClose={() => setSelectedOrderForLabel(null)}
        />
      )}

      {showDocs && <DocsModal onClose={() => setShowDocs(false)} />}
    </div>
  );
}

export default App;
