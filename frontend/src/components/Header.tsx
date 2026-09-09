import React, { useState } from 'react';
import {
  Search,
  Bell,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Palette,
  Eye,
  SlidersHorizontal,
  Barcode,
  Building2,
  MapPin,
  Briefcase,
  Globe,
  ShoppingBag,
  LogIn,
  Store,
  Activity,
  ChevronDown,
} from 'lucide-react';
import { ActiveNavTab, UserRole, AtelierHub, UserProfile } from '../types';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: ActiveNavTab;
  setActiveTab: (tab: ActiveNavTab) => void;
  onOpenNewCommission: () => void;
  totalActiveOrders: number;
  onOpenAIConcierge?: () => void;
  onOpenScanner?: () => void;
  onOpenCorporateGifting?: () => void;
  onOpenCustomerTracking?: () => void;
  currentRole?: UserRole;
  onRoleChange?: (role: UserRole) => void;
  currentHub?: AtelierHub;
  onHubChange?: (hub: AtelierHub) => void;
  currentUser?: UserProfile;
  onOpenAuthModal?: () => void;
  onOpenCartDrawer?: () => void;
  cartCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  onOpenNewCommission,
  totalActiveOrders,
  onOpenAIConcierge,
  onOpenScanner,
  onOpenCorporateGifting,
  onOpenCustomerTracking,
  currentRole = 'atelier_manager',
  onRoleChange,
  currentHub = 'jaipur_02',
  onHubChange,
  currentUser,
  onOpenAuthModal,
  onOpenCartDrawer,
  cartCount = 0,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showHubMenu, setShowHubMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const notifications = [
    {
      id: 1,
      type: 'curing',
      title: 'Soy Candle Curing Threshold Met',
      desc: 'Batch #WAX-774A completed 48-hour cure. Moved to QC inspect.',
      time: '12m ago',
      unread: true,
    },
    {
      id: 2,
      type: 'inventory',
      title: 'Critical Raw Stock Alert',
      desc: 'Frosted Amber Glass Jars (250ml) down to 6 units. Reorder needed.',
      time: '28m ago',
      unread: true,
    },
    {
      id: 3,
      type: 'whatsapp',
      title: 'WhatsApp Hyper-Care Delivered',
      desc: 'Dispatch update delivered with live Delhivery tracking to Ananya S.',
      time: '45m ago',
      unread: true,
    },
    {
      id: 4,
      type: 'order',
      title: 'New Custom Commission',
      desc: 'Order #DN-1050 received: Custom Daisy Tote (Sage + Buttercup).',
      time: '1h ago',
      unread: false,
    },
  ];

  const roleConfig: Record<UserRole, { title: string; subtitle: string; badge: string; color: string }> = {
    customer: {
      title: 'Customer Client',
      subtitle: 'Boutique Storefront & Cart',
      badge: 'Shopper',
      color: '#4A3E39',
    },
    atelier_manager: {
      title: 'Nita Sharma',
      subtitle: 'Atelier Director (Full Access)',
      badge: 'Director',
      color: '#9d3e1d',
    },
    artisan_crafter: {
      title: 'Dashrath M.',
      subtitle: 'Senior Crafter (Floor Queue)',
      badge: 'Artisan',
      color: '#A35C00',
    },
    qc_packaging: {
      title: 'Kavita S.',
      subtitle: 'QC & Packaging Specialist',
      badge: 'QC Lead',
      color: '#1E6B43',
    },
    logistics_dispatcher: {
      title: 'Ramesh Patel',
      subtitle: '3PL Logistics & Dispatcher',
      badge: 'Logistics',
      color: '#1E5888',
    },
  };

  const activeRoleInfo = roleConfig[currentRole] || roleConfig.atelier_manager;

  const hubConfigs: Record<AtelierHub, { name: string; tag: string; location: string; cap: string }> = {
    jaipur_02: {
      name: 'Jaipur Unit 02',
      tag: 'Bespoke Atelier',
      location: 'Jaipur, RJ',
      cap: '42 / 45 Slots',
    },
    jaipur_01: {
      name: 'Jaipur Unit 01',
      tag: 'Candle Foundry',
      location: 'Jaipur, RJ',
      cap: '78 / 100 Slots',
    },
    mumbai_hub: {
      name: 'Mumbai 3PL Hub',
      tag: 'RTS Center',
      location: 'Bhiwandi, MH',
      cap: '120 / 250 Slots',
    },
  };

  const activeHubInfo = hubConfigs[currentHub] || hubConfigs.jaipur_02;

  return (
    <header className="fixed top-0 w-full h-16 bg-white/95 backdrop-blur-md z-40 border-b border-[#E5DBD0] shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-16 w-full px-5 flex items-center justify-between">
        {/* Brand & Search */}
        <div className="flex items-center gap-6">
          <div
            className="flex items-center gap-3 w-60 pr-2 cursor-pointer select-none"
            onClick={() => setActiveTab('crafting-queue')}
          >
            <img
              alt="DashNit Artisan Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_APITfE3QLEGc7BDz8QZoVcPHQsfPukNK-RFr9cTsEYFcifyKg8CCkf91-EAAEOFKEeEY8twSa0nhlADepi8SS5aTRNo5jMOcrNkDC6b1hrDg9OjTeFhk4CHMActQ-GPsE9Na4_6OMSG_fVmhyJ_MflX-c7AhN3RdOxtJB-L5Ouobh37nZ-XXNb8oUrGAquP5uPMQ1II2bWgFW09E_gc8dMdrJ3AU8ZpZI5WHmJBIiOQwCFh8ZiO-6w"
            />
            <div className="flex flex-col">
              <span className="font-['Epilogue'] text-[17px] font-bold tracking-tight text-[#2D221E] leading-none">
                DashNit
              </span>
              <span className="text-[11px] font-semibold text-[#9d3e1d] leading-tight tracking-wider uppercase font-['Plus_Jakarta_Sans']">
                Crochet & Candle
              </span>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative flex items-center w-64 lg:w-72">
            <Search className="absolute left-3 text-[#9C8880] w-4 h-4" />
            <input
              className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-[#FAF7F2] border border-transparent focus:border-[#D3C2B1] text-[#2D221E] text-[13px] placeholder:text-[#9C8880] focus:outline-none focus:bg-white transition-all font-['Plus_Jakarta_Sans']"
              placeholder="Search orders, skein lots, wax blends..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-xs text-[#9C8880] hover:text-[#2D221E]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Multi-Hub Network Switcher */}
          <div className="relative hidden xl:block">
            <button
              onClick={() => setShowHubMenu(!showHubMenu)}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF5EA] hover:bg-[#FDEEDC] border border-[#F8CCA0]/80 transition-all text-left"
              title="Click to switch active atelier hub"
            >
              <span className="w-2 h-2 rounded-full bg-[#bd5633] animate-pulse"></span>
              <span className="text-[11px] font-bold text-[#A35C00] tracking-wide font-['Plus_Jakarta_Sans']">
                {activeHubInfo.name} • {activeHubInfo.cap}
              </span>
            </button>

            {showHubMenu && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[#E5DBD0] p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-2.5 py-1.5 border-b border-[#F3EDE4] mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5851] block">
                    Atelier Federation Network
                  </span>
                  <span className="text-[11px] text-[#9C8880]">
                    Select active production & dispatch hub
                  </span>
                </div>
                <div className="space-y-1">
                  {(Object.keys(hubConfigs) as AtelierHub[]).map((h) => {
                    const info = hubConfigs[h];
                    const isSelected = currentHub === h;
                    return (
                      <button
                        key={h}
                        onClick={() => {
                          onHubChange?.(h);
                          setShowHubMenu(false);
                        }}
                        className={`w-full p-2 rounded-xl text-left flex items-center justify-between text-xs transition-all ${
                          isSelected
                            ? 'bg-[#fee9e5] text-[#9d3e1d] font-bold border border-[#9d3e1d]/40'
                            : 'hover:bg-[#FAF7F2] text-[#2D221E]'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-xs">{info.name}</div>
                          <div className="text-[10px] text-[#6B5851]">
                            {info.tag} • {info.cap}
                          </div>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#9d3e1d]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right tools & Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Customer Live Track Portal Button */}
          {onOpenCustomerTracking && (
            <button
              onClick={onOpenCustomerTracking}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[#EBF3F8] hover:bg-[#D5E6F2] text-[#1E5888] transition-all border border-[#1E5888]/20 shadow-2xs active:scale-95"
              title="Open Public Customer Live Tracking Portal"
            >
              <Globe className="w-3.5 h-3.5 text-[#1E5888]" />
              <span className="hidden sm:inline">Track Portal</span>
            </button>
          )}

          {/* Corporate Gifting Button */}
          {onOpenCorporateGifting && (
            <button
              onClick={onOpenCorporateGifting}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[#FAF7F2] hover:bg-[#F3EDE4] text-[#2D221E] transition-all border border-[#E5DBD0] shadow-2xs active:scale-95"
              title="Open B2B Bulk Corporate Gifting Engine"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#9d3e1d]" />
              <span className="hidden sm:inline">Corporate</span>
            </button>
          )}

          {/* AI Concierge Button */}
          {onOpenAIConcierge && (
            <button
              onClick={onOpenAIConcierge}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[#fee9e5] hover:bg-[#fedbd5] text-[#9d3e1d] transition-all border border-[#9d3e1d]/30 shadow-xs active:scale-95"
              title="Gemini AI WhatsApp & Order Ingestion Concierge"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#9d3e1d]" />
              <span>✨ AI Concierge</span>
            </button>
          )}

          {/* Barcode / Floor Scanner Button */}
          {onOpenScanner && (
            <button
              onClick={onOpenScanner}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[#F3EDE4] hover:bg-[#EDE5D8] text-[#2D221E] transition-all border border-[#E5DBD0] shadow-2xs active:scale-95"
              title="Open Barcode & Staging Bin Scanner"
            >
              <Barcode className="w-3.5 h-3.5 text-[#6B5851]" />
              <span>Scanner</span>
            </button>
          )}

          {/* Quick Customizer Toggle button */}
          <button
            onClick={() => setActiveTab('custom-studio')}
            className={`hidden lg:flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'custom-studio'
                ? 'bg-[#9d3e1d] text-white shadow-sm'
                : 'bg-[#F3EDE4] text-[#2D221E] hover:bg-[#EDE5D8]'
            }`}
            title="Open Interactive Custom Studio Configurator"
          >
            <Palette className="w-3.5 h-3.5 text-[#9d3e1d]" />
            <span>Studio</span>
          </button>

          {/* Architecture Explorer shortcut */}
          <button
            onClick={() => setActiveTab('architecture')}
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'architecture'
                ? 'bg-[#9d3e1d] text-white shadow-sm'
                : 'bg-[#FAF7F2] text-[#6B5851] hover:bg-[#F3EDE4]'
            }`}
            title="System Architecture Diagram"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>SaaS Arch</span>
          </button>

          {/* Shopping Cart Drawer Button */}
          {onOpenCartDrawer && (
            <button
              onClick={onOpenCartDrawer}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#9d3e1d] hover:bg-[#853417] text-white transition-all shadow-md active:scale-95"
              title="Open Shopping Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#F4D35E]" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-white text-[#9d3e1d] text-[10px] font-extrabold">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Customer Storefront / Live Carts Tab */}
          {currentUser?.role === 'customer' ? (
            <button
              onClick={() => setActiveTab('customer-storefront')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'customer-storefront'
                  ? 'bg-[#2D221E] text-white shadow-sm'
                  : 'bg-[#F3EDE4] text-[#2D221E] hover:bg-[#EDE5D8]'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-[#9d3e1d]" />
              <span>Catalog</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('admin-cart-activity')}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'admin-cart-activity'
                  ? 'bg-[#9d3e1d] text-white shadow-sm'
                  : 'bg-[#FEF5EA] text-[#A35C00] hover:bg-[#FDEEDC] border border-[#F8CCA0]'
              }`}
              title="View Live Customer Carts in MongoDB"
            >
              <Activity className="w-3.5 h-3.5 text-[#9d3e1d]" />
              <span>Live Carts</span>
            </button>
          )}

          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (showNotifications) setUnreadCount(0);
              }}
              className="relative p-2 rounded-full hover:bg-[#F3EDE4] text-[#56423c] transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
              )}
            </button>

            {/* Notification Popover Drawer */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-84 bg-white rounded-xl shadow-xl border border-[#E5DBD0] p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5DBD0]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6B5851] font-['Plus_Jakarta_Sans']">
                    Studio Live Alerts
                  </span>
                  <span className="text-[11px] font-semibold text-[#9d3e1d]">
                    {unreadCount} new
                  </span>
                </div>
                <div className="divide-y divide-[#F3EDE4] max-h-72 overflow-y-auto mt-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="py-2.5 px-1 flex gap-2.5 items-start hover:bg-[#FAF7F2] rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="mt-0.5">
                        {n.type === 'curing' && (
                          <Flame className="w-4 h-4 text-[#A35C00]" />
                        )}
                        {n.type === 'inventory' && (
                          <AlertTriangle className="w-4 h-4 text-[#9B2C2C]" />
                        )}
                        {n.type === 'whatsapp' && (
                          <CheckCircle2 className="w-4 h-4 text-[#1E6B43]" />
                        )}
                        {n.type === 'order' && (
                          <Sparkles className="w-4 h-4 text-[#9d3e1d]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-[#2D221E] truncate">
                            {n.title}
                          </p>
                          <span className="text-[10px] text-[#9C8880]">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-[#6B5851] line-clamp-2 mt-0.5">
                          {n.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-[#E5DBD0] text-center">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      setActiveTab('crafting-queue');
                    }}
                    className="text-xs font-semibold text-[#9d3e1d] hover:underline"
                  >
                    View All Studio Milestones →
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-[#E5DBD0] hidden sm:block"></div>

          {/* User Profile & Auth Modal Trigger */}
          <div className="relative flex items-center">
            <button
              onClick={() => onOpenAuthModal?.()}
              className="flex items-center gap-2 px-2.5 py-1 rounded-2xl border border-[#2D221E]/15 bg-white hover:border-[#9d3e1d]/50 hover:bg-[#9d3e1d]/5 transition-all text-left group"
              title="Click to Switch Portal (Admin vs Customer Login)"
            >
              <img
                alt={currentUser?.name || activeRoleInfo.title}
                className="w-7 h-7 rounded-full object-cover border border-[#9d3e1d]/40"
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}
              />
              <div className="hidden sm:flex flex-col">
                <span className="text-xs font-bold text-[#2D221E] leading-tight group-hover:text-[#9d3e1d]">
                  {currentUser?.name || activeRoleInfo.title}
                </span>
                <span className="text-[10px] text-[#9d3e1d] font-semibold leading-tight capitalize">
                  {currentUser?.role ? currentUser.role.replace('_', ' ') : 'Customer'} • Switch
                </span>
              </div>
              <LogIn className="w-3.5 h-3.5 text-[#2D221E]/40 group-hover:text-[#9d3e1d]" />
            </button>

            {/* Quick RBAC Dropdown Toggle */}
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="p-1.5 ml-1 rounded-lg hover:bg-[#FAF7F2] text-[#6B5851] hover:text-[#2D221E] transition-colors"
              title="Quick Atelier Role Persona Switcher"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {/* Persona Switcher Dropdown */}
            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[#E5DBD0] p-2.5 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-2 py-1.5 border-b border-[#F3EDE4] mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5851] block">
                    Switch Atelier Persona (RBAC)
                  </span>
                  <span className="text-[11px] text-[#9C8880]">
                    Simulate staff permissions on workshop floor
                  </span>
                </div>
                <div className="space-y-1">
                  {(Object.keys(roleConfig) as UserRole[]).map((r) => {
                    const info = roleConfig[r];
                    const isSelected = currentRole === r;
                    return (
                      <button
                        key={r}
                        onClick={() => {
                          onRoleChange?.(r);
                          setShowRoleMenu(false);
                        }}
                        className={`w-full p-2 rounded-xl text-left flex items-center justify-between text-xs transition-all ${
                          isSelected
                            ? 'bg-[#fee9e5] border border-[#9d3e1d]/40 font-bold'
                            : 'hover:bg-[#FAF7F2] text-[#2D221E]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-[#2D221E]">{info.title}</span>
                            <span
                              className="text-[9px] font-extrabold uppercase px-1 rounded text-white"
                              style={{ backgroundColor: info.color }}
                            >
                              {info.badge}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#6B5851] block mt-0.5">
                            {info.subtitle}
                          </span>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-[#9d3e1d] flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
