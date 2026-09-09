import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CraftingBoard } from './components/CraftingBoard';
import { CatalogInventory } from './components/CatalogInventory';
import { OrdersLogistics } from './components/OrdersLogistics';
import { AnalyticsRevenue } from './components/AnalyticsRevenue';
import { ArchitectureView } from './components/ArchitectureView';
import { CustomOrderStudio } from './components/CustomOrderStudio';
import { CustomerStorefront } from './components/CustomerStorefront';
import { CartDrawer } from './components/CartDrawer';
import { AdminCartActivityView } from './components/AdminCartActivityView';
import { AuthModal } from './components/AuthModal';
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
  seedUsers,
  initialCarts,
} from './data/mockData';
import {
  ActiveNavTab,
  CraftCard,
  CraftStage,
  LogisticsOrder,
  RawMaterial,
  UserRole,
  AtelierHub,
  UserProfile,
  CartItem,
} from './types';
import { getStoredState, saveStoredState } from './utils/storage';
import { useBarcodeScanner } from './utils/scannerListener';
import { CheckCircle2, ShoppingBag, ShieldCheck, ArrowRight, Clock } from 'lucide-react';
import {
  apiFetchCraftCards,
  apiCreateCraftCard,
  apiUpdateCardStage,
  apiUpdateCardDetails,
  apiFetchProducts,
  apiTriggerBatchPour,
  apiFetchRawMaterials,
  apiReorderRawMaterial,
  apiFetchLogisticsOrders,
  apiCreateOrder,
  apiFetchCart,
  apiSaveCart,
  apiEmptyCart,
} from './services/apiService';

export function App() {
  // Current logged in user (Customer vs Staff)
  const [currentUser, setCurrentUser] = useState<UserProfile>(() =>
    getStoredState<UserProfile>('current_user', seedUsers[0])
  );

  const [activeTab, setActiveTab] = useState<ActiveNavTab>(() =>
    currentUser.role === 'customer' ? 'customer-storefront' : 'crafting-queue'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [currentRole, setCurrentRole] = useState<UserRole>(currentUser.role);
  const [currentHub, setCurrentHub] = useState<AtelierHub>(() =>
    getStoredState<AtelierHub>('current_hub', 'jaipur_02')
  );

  // Cart State (Synced with MongoDB)
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    getStoredState<CartItem[]>('cart_items', initialCarts[0]?.items || [])
  );
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

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
    saveStoredState('current_user', currentUser);
    setCurrentRole(currentUser.role);
  }, [currentUser]);

  useEffect(() => {
    saveStoredState('cart_items', cartItems);
  }, [cartItems]);

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

  // Initial fetch from MongoDB backend with graceful fallback
  useEffect(() => {
    apiFetchCraftCards().then((remoteCards) => {
      if (remoteCards && remoteCards.length > 0) setCraftCards(remoteCards);
    });
    apiFetchProducts().then((remoteProducts) => {
      if (remoteProducts && remoteProducts.length > 0) setProducts(remoteProducts);
    });
    apiFetchRawMaterials().then((remoteRaw) => {
      if (remoteRaw && remoteRaw.length > 0) setRawMaterials(remoteRaw);
    });
    apiFetchLogisticsOrders().then((remoteOrders) => {
      if (remoteOrders && remoteOrders.length > 0) setLogisticsOrders(remoteOrders);
    });
    apiFetchCart(currentUser.id).then((remoteCart) => {
      if (remoteCart && remoteCart.items) {
        setCartItems(remoteCart.items);
      }
    });
  }, [currentUser.id]);

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

  const triggerToast = (msg: string) => {
    setGlobalToast(msg);
    setTimeout(() => setGlobalToast(null), 3500);
  };

  const handlePassQC = (cardId: string) => {
    const qcPayload = {
      tag: 'VISION QC CERTIFIED',
      details: {
        qcPassed: true,
        qcChecks: [
          'Surface Smoothness 99% (Gemini Vision)',
          'Wick Plumb Centered (<0.5mm deviation)',
          'Gold Vinyl Debossing Crisp',
          'Presentation & Wax Seal Verified',
        ],
      },
    };
    setCraftCards((prev) =>
      prev.map((c) =>
        c.id === cardId
          ? {
              ...c,
              tag: qcPayload.tag,
              details: {
                ...c.details,
                ...qcPayload.details,
              },
            }
          : c
      )
    );
    apiUpdateCardDetails(cardId, qcPayload);
  };

  // Stage change handler
  const handleUpdateCardStage = (cardId: string, newStage: CraftStage) => {
    setCraftCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, stage: newStage } : c))
    );
    apiUpdateCardStage(cardId, newStage);
  };

  // Commission creation handler
  const handleCommissionCreated = (newCard: CraftCard) => {
    setCraftCards((prev) => [newCard, ...prev]);
    apiCreateCraftCard(newCard);
    triggerToast(`New commission ${newCard.id} successfully queued into Jaipur Atelier!`);
    if (currentUser.role !== 'customer') {
      setTimeout(() => setActiveTab('crafting-queue'), 1200);
    }
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
    apiReorderRawMaterial(materialName, qty);
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
    apiTriggerBatchPour(sku);
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

  // Cart Handlers ("Kisi ne add to cart kiya to uska data dikhna chahiye")
  const handleAddToCart = (item: CartItem) => {
    const updated = [...cartItems];
    const existingIndex = updated.findIndex(
      (i) => i.sku === item.sku && i.customDetails === item.customDetails
    );

    if (existingIndex >= 0) {
      updated[existingIndex].quantity += item.quantity;
    } else {
      updated.push(item);
    }

    setCartItems(updated);
    saveStoredState('cart_items', updated);
    apiSaveCart(
      currentUser.id,
      updated,
      currentUser.name,
      currentUser.phone,
      currentUser.email
    );
    triggerToast(`Added "${item.title}" to cart! (Tracked in MongoDB)`);
  };

  const handleUpdateCartQty = (id: string, delta: number) => {
    const updated = cartItems
      .map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i))
      .filter((i) => i.quantity > 0);

    setCartItems(updated);
    saveStoredState('cart_items', updated);
    apiSaveCart(
      currentUser.id,
      updated,
      currentUser.name,
      currentUser.phone,
      currentUser.email
    );
  };

  const handleRemoveCartItem = (id: string) => {
    const updated = cartItems.filter((i) => i.id !== id);
    setCartItems(updated);
    saveStoredState('cart_items', updated);
    apiSaveCart(
      currentUser.id,
      updated,
      currentUser.name,
      currentUser.phone,
      currentUser.email
    );
    triggerToast('Item removed from cart');
  };

  const handleOrderPlaced = (newOrder: LogisticsOrder, newCard: CraftCard) => {
    setLogisticsOrders((prev) => [newOrder, ...prev]);
    apiCreateOrder(newOrder);

    setCraftCards((prev) => [newCard, ...prev]);
    apiCreateCraftCard(newCard);

    setCartItems([]);
    saveStoredState('cart_items', []);
    apiEmptyCart(currentUser.id);
    triggerToast(`Order #${newOrder.orderId} placed & queued to Jaipur Atelier!`);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    if (user.role === 'customer') {
      setActiveTab('customer-storefront');
      triggerToast(`Welcome back, ${user.name}! (Customer Storefront)`);
    } else {
      setActiveTab('crafting-queue');
      triggerToast(`Signed in as ${user.name} (${user.role.replace('_', ' ').toUpperCase()})`);
    }
  };

  const lowStockCount = rawMaterials.filter(
    (m) => m.status === 'low' || m.status === 'critical'
  ).length;

  const totalCartUnits = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const isCustomerPortal = currentUser.role === 'customer';

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
        onRoleChange={(r) => {
          setCurrentRole(r);
          setCurrentUser((prev) => ({ ...prev, role: r }));
        }}
        currentHub={currentHub}
        onHubChange={(hub) => {
          setCurrentHub(hub);
          triggerToast(`Switched Atelier Hub to ${hub.toUpperCase()}`);
        }}
        onOpenCorporateGifting={() => setShowCorporateModal(true)}
        onOpenCustomerTracking={() => setShowCustomerTrackModal(true)}
        currentUser={currentUser}
        onOpenAuthModal={() => setShowAuthModal(true)}
        onOpenCartDrawer={() => setShowCartDrawer(true)}
        cartCount={totalCartUnits}
      />

      <div className="flex flex-1 pt-16">
        {/* Left Sidebar (Only visible in Staff / Admin mode) */}
        {!isCustomerPortal && (
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            craftingActiveCount={craftCards.length}
            lowStockCount={lowStockCount}
            readyOrdersCount={
              logisticsOrders.filter(
                (o) => o.status === 'ready_for_packing' || o.status === 'manifested'
              ).length
            }
            onOpenDocs={() => setShowDocs(true)}
            onOpenWageLedger={() => setShowWageLedgerModal(true)}
            onOpenCorporateGifting={() => setShowCorporateModal(true)}
            onOpenCustomerTracking={() => setShowCustomerTrackModal(true)}
          />
        )}

        {/* Main Content Viewport */}
        <main
          className={`flex-1 p-6 lg:p-8 overflow-x-hidden ${
            isCustomerPortal ? 'max-w-7xl mx-auto w-full' : 'ml-64 max-w-[1600px]'
          }`}
        >
          {/* Customer Storefront View */}
          {activeTab === 'customer-storefront' && (
            <CustomerStorefront
              products={products}
              onAddToCart={handleAddToCart}
              onOpenCustomStudio={() => setActiveTab('custom-studio')}
              onOpenCartDrawer={() => setShowCartDrawer(true)}
            />
          )}

          {/* Admin Live Customer Cart Activity Monitor */}
          {activeTab === 'admin-cart-activity' && <AdminCartActivityView />}

          {/* Staff Crafting Queue Kanban Board */}
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

          {/* Staff Catalog & Inventory Supervisor */}
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

          {/* Staff Orders & Logistics Hub */}
          {activeTab === 'orders-and-logistics' && (
            <OrdersLogistics
              orders={logisticsOrders}
              onOpenLabelModal={(order) => setSelectedOrderForLabel(order)}
              onOpenGiftNoteModal={(order) => {
                triggerToast(
                  `Printing calligraphy wax-sealed gift note for ${order.customerName}...`
                );
              }}
              onOpenBatchManifestModal={() => {
                triggerToast('Generating batch 3PL manifest & courier handover sheet (PDF)...');
              }}
            />
          )}

          {/* Staff Financial Analytics */}
          {activeTab === 'analytics-and-revenue' && <AnalyticsRevenue />}

          {/* Staff Architecture Diagram */}
          {activeTab === 'architecture' && <ArchitectureView />}

          {/* Custom Order Commission Studio */}
          {activeTab === 'custom-studio' && (
            <CustomOrderStudio onCommissionCreated={handleCommissionCreated} />
          )}
        </main>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={showCartDrawer}
        onClose={() => setShowCartDrawer(false)}
        cartItems={cartItems}
        currentUser={currentUser}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Auth Modal (Admin vs Customer Login) */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={handleLoginSuccess}
          currentRole={currentRole}
        />
      )}

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

      {showAIConcierge && (
        <AIConciergeModal
          onClose={() => setShowAIConcierge(false)}
          onInjectCommission={handleCommissionCreated}
        />
      )}

      {showScannerWorkbench && (
        <ScannerWorkbenchModal
          onClose={() => setShowScannerWorkbench(false)}
          cards={craftCards}
          onUpdateStage={handleUpdateCardStage}
          onPassQC={handlePassQC}
        />
      )}

      {visionQCCard && (
        <GeminiVisionQCModal
          card={visionQCCard}
          onClose={() => setVisionQCCard(null)}
          onPassQC={handlePassQC}
        />
      )}

      {showCustomerTrackModal && (
        <CustomerTrackingPortalModal
          orders={logisticsOrders}
          cards={craftCards}
          onClose={() => setShowCustomerTrackModal(false)}
        />
      )}

      {showCorporateModal && (
        <CorporateGiftingModal
          onClose={() => setShowCorporateModal(false)}
          onQueueCorporateBatch={handleQueueCorporateBatch}
        />
      )}

      {showWageLedgerModal && (
        <ArtisanWageLedgerModal onClose={() => setShowWageLedgerModal(false)} />
      )}
    </div>
  );
}

export default App;

