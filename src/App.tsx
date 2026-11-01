import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { AuthPage } from './components/auth/AuthPage';
import { OnboardingModal } from './components/auth/OnboardingModal';
import { FarmerTrackView } from './components/farmer/FarmerTrackView';
import { BuyerTrackView } from './components/buyer/BuyerTrackView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AddProductModal } from './components/farmer/AddProductModal';
import { PhotoVerificationModal } from './components/farmer/PhotoVerificationModal';
import { CheckQuantityModal } from './components/farmer/CheckQuantityModal';
import { DeliveryManagementModal } from './components/farmer/DeliveryManagementModal';
import { CartDrawer } from './components/buyer/CartDrawer';
import { OrderSuccessTrackingModal } from './components/buyer/OrderSuccessTrackingModal';
import { ShieldCheck, Zap, Sprout, ArrowRight, Shield } from 'lucide-react';

const AppContent: React.FC = () => {
  const { isAuthenticated, currentRole, currentUser, adminFarmerMode, setAdminFarmerMode } = useApp();

  const [farmerTab, setFarmerTab] = useState<'PRODUCTS' | 'ORDERS' | 'PROFILE'>('PRODUCTS');
  const [buyerTab, setBuyerTab] = useState<'BROWSE' | 'ORDERS' | 'PROFILE'>('BROWSE');

  // If not authenticated, render dedicated Login / Registration screen
  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 text-slate-900 font-sans">
      {/* Top Fixed Header with role-isolated navigation */}
      <Header
        activeTab={currentRole === 'admin' ? (adminFarmerMode ? farmerTab : 'ADMIN') : currentRole === 'farmer' ? farmerTab : buyerTab}
        onNavigateTab={(tab) => {
          if (currentRole === 'farmer' || (currentRole === 'admin' && adminFarmerMode)) {
            setFarmerTab(tab as 'PRODUCTS' | 'ORDERS' | 'PROFILE');
          } else if (currentRole === 'buyer') {
            setBuyerTab(tab as 'BROWSE' | 'ORDERS' | 'PROFILE');
          }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentRole === 'admin' ? (
          adminFarmerMode ? (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white px-5 py-3 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md border border-indigo-700/50">
                <div className="flex items-center gap-2.5 text-xs">
                  <div className="p-1.5 rounded-lg bg-indigo-700 text-amber-300">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-white">Administrator Superuser:</span>
                    <span className="text-indigo-200 ml-1">Currently operating the live Farmer Operations Portal.</span>
                  </div>
                </div>
                <button
                  onClick={() => setAdminFarmerMode(false)}
                  className="px-4 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs flex items-center gap-1.5 transition self-start sm:self-auto"
                >
                  <span>← Return to Admin Console</span>
                </button>
              </div>
              <FarmerTrackView activeTab={farmerTab} setActiveTab={(tab) => setFarmerTab(tab as 'PRODUCTS' | 'ORDERS' | 'PROFILE')} />
            </div>
          ) : (
            <AdminDashboard onSwitchToFarmer={() => setAdminFarmerMode(true)} />
          )
        ) : currentRole === 'farmer' ? (
          <FarmerTrackView activeTab={farmerTab} setActiveTab={(tab) => setFarmerTab(tab as 'PRODUCTS' | 'ORDERS' | 'PROFILE')} />
        ) : (
          <BuyerTrackView activeTab={buyerTab} setActiveTab={(tab) => setBuyerTab(tab as 'BROWSE' | 'ORDERS' | 'PROFILE')} />
        )}
      </main>

      {/* Professional Commercial Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              🌱
            </div>
            <span className="font-extrabold text-slate-800">Farm2Market</span>
            <span>— Direct Farm-to-Consumer & Commercial Bulk Procurement Platform</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Produce Provenance
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Zero Middleman Commission
            </span>
            <span>•</span>
            <span>© {new Date().getFullYear()} Farm2Market Technologies</span>
          </div>
        </div>
      </footer>

      {/* Mandatory Onboarding / Profile Setup Modal */}
      <OnboardingModal />

      {/* Role Operations Modals */}
      <AddProductModal />
      <PhotoVerificationModal />
      <CheckQuantityModal />
      <DeliveryManagementModal />
      <CartDrawer />
      <OrderSuccessTrackingModal />
    </div>
  );
};

export const App: React.FC = () => {
  return <AppContent />;
};

export default App;
