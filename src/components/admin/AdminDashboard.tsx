import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Shield, 
  ShieldCheck, 
  Users, 
  Boxes, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  Truck, 
  Search, 
  Filter, 
  Trash2, 
  Eye, 
  RefreshCw, 
  ExternalLink,
  Sprout,
  Package,
  MapPin,
  Phone,
  Mail,
  Award,
  ArrowRight,
  Sliders,
  AlertTriangle
} from 'lucide-react';
import { OrderStatus, Product, ProductCategory } from '../../types';

interface AdminDashboardProps {
  onSwitchToFarmer?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onSwitchToFarmer }) => {
  const {
    farmer,
    toggleFarmerVerification,
    products,
    adminDeleteProduct,
    adminUpdateProduct,
    orders,
    adminUpdateOrderStatus,
    users,
    setAdminFarmerMode,
    setSelectedOrderForTracking
  } = useApp();

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'FARMERS' | 'PRODUCTS' | 'ORDERS' | 'LOGISTICS'>('OVERVIEW');
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('ALL');
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3500);
  };

  // Financial & platform metrics
  const totalGMV = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalVolumeKg = products.reduce((sum, p) => sum + p.availableQuantity, 0);
  const totalSavings = orders.reduce((sum, o) => sum + o.savings, 0);
  const verifiedProducts = products.filter(p => p.photoVerified).length;
  const pendingOrders = orders.filter(o => o.status === 'ORDER_RECEIVED' || o.status === 'ORDER_PLACED').length;

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.farmerName.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredOrders = orders.filter(o => {
    if (orderStatusFilter === 'ALL') return true;
    return o.status === orderStatusFilter;
  });

  const handleLaunchFarmerPortal = () => {
    setAdminFarmerMode(true);
    if (onSwitchToFarmer) onSwitchToFarmer();
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Administrative Control Center */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-900/40">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-2">
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span>Executive Administration Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Farm2Market Mandi & Platform Supervision
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 flex items-center gap-2 flex-wrap">
              <span>System Administrator</span>
              <span>•</span>
              <span>Direct Oversight of Farmers, Marketplace Inventory & Escrow Dispatches</span>
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleLaunchFarmerPortal}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition"
              title="Operate as Farmer directly from Admin"
            >
              <Sprout className="w-4 h-4" />
              <span>Operate Farmer Side</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => showNotification('Platform cache refreshed. Live telemetry synced.')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 border border-white/20 transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Sync Telemetry</span>
            </button>
          </div>
        </div>

        {/* Action toast */}
        {actionMessage && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-semibold flex items-center justify-between animate-in fade-in">
            <span>{actionMessage}</span>
            <button onClick={() => setActionMessage(null)} className="text-emerald-300 hover:text-white">✕</button>
          </div>
        )}

        {/* 4 Core KPI Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
              Platform Gross Volume
            </div>
            <div className="text-2xl font-extrabold text-white mt-1">
              ₹{totalGMV.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">
              100% Direct Settlement
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <Boxes className="w-3.5 h-3.5 text-emerald-400" />
              Active Barn Inventory
            </div>
            <div className="text-2xl font-extrabold text-white mt-1">
              {totalVolumeKg.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-300">kg</span>
            </div>
            <div className="text-[10px] text-emerald-300 mt-0.5">
              {verifiedProducts} of {products.length} Quality Certified
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-amber-400" />
              Pending Dispatches
            </div>
            <div className="text-2xl font-extrabold text-white mt-1 flex items-baseline gap-2">
              {pendingOrders}
              <span className="text-xs font-normal text-amber-200">of {orders.length} total</span>
            </div>
            <div className="text-[10px] text-amber-200/80 mt-0.5">
              Across Retail & Bulk Wholesale
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-[11px] font-semibold text-sky-300 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-sky-400" />
              Registered Accounts
            </div>
            <div className="text-2xl font-extrabold text-white mt-1">
              {users.length}
            </div>
            <div className="text-[10px] text-sky-300 mt-0.5">
              Producers & Direct Buyers
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'OVERVIEW'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>System Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('FARMERS')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'FARMERS'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sprout className="w-4 h-4" />
          <span>Farmer Management</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
            {farmer.verified ? '1 Verified' : '1 Pending'}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('PRODUCTS')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'PRODUCTS'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Boxes className="w-4 h-4" />
          <span>Produce Moderation</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
            {products.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('ORDERS')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'ORDERS'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>All Platform Orders</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
            {orders.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('LOGISTICS')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition ${
            activeTab === 'LOGISTICS'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Logistics Carriers</span>
        </button>
      </div>

      {/* Tab 1: System Overview */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Quick Control Center */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-600" />
                <span>Superuser Direct Actions</span>
              </h3>

              <div className="space-y-2.5">
                <button
                  onClick={handleLaunchFarmerPortal}
                  className="w-full p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 flex items-center justify-between text-xs font-bold transition text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Sprout className="w-4 h-4 text-emerald-700" />
                    <div>
                      <div>Switch to Farmer Portal</div>
                      <div className="text-[10px] text-emerald-700 font-normal">Add products, confirm stock & dispatch orders</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    toggleFarmerVerification();
                    showNotification(`Farmer verification toggled to: ${!farmer.verified ? 'VERIFIED' : 'UNVERIFIED'}`);
                  }}
                  className="w-full p-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 flex items-center justify-between text-xs font-bold transition text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-indigo-700" />
                    <div>
                      <div>Toggle Farmer Verification</div>
                      <div className="text-[10px] text-indigo-700 font-normal">Current: {farmer.verified ? 'Verified Producer' : 'Unverified'}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${farmer.verified ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-800'}`}>
                    {farmer.verified ? 'Active' : 'Unverified'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    products.forEach(p => adminUpdateProduct(p.id, { photoVerified: true, freshnessScore: 98, qualityGrade: 'Grade A (Export / Premium)' }));
                    showNotification('All active products certified as Grade A Premium.');
                  }}
                  className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 flex items-center justify-between text-xs font-bold transition text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-amber-500" />
                    <div>
                      <div>Batch Verify All Catalog Produce</div>
                      <div className="text-[10px] text-slate-500 font-normal">Attach quality badges to all listings</div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Platform Integrity & Direct Sourcing Report */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                <span>Direct Farmer Economics & Intermediary Audit</span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Zero Middleman Pass-Through
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-xs text-slate-500">Gross Farmer Payouts</div>
                  <div className="text-lg font-extrabold text-slate-900 mt-1">₹{totalGMV.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-emerald-600 mt-0.5">Credited to farmer UPI/Bank</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-xs text-slate-500">Buyer Wholesale Savings</div>
                  <div className="text-lg font-extrabold text-slate-900 mt-1">₹{totalSavings.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Saved via batch minimums</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-xs text-slate-500">Middleman Commission</div>
                  <div className="text-lg font-extrabold text-emerald-600 mt-1">₹0.00</div>
                  <div className="text-[10px] text-emerald-700 mt-0.5">No dalal deduction</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 leading-relaxed">
                <strong>Admin Notice:</strong> The Farm2Market architecture guarantees cryptographic provenance and physical barn verification for all transactions. Payouts are routed directly to the producer upon consignment delivery receipt.
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 2: Farmer Management */}
      {activeTab === 'FARMERS' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Registered Agricultural Producers</h3>
              <p className="text-xs text-slate-500">Verify credentials, inspect cultivated acreage and manage payout profiles.</p>
            </div>
            <button
              onClick={handleLaunchFarmerPortal}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto shadow-sm transition"
            >
              <Sprout className="w-4 h-4" />
              <span>Open Farmer Operations Console</span>
            </button>
          </div>

          {/* Farmer Card */}
          <div className="border border-slate-200 rounded-2xl p-5 hover:border-indigo-300 transition-all bg-slate-50/40">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={farmer.avatarUrl}
                  alt={farmer.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-base text-slate-900">{farmer.name}</h4>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      farmer.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {farmer.verified ? <ShieldCheck className="w-3 h-3 text-emerald-600" /> : <AlertTriangle className="w-3 h-3 text-amber-600" />}
                      {farmer.verified ? 'Verified Producer' : 'Verification Pending'}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700">{farmer.farmName}</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    {farmer.village}, {farmer.district}, {farmer.state} — {farmer.pincode}
                  </p>
                </div>
              </div>

              {/* Payout & Acreage Stats */}
              <div className="flex items-center gap-6 text-xs border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-6">
                <div>
                  <div className="text-slate-400">Land Holding</div>
                  <div className="font-extrabold text-slate-900">{farmer.farmSizeAcres} Acres</div>
                  <div className="text-[10px] text-slate-400">Cultivated</div>
                </div>
                <div>
                  <div className="text-slate-400">Payout UPI / Bank</div>
                  <div className="font-mono font-bold text-emerald-700">{farmer.bankAccountOrUpi}</div>
                  <div className="text-[10px] text-slate-400">Direct Route</div>
                </div>
                <div>
                  <div className="text-slate-400">Phone Contact</div>
                  <div className="font-bold text-slate-800">{farmer.phone}</div>
                  <div className="text-[10px] text-slate-400">{farmer.email}</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex md:flex-col items-center gap-2">
                <button
                  onClick={() => {
                    toggleFarmerVerification();
                    showNotification(`Farmer verification status updated to: ${!farmer.verified ? 'Verified' : 'Unverified'}`);
                  }}
                  className={`w-full px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                    farmer.verified 
                      ? 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200' 
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  {farmer.verified ? 'Revoke Verification' : 'Approve & Verify'}
                </button>

                <button
                  onClick={handleLaunchFarmerPortal}
                  className="w-full px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
                >
                  Manage Farm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Produce Catalog Moderation */}
      {activeTab === 'PRODUCTS' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Marketplace Produce Moderation</h3>
              <p className="text-xs text-slate-500">Inspect listed crops, modify stock levels, quality certifications or delist products.</p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={productSearch}
                onChange={e => setProductSearch(e.target.value)}
                placeholder="Search produce name or farmer..."
                className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Product Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Produce</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Farmer</th>
                  <th className="py-3 px-3">Retail Price</th>
                  <th className="py-3 px-3">Bulk Wholesale</th>
                  <th className="py-3 px-3">Barn Stock</th>
                  <th className="py-3 px-3">Quality Status</th>
                  <th className="py-3 px-3 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover border" />
                        <div>
                          <div className="font-bold text-slate-900">{p.name}</div>
                          <div className="text-[10px] text-slate-400">Harvest: {p.harvestDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-700">{p.category}</td>
                    <td className="py-3 px-3">{p.farmerName}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">₹{p.pricePerUnit}/{p.unit}</td>
                    <td className="py-3 px-3 text-emerald-700 font-bold">
                      ₹{p.bulkPricePerUnit}/{p.unit}
                      <span className="text-[10px] text-slate-400 font-normal block">&gt;= {p.bulkMinQuantity} {p.unit}</span>
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-800">{p.availableQuantity} {p.unit}</td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.photoVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {p.photoVerified ? `${p.freshnessScore}% Fresh` : 'Unverified'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            adminUpdateProduct(p.id, { photoVerified: !p.photoVerified });
                            showNotification(`Updated quality verification for ${p.name}.`);
                          }}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition"
                          title="Toggle Verification"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete product ${p.name}?`)) {
                              adminDeleteProduct(p.id);
                              showNotification(`Product ${p.name} removed from catalog.`);
                            }
                          }}
                          className="p-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-600 transition"
                          title="Delist Produce"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: All Platform Orders */}
      {activeTab === 'ORDERS' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">All Platform Consignments & Orders</h3>
              <p className="text-xs text-slate-500">Oversee customer transactions, resolve logistics holds and enforce status changes.</p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs overflow-x-auto">
              <button
                onClick={() => setOrderStatusFilter('ALL')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${orderStatusFilter === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
              >
                All ({orders.length})
              </button>
              <button
                onClick={() => setOrderStatusFilter('ORDER_RECEIVED')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${orderStatusFilter === 'ORDER_RECEIVED' ? 'bg-amber-500 text-white' : 'text-slate-600'}`}
              >
                Pending Stock Check
              </button>
              <button
                onClick={() => setOrderStatusFilter('DISPATCHED')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${orderStatusFilter === 'DISPATCHED' ? 'bg-indigo-600 text-white' : 'text-slate-600'}`}
              >
                In Transit
              </button>
              <button
                onClick={() => setOrderStatusFilter('DELIVERED')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${orderStatusFilter === 'DELIVERED' ? 'bg-emerald-600 text-white' : 'text-slate-600'}`}
              >
                Delivered
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredOrders.map(order => (
              <div key={order.id} className="border border-slate-200 rounded-2xl p-4 bg-white hover:border-indigo-300 transition-all space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-lg">
                      {order.id}
                    </span>
                    <span className="text-xs font-bold text-slate-800">{order.buyerName} ({order.buyerCategory === 'bulk' ? 'Commercial' : 'Retail'})</span>
                    <span className="text-[11px] text-slate-400">{order.buyerPhone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-900">
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                      order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800' :
                      order.status === 'DISPATCHED' ? 'bg-indigo-100 text-indigo-800' :
                      order.status === 'QUANTITY_CONFIRMED' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="text-slate-500">
                    <div><strong>Items:</strong> {order.items.map(i => `${i.quantity} ${i.unit} ${i.productName}`).join(', ')}</div>
                    <div className="text-[11px] mt-0.5"><strong>Address:</strong> {order.deliveryAddress}</div>
                    {order.trackingNumber && (
                      <div className="text-[11px] text-indigo-700 font-mono mt-0.5">
                        Logistics: {order.logisticsPartner} | Tracking: {order.trackingNumber}
                      </div>
                    )}
                  </div>

                  {/* Admin status overrides */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => setSelectedOrderForTracking(order)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs transition"
                    >
                      View Tracking
                    </button>

                    {order.status !== 'DELIVERED' && (
                      <button
                        onClick={() => {
                          adminUpdateOrderStatus(order.id, 'DELIVERED');
                          showNotification(`Order ${order.id} marked as DELIVERED.`);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition"
                      >
                        Force Mark Delivered
                      </button>
                    )}

                    {order.status === 'ORDER_RECEIVED' && (
                      <button
                        onClick={() => {
                          adminUpdateOrderStatus(order.id, 'QUANTITY_CONFIRMED');
                          showNotification(`Order ${order.id} confirmed stock availability.`);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition"
                      >
                        Force Confirm Stock
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Logistics Fleet */}
      {activeTab === 'LOGISTICS' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Mandi Logistics Transit Fleet</h3>
            <p className="text-xs text-slate-500">Active transport carriers coordinating temperature-controlled and bulk crop dispatches.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">Kisan Rural Express</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Cold Chain Active</span>
              </div>
              <p className="text-xs text-slate-500">Cold-chain Temperature Controlled Van • MH-15-EG-4412</p>
              <div className="text-xs text-slate-700 font-semibold pt-1">Driver: Santosh Shinde (+91 98223 77124)</div>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">Mandi Farm-to-City Freight</span>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">Heavy Cargo</span>
              </div>
              <p className="text-xs text-slate-500">Heavy Agri Goods Carrier • MH-14-BT-9021</p>
              <div className="text-xs text-slate-700 font-semibold pt-1">Driver: Ganesh Jadhav (+91 94220 55182)</div>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">AgroLogistics Rapid Green</span>
                <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">Electric Cargo</span>
              </div>
              <p className="text-xs text-slate-500">Hyperlocal Zero-Emission EV • MH-12-EV-3104</p>
              <div className="text-xs text-slate-700 font-semibold pt-1">Driver: Rahul Potdar (+91 91580 44299)</div>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">Farmer Direct Pickup</span>
                <span className="text-[10px] font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded-full">Self Dispatch</span>
              </div>
              <p className="text-xs text-slate-500">Patil Farms Pickup Utility • MH-15-AB-1201</p>
              <div className="text-xs text-slate-700 font-semibold pt-1">Driver: Ramesh Patil (+91 98220 14592)</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
