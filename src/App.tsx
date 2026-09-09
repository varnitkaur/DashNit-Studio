import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CraftingBoard } from './components/CraftingBoard';
import { CatalogInventory } from './components/CatalogInventory';
import { OrdersLogistics } from './components/OrdersLogistics';
import { AnalyticsRevenue } from './components/AnalyticsRevenue';
import { ArchitectureView } from './components/ArchitectureView';
import { CustomOrderStudio } from './components/CustomOrderStudio';
import { AIConciergeModal } from './components/AIConciergeModal';
import { ScannerWorkbenchModal } from './components/ScannerWorkbenchModal';
import { GeminiVisionQCModal } from './components/GeminiVisionQCModal';
import { CustomerTrackingPortalModal } from './components/CustomerTrackingPortalModal';
import { CorporateGiftingModal } from './components/CorporateGiftingModal';
import { ArtisanWageLedgerModal } from './components/ArtisanWageLedgerModal';
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
import { ActiveNavTab, CraftCard, CraftStage, LogisticsOrder, RawMaterial, UserRole, AtelierHub } from './types';
import { getStoredState, saveStoredState } from './utils/storage';
import { useBarcodeScanner } from './utils/scannerListener';
import { CheckCircle2 } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('crafting-queue');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentRole, setCurrentRole] = useState<UserRole>('atelier_manager');
  const [currentHub, setCurrentHub] = useState<AtelierHub>(() =>
    getStoredState<AtelierHub>('current_hub', 'jaipur_02')
  );

  // Persistent main data states
  const [craftCards, setCraftCards] = useState<CraftCard[]>(() =>
    getStoredState<CraftCard[]>('craft_cards', initialCraftCards)
  );
  const [products, setProducts] = useState(() =>
    getStoredState('catalog_products', mockCatalogProducts)
  );
  const [rawMaterials, setRawMaterials] = useState(() =>
    getStoredState('raw_materials', mockRawMaterials)
  );
  const [logisticsOrders, setLogisticsOrders] = useState(() =>
    getStoredState('logistics_orders', mockLogisticsOrders)
  );

  // Sync state to local storage
  useEffect(() => {
    saveStoredState('craft_cards', craftCards);
  }, [craftCards]);

  useEffect(() => {
    saveStoredState('catalog_products', products);
  }, [products]);

  useEffect(() => {
    saveStoredState('raw_materials', rawMaterials);
  }, [rawMaterials]);

  useEffect(() => {
    saveStoredState('logistics_orders', logisticsOrders);
  }, [logisticsOrders]);

  useEffect(() => {
    saveStoredState('current_hub', currentHub);
  }, [currentHub]);

  // Modals state
  const [inspectCard, setInspectCard] = useState<CraftCard | null>(null);
  const [showBatchSheet, setShowBatchSheet] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [showPOModal, setShowPOModal] = useState(false);
  const [showAIConcierge, setShowAIConcierge] = useState(false);
  const [showScannerWorkbench, setShowScannerWorkbench] = useState(false);
  const [visionQCCard, setVisionQCCard] = useState<CraftCard | null>(null);
  const [showCustomerTrackModal, setShowCustomerTrackModal] = useState(false);
  const [showCorporateModal, setShowCorporateModal] = useState(false);
  const [showWageLedgerModal, setShowWageLedgerModal] = useState(false);
  const [selectedRawForPO, setSelectedRawForPO] = useState<RawMaterial | undefined>(undefined);
  const [selectedOrderForLabel, setSelectedOrderForLabel] = useState<LogisticsOrder | null>(null);
  const [globalToast, setGlobalToast] = useState<string | null>(null);

  // Global physical laser barcode scanner listener
  useBarcodeScanner((scannedCode) => {
    setShowScannerWorkbench(true);
    triggerToast(`Hardware Laser Scanner: Detected barcode "${scannedCode}"`);
  });

  const handlePassQC = (cardId: string) => {
    setCraftCards((prev) =>
      prev.map((c) =>
        c.id === cardId
          ? {
              ...c,
              tag: 'VISION QC CERTIFIED',
              details: {
                ...c.details,
                qcPassed: true,
                qcChecks: [
                  'Surface Smoothness 99% (Gemini Vision)',
                  'Wick Plumb Centered (<0.5mm deviation)',
                  'Gold Vinyl Debossing Crisp',
                  'Presentation & Wax Seal Verified',
                ],
              },
            }
          : c
      )
    );
  };

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

  // Phase 5: B2B Corporate Gifting Batch Queuing Handler
  const handleQueueCorporateBatch = (
    batchCards: CraftCard[],
    companyName: string,
    count: number
  ) => {
    setCraftCards((prev) => [...batchCards, ...prev]);
    triggerToast(`B2B Corporate Batch: Queued ${count} units for "${companyName}"!`);
    setTimeout(() => {
      setActiveTab('crafting-queue');
    }, 800);
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
        onOpenAIConcierge={() => setShowAIConcierge(true)}
        onOpenScanner={() => setShowScannerWorkbench(true)}
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        currentHub={currentHub}
        onHubChange={(hub) => {
          setCurrentHub(hub);
          triggerToast(`Switched Atelier Hub to ${hub.toUpperCase()}`);
        }}
        onOpenCorporateGifting={() => setShowCorporateModal(true)}
        onOpenCustomerTracking={() => setShowCustomerTrackModal(true)}
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
          onOpenWageLedger={() => setShowWageLedgerModal(true)}
          onOpenCorporateGifting={() => setShowCorporateModal(true)}
          onOpenCustomerTracking={() => setShowCustomerTrackModal(true)}
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
              onOpenVisionQC={(card) => setVisionQCCard(card)}
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

      {/* Gemini AI Artisan Concierge Modal */}
      {showAIConcierge && (
        <AIConciergeModal
          onClose={() => setShowAIConcierge(false)}
          onCommissionCreated={handleCommissionCreated}
        />
      )}

      {/* Atelier Barcode & QR Scanner Workbench */}
      {showScannerWorkbench && (
        <ScannerWorkbenchModal
          cards={craftCards}
          onClose={() => setShowScannerWorkbench(false)}
          onUpdateStage={handleUpdateCardStage}
          onInspectCard={(card) => setInspectCard(card)}
          onTriggerToast={triggerToast}
        />
      )}

      {/* Gemini Vision Automated QC Surface Auditor */}
      {visionQCCard && (
        <GeminiVisionQCModal
          card={visionQCCard}
          onClose={() => setVisionQCCard(null)}
          onPassQC={handlePassQC}
          onTriggerToast={triggerToast}
        />
      )}

      {/* Phase 5: Customer Live Tracking Portal */}
      {showCustomerTrackModal && (
        <CustomerTrackingPortalModal
          cards={craftCards}
          logisticsOrders={logisticsOrders}
          onClose={() => setShowCustomerTrackModal(false)}
        />
      )}

      {/* Phase 5: B2B Corporate Gifting Engine */}
      {showCorporateModal && (
        <CorporateGiftingModal
          onClose={() => setShowCorporateModal(false)}
          onQueueCorporateBatch={handleQueueCorporateBatch}
          onTriggerToast={triggerToast}
        />
      )}

      {/* Phase 5: Artisan Piece-Rate Wage & Payroll Ledger */}
      {showWageLedgerModal && (
        <ArtisanWageLedgerModal
          onClose={() => setShowWageLedgerModal(false)}
          onTriggerToast={triggerToast}
        />
      )}
    </div>
  );
}

export default App;
