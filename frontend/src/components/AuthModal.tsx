import React, { useState } from 'react';
import { UserProfile, UserRole } from '../types';
import { seedUsers } from '../data/mockData';
import { apiLogin } from '../services/apiService';
import {
  X,
  User,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  Hammer,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
} from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  currentRole: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  onClose,
  onLoginSuccess,
}) => {
  const [authMode, setAuthMode] = useState<'customer' | 'admin'>('customer');
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [selectedAdminRole, setSelectedAdminRole] = useState<UserRole>('atelier_manager');
  const [isLoading, setIsLoading] = useState(false);

  // Quick switch to demo profile
  const handleQuickDemoLogin = async (user: UserProfile) => {
    setIsLoading(true);
    const remote = await apiLogin({ email: user.email, role: user.role, phone: user.phone });
    setIsLoading(false);
    onLoginSuccess(remote || user);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (authMode === 'customer') {
      const email = emailInput.trim() || 'ananya@client.com';
      const remote = await apiLogin({
        email,
        phone: phoneInput.trim() || '+91 98765 43210',
        role: 'customer',
      });
      setIsLoading(false);
      if (remote) {
        onLoginSuccess(remote);
      } else {
        onLoginSuccess({
          id: `user-cust-${Date.now()}`,
          name: email.split('@')[0],
          email,
          phone: phoneInput || '+91 98765 43210',
          role: 'customer',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        });
      }
    } else {
      const matchingAdmin = seedUsers.find((u) => u.role === selectedAdminRole);
      const remote = await apiLogin({
        email: emailInput.trim() || matchingAdmin?.email,
        role: selectedAdminRole,
      });
      setIsLoading(false);
      onLoginSuccess(remote || matchingAdmin || seedUsers[3]);
    }

    onClose();
  };

  const customerDemoUsers = seedUsers.filter((u) => u.role === 'customer');
  const adminDemoUsers = seedUsers.filter((u) => u.role !== 'customer');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] border border-[#2D221E]/15 rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-[#2D221E] text-[#FAF7F2] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#9d3e1d] flex items-center justify-center text-white shadow-inner">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-['Epilogue'] font-bold text-lg tracking-tight">
                DashNit Portal Authentication
              </h2>
              <p className="text-xs text-[#FAF7F2]/70 font-['Space_Mono']">
                Role-Based Portal Access • Pan-India Atelier
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#FAF7F2]/60 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Portal Mode Tabs: Customer vs Admin */}
        <div className="p-6">
          <div className="grid grid-cols-2 p-1 bg-[#2D221E]/5 rounded-2xl mb-6 border border-[#2D221E]/10">
            <button
              onClick={() => setAuthMode('customer')}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${
                authMode === 'customer'
                  ? 'bg-white text-[#9d3e1d] shadow-md'
                  : 'text-[#2D221E]/60 hover:text-[#2D221E]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Customer Portal</span>
            </button>
            <button
              onClick={() => setAuthMode('admin')}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${
                authMode === 'admin'
                  ? 'bg-[#2D221E] text-white shadow-md'
                  : 'text-[#2D221E]/60 hover:text-[#2D221E]'
              }`}
            >
              <Hammer className="w-4 h-4" />
              <span>Artisan & Admin Staff</span>
            </button>
          </div>

          {/* Quick Demo Login Cards */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2D221E]/60 font-['Space_Mono']">
                {authMode === 'customer' ? 'Quick Demo Customer Accounts' : 'Atelier Staff Personas'}
              </span>
              <span className="text-[10px] text-[#9d3e1d] font-semibold">1-Click Sign-In</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(authMode === 'customer' ? customerDemoUsers : adminDemoUsers).map((u) => (
                <button
                  key={u.id}
                  onClick={() => handleQuickDemoLogin(u)}
                  className="flex items-center gap-3 p-2.5 rounded-2xl border border-[#2D221E]/10 bg-white hover:border-[#9d3e1d]/50 hover:bg-[#9d3e1d]/5 transition-all text-left group"
                >
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#9d3e1d]/30"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-[#2D221E] truncate group-hover:text-[#9d3e1d]">
                      {u.name}
                    </div>
                    <div className="text-[10px] text-[#2D221E]/60 truncate capitalize">
                      {u.role.replace('_', ' ')}
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#2D221E]/30 group-hover:text-[#9d3e1d] group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-[#2D221E]/10"></div>
            <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-[#2D221E]/40 font-['Space_Mono']">
              Or Custom Sign-In
            </span>
            <div className="flex-grow border-t border-[#2D221E]/10"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'customer' ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#2D221E] mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#9d3e1d]" />
                    <span>Customer Email Address</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. ananya@client.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-[#2D221E]/20 rounded-xl text-xs focus:ring-2 focus:ring-[#9d3e1d]/30 focus:border-[#9d3e1d] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2D221E] mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#9d3e1d]" />
                    <span>Mobile Number (for WhatsApp order updates)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-[#2D221E]/20 rounded-xl text-xs focus:ring-2 focus:ring-[#9d3e1d]/30 focus:border-[#9d3e1d] outline-none"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#2D221E] mb-1.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#9d3e1d]" />
                    <span>Select Atelier Staff Department</span>
                  </label>
                  <select
                    value={selectedAdminRole}
                    onChange={(e) => setSelectedAdminRole(e.target.value as UserRole)}
                    className="w-full px-4 py-2.5 bg-white border border-[#2D221E]/20 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#2D221E]/30 focus:border-[#2D221E] outline-none"
                  >
                    <option value="atelier_manager">Atelier Director (Full Command & Oversight)</option>
                    <option value="artisan_crafter">Master Crafter (Kanban & Stitch/Pour Pace)</option>
                    <option value="qc_packaging">QC & Presentation Specialist (Vision QC & Packing)</option>
                    <option value="logistics_dispatcher">Logistics Dispatcher (Air Waybill & 3PL)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2D221E] mb-1.5 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#9d3e1d]" />
                    <span>Security PIN / Password</span>
                  </label>
                  <input
                    type="password"
                    defaultValue="••••••••"
                    className="w-full px-4 py-2.5 bg-white border border-[#2D221E]/20 rounded-xl text-xs focus:ring-2 focus:ring-[#2D221E]/30 outline-none font-mono"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
                authMode === 'customer'
                  ? 'bg-[#9d3e1d] text-white hover:bg-[#853417]'
                  : 'bg-[#2D221E] text-white hover:bg-[#1f1714]'
              }`}
            >
              {isLoading ? (
                <span>Authenticating with MongoDB...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {authMode === 'customer'
                      ? 'Sign In & Enter Customer Storefront'
                      : 'Enter Artisan Operations Command Center'}
                  </span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
