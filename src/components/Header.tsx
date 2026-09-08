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
} from 'lucide-react';
import { ActiveNavTab } from '../types';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: ActiveNavTab;
  setActiveTab: (tab: ActiveNavTab) => void;
  onOpenNewCommission: () => void;
  totalActiveOrders: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  onOpenNewCommission,
  totalActiveOrders,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
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
          <div className="relative flex items-center w-72 lg:w-84">
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

          {/* Live Studio Badge */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF5EA] border border-[#F8CCA0]/60">
            <span className="w-2 h-2 rounded-full bg-[#bd5633] animate-pulse"></span>
            <span className="text-[11px] font-semibold text-[#A35C00] tracking-wide font-['Plus_Jakarta_Sans']">
              Jaipur Studio • Live {totalActiveOrders || 42} In-Queue
            </span>
          </div>
        </div>

        {/* Right tools & Profile */}
        <div className="flex items-center gap-3">
          {/* Quick Customizer Toggle button */}
          <button
            onClick={() => setActiveTab('custom-studio')}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'custom-studio'
                ? 'bg-[#9d3e1d] text-white shadow-sm'
                : 'bg-[#F3EDE4] text-[#2D221E] hover:bg-[#EDE5D8]'
            }`}
            title="Open Interactive Custom Studio Configurator"
          >
            <Palette className="w-3.5 h-3.5 text-[#9d3e1d]" />
            <span>Custom Studio (PRD)</span>
          </button>

          {/* Architecture Explorer shortcut */}
          <button
            onClick={() => setActiveTab('architecture')}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'architecture'
                ? 'bg-[#9d3e1d] text-white shadow-sm'
                : 'bg-[#FAF7F2] text-[#6B5851] hover:bg-[#F3EDE4]'
            }`}
            title="System Architecture Diagram"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>SaaS Arch</span>
          </button>

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

          {/* Profile badge matching design */}
          <div className="flex items-center gap-3 pl-1">
            <div className="flex flex-col text-right hidden md:flex">
              <span className="text-xs font-semibold text-[#2D221E] leading-tight font-['Plus_Jakarta_Sans']">
                Nita Sharma
              </span>
              <span className="text-[11px] text-[#6B5851] leading-tight font-['Plus_Jakarta_Sans']">
                Master Artisan / Lead
              </span>
            </div>
            <img
              alt="Nita Sharma"
              className="w-8 h-8 rounded-full object-cover border border-[#D3C2B1] shadow-sm"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM8Df4ydgQlw7-C3xA3CT7h5C2tQxC6dNe3IJ2enHiQN8G54nMXRGjAfjWl85zOczkZyxCHsoV7BzQeVGFjPk0CPKInV4fw508vliKK3yaslBmnqglVdo0W2Dnmk1FOxrrAOmsErjWgeHW5EEo6-hCF-HQbo-WHrv2Th1zirxjfxcm_SrkOHGyY_fS7CevegmG-7iAe5poB7vxJMjmEi4ZRiLeGCnLTPEUfSg-t8539hbPetZcUuMflw"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
