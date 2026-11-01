import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sprout, 
  ShoppingCart, 
  Bell, 
  Check, 
  Package, 
  User as UserIcon, 
  LogOut, 
  ExternalLink,
  ChevronDown,
  Layers,
  ShoppingBag,
  Building2,
  Shield
} from 'lucide-react';

interface HeaderProps {
  onNavigateTab?: (tab: string) => void;
  activeTab?: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateTab, activeTab }) => {
  const {
    currentRole,
    currentUser,
    logoutUser,
    farmer,
    activeBuyer,
    buyerType,
    cartCount,
    setIsCartOpen,
    notifications,
    unreadFarmerNotifications,
    unreadBuyerNotifications,
    markNotificationRead,
    markAllNotificationsRead,
    setSelectedOrderForTracking,
    orders,
    adminFarmerMode,
    setAdminFarmerMode
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const relevantNotifications = notifications.filter(n => 
    currentRole === 'admin' ? true : n.targetRole === currentRole
  );
  const unreadCount = currentRole === 'admin' 
    ? notifications.filter(n => !n.read).length
    : currentRole === 'farmer' ? unreadFarmerNotifications : unreadBuyerNotifications;

  const handleNotificationClick = (orderId?: string, notifId?: string) => {
    if (notifId) markNotificationRead(notifId);
    if (orderId) {
      const order = orders.find(o => o.id === orderId);
      if (order) {
        setSelectedOrderForTracking(order);
      }
    }
    setIsNotifOpen(false);
  };

  const displayName = currentRole === 'admin'
    ? 'System Administrator'
    : currentRole === 'farmer' 
    ? farmer.name || currentUser?.username || 'Farmer' 
    : (buyerType === 'bulk' && activeBuyer.businessName ? activeBuyer.businessName : activeBuyer.name || currentUser?.username || 'Customer');

  const avatarUrl = currentRole === 'admin'
    ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
    : currentRole === 'farmer' ? farmer.avatarUrl : activeBuyer.avatarUrl;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  Farm<span className="text-emerald-600">2</span>Market
                </span>
                <p className="text-[11px] text-slate-500 font-medium">Direct Agricultural Commerce</p>
              </div>
            </div>

            {/* Role Badge */}
            {currentRole === 'admin' ? (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-0.5 rounded-full ml-2 border bg-indigo-50 text-indigo-900 border-indigo-300">
                <Shield className="w-3.5 h-3.5 text-indigo-600" />
                <span>{adminFarmerMode ? '👨‍🌾 Farmer Portal (Superuser)' : '🛡️ Admin Console'}</span>
              </span>
            ) : currentRole === 'farmer' ? (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ml-2 border bg-emerald-50 text-emerald-800 border-emerald-200">
                👨‍🌾 Farmer Portal
              </span>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ml-2 border bg-sky-50 text-sky-800 border-sky-200">
                🛒 Customer Portal
              </span>
            )}
          </div>

          {/* Navigation Items (Role Specific) */}
          <div className="hidden md:flex items-center space-x-1 text-xs font-semibold text-slate-600">
            {currentRole === 'admin' ? (
              adminFarmerMode ? (
                <>
                  <button
                    onClick={() => onNavigateTab && onNavigateTab('PRODUCTS')}
                    className={`px-3 py-2 rounded-xl transition ${activeTab === 'PRODUCTS' ? 'text-emerald-700 bg-emerald-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                    Produce Inventory
                  </button>
                  <button
                    onClick={() => onNavigateTab && onNavigateTab('ORDERS')}
                    className={`px-3 py-2 rounded-xl transition ${activeTab === 'ORDERS' ? 'text-emerald-700 bg-emerald-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                    Incoming Orders
                  </button>
                  <button
                    onClick={() => onNavigateTab && onNavigateTab('PROFILE')}
                    className={`px-3 py-2 rounded-xl transition ${activeTab === 'PROFILE' ? 'text-emerald-700 bg-emerald-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                    Farm Profile
                  </button>
                  <button
                    onClick={() => setAdminFarmerMode(false)}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition flex items-center gap-1 ml-2 text-xs shadow-sm"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Return to Admin Console</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">
                    Administrator Mode Active
                  </span>
                  <button
                    onClick={() => setAdminFarmerMode(true)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-bold transition flex items-center gap-1.5 text-xs"
                  >
                    <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Operate Farmer Side</span>
                  </button>
                </div>
              )
            ) : currentRole === 'farmer' ? (
              <>
                <button
                  onClick={() => onNavigateTab && onNavigateTab('PRODUCTS')}
                  className={`px-3 py-2 rounded-xl transition ${activeTab === 'PRODUCTS' ? 'text-emerald-700 bg-emerald-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-50'}`}
                >
                  Produce Inventory
                </button>
                <button
                  onClick={() => onNavigateTab && onNavigateTab('ORDERS')}
                  className={`px-3 py-2 rounded-xl transition ${activeTab === 'ORDERS' ? 'text-emerald-700 bg-emerald-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-50'}`}
                >
                  Incoming Orders
                </button>
                <button
                  onClick={() => onNavigateTab && onNavigateTab('PROFILE')}
                  className={`px-3 py-2 rounded-xl transition ${activeTab === 'PROFILE' ? 'text-emerald-700 bg-emerald-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-50'}`}
                >
                  Farm Profile & Location
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigateTab && onNavigateTab('BROWSE')}
                  className={`px-3 py-2 rounded-xl transition ${activeTab === 'BROWSE' ? 'text-sky-700 bg-sky-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-50'}`}
                >
                  Marketplace
                </button>
                <button
                  onClick={() => onNavigateTab && onNavigateTab('ORDERS')}
                  className={`px-3 py-2 rounded-xl transition ${activeTab === 'ORDERS' ? 'text-sky-700 bg-sky-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-50'}`}
                >
                  My Orders & Live Tracking
                </button>
                <button
                  onClick={() => onNavigateTab && onNavigateTab('PROFILE')}
                  className={`px-3 py-2 rounded-xl transition ${activeTab === 'PROFILE' ? 'text-sky-700 bg-sky-50 font-bold' : 'hover:text-slate-900 hover:bg-slate-50'}`}
                >
                  Delivery Address & Profile
                </button>
              </>
            )}
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Cart Button (Buyer Mode) */}
            {currentRole === 'buyer' && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 font-semibold text-xs transition"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[11px] font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className={`relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition ${
                  unreadCount > 0 ? 'text-amber-600' : ''
                }`}
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-xs">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Drawer Popover */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Notifications</h4>
                      <p className="text-xs text-slate-400 capitalize">{currentRole} Channel</p>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => markAllNotificationsRead(currentRole)}
                        className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {relevantNotifications.length === 0 ? (
                      <div className="p-6 text-center text-slate-400 text-xs">
                        No notifications yet.
                      </div>
                    ) : (
                      relevantNotifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => handleNotificationClick(n.orderId, n.id)}
                          className={`p-3.5 hover:bg-slate-50 cursor-pointer transition flex items-start gap-3 ${
                            !n.read ? 'bg-amber-50/50' : ''
                          }`}
                        >
                          <div className={`mt-0.5 p-1.5 rounded-lg ${
                            n.type === 'order' ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-100 text-sky-700'
                          }`}>
                            <Package className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className={`text-xs font-semibold ${!n.read ? 'text-slate-900' : 'text-slate-600'}`}>
                                {n.title}
                              </p>
                              <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.timestamp}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-2">
                              {n.message}
                            </p>
                            {n.orderId && (
                              <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-semibold text-emerald-600 hover:underline">
                                View Order Details <ExternalLink className="w-2.5 h-2.5" />
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile & Logout Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition"
              >
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-7 h-7 rounded-lg object-cover ring-1 ring-slate-200"
                />
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-slate-800 leading-tight max-w-[130px] truncate">
                    {displayName}
                  </div>
                  <div className="text-[10px] text-slate-400 capitalize">
                    {currentRole === 'admin' ? (adminFarmerMode ? 'Farmer Mode' : 'Super Administrator') : currentRole === 'farmer' ? 'Verified Producer' : buyerType === 'bulk' ? 'Commercial Buyer' : 'Customer'}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Menu Popover */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-100">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900 truncate">{displayName}</p>
                    <p className="text-[10px] text-slate-400 truncate">{currentUser?.email}</p>
                  </div>

                  {currentRole === 'admin' && (
                    <div className="py-1 border-b border-slate-100">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setAdminFarmerMode(!adminFarmerMode);
                        }}
                        className="w-full px-4 py-2 text-left text-xs text-indigo-700 hover:bg-indigo-50 flex items-center gap-2 font-bold"
                      >
                        <Shield className="w-4 h-4 text-indigo-600" />
                        <span>{adminFarmerMode ? 'Return to Admin Console' : 'Operate as Farmer'}</span>
                      </button>
                    </div>
                  )}

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onNavigateTab && onNavigateTab('PROFILE');
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      <span>Account Profile & Settings</span>
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        logoutUser();
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-semibold"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
