import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sprout, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Building2, 
  TrendingUp, 
  AlertCircle,
  Truck,
  Shield
} from 'lucide-react';
import { UserRole } from '../../types';

export const AuthPage: React.FC = () => {
  const { registerUser, loginUser } = useApp();

  const [authMode, setAuthMode] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');
  const [adminClicks, setAdminClicks] = useState(0);
  const [adminModeUnlocked, setAdminModeUnlocked] = useState(false);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Register form state
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Hidden admin keyboard shortcut: Ctrl+Shift+A or Alt+A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setAdminModeUnlocked(true);
        setSelectedRole('farmer');
        setAuthMode('LOGIN');
        setLoginIdentifier('admin');
        setLoginPassword('admin123');
        setErrorMessage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleFarmerBadgeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = adminClicks + 1;
    setAdminClicks(next);
    if (next >= 3) {
      setAdminModeUnlocked(true);
      setSelectedRole('farmer');
      setAuthMode('LOGIN');
      setLoginIdentifier('admin');
      setLoginPassword('admin123');
      setErrorMessage(null);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!loginIdentifier.trim() || !loginPassword) {
      setErrorMessage('Please enter both your username/email and password.');
      return;
    }

    const result = loginUser(loginIdentifier, loginPassword);
    if (!result.success) {
      setErrorMessage(result.error || 'Invalid credentials. Please verify and try again.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!regUsername.trim() || !regEmail.trim() || !regPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    const result = registerUser(regUsername, regEmail, regPassword, selectedRole);
    if (!result.success) {
      setErrorMessage(result.error || 'Registration failed.');
    }
  };

  const fillQuickDemo = (role: UserRole, userQuery: string, pass: string) => {
    setSelectedRole(role);
    setAuthMode('LOGIN');
    setLoginIdentifier(userQuery);
    setLoginPassword(pass);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
      
      {/* Container */}
      <div className="max-w-5xl mx-auto w-full px-4">
        
        {/* Main Card Grid */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Hero Panel (Commercial Branding) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-950 p-8 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Background decorative glow */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-56 h-56 rounded-full bg-teal-400/10 blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-6">
              {/* Brand Logo */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                  <Sprout className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="font-extrabold text-2xl tracking-tight leading-tight">Farm2Market</h1>
                  <p className="text-xs text-emerald-300 font-medium">Direct Agricultural Commerce</p>
                </div>
              </div>

              {/* Value Proposition */}
              <div className="space-y-4 pt-4">
                <h2 className="text-2xl font-bold leading-snug">
                  The Direct Marketplace Connecting Farmers with Consumers & Businesses.
                </h2>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  Eliminating unnecessary trading intermediaries to ensure fair prices for growers and farm-fresh produce for households and commercial enterprises.
                </p>
              </div>

              {/* Pillars */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <strong className="block font-semibold text-white">0% Middleman Commission</strong>
                    <span className="text-emerald-200 text-[11px]">Farmers retain maximum value; buyers get honest mandi rates.</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <strong className="block font-semibold text-white">Verified Produce & Quality Scoring</strong>
                    <span className="text-emerald-200 text-[11px]">Full transparency from harvest date to batch grading.</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                  <Truck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <strong className="block font-semibold text-white">Direct Farm Logistics & Sourcing</strong>
                    <span className="text-emerald-200 text-[11px]">Temperature-controlled transit for single & bulk wholesale crates.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="relative z-10 pt-6 mt-6 border-t border-white/10 text-[11px] text-emerald-300 flex items-center justify-between">
              <span>Secure & Encrypted Portal</span>
              <span>© {new Date().getFullYear()} Farm2Market</span>
            </div>
          </div>

          {/* Right Auth Form Panel */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
            
            <div>
              {/* User Type Selection: Farmer vs Buyer */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  1. Select Account Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole('farmer');
                      setErrorMessage(null);
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 relative ${
                      selectedRole === 'farmer'
                        ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-600/20 shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div 
                      onClick={handleFarmerBadgeClick}
                      title="Farmer Account"
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-transform active:scale-90 ${
                        selectedRole === 'farmer' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      👨‍🌾
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>Farmer / Producer</span>
                        {adminModeUnlocked && (
                          <span className="text-[9px] bg-indigo-100 text-indigo-700 font-extrabold px-1.5 py-0.2 rounded">
                            Admin Ready
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500">Sell your harvest directly</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole('buyer');
                      setErrorMessage(null);
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition flex items-center gap-3 ${
                      selectedRole === 'buyer'
                        ? 'border-sky-600 bg-sky-50/80 ring-2 ring-sky-600/20 shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                      selectedRole === 'buyer' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      🛒
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Customer / Buyer</div>
                      <div className="text-[11px] text-slate-500">Household & Bulk procurement</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Mode Toggle: Sign In vs Register */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-5">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    {authMode === 'LOGIN' ? `Sign In as ${selectedRole === 'farmer' ? 'Farmer' : 'Customer'}` : `Create ${selectedRole === 'farmer' ? 'Farmer' : 'Customer'} Account`}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {authMode === 'LOGIN' ? 'Enter your credentials to access your dashboard' : 'Fill in your username, email, and password to register'}
                  </p>
                </div>

                <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('LOGIN');
                      setErrorMessage(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold transition ${
                      authMode === 'LOGIN' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('REGISTER');
                      setErrorMessage(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg font-bold transition ${
                      authMode === 'REGISTER' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Register
                  </button>
                </div>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* FORM: Sign In */}
              {authMode === 'LOGIN' && (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Username or Email Address
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={loginIdentifier}
                        onChange={e => setLoginIdentifier(e.target.value)}
                        placeholder="e.g. farmer_ramesh or ramesh@farms.com"
                        className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full text-xs pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {loginIdentifier.trim().toLowerCase() === 'admin' && (
                    <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs flex items-center gap-2 animate-in fade-in">
                      <Shield className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                      <div>
                        <strong>Executive Console:</strong> Grants admin supervision and live farmer portal operations.
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-2 shadow-md transition ${
                      selectedRole === 'farmer'
                        ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                        : 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/20'
                    }`}
                  >
                    <span>Sign In to {selectedRole === 'farmer' ? 'Farmer Portal' : 'Customer Marketplace'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center pt-2">
                    <span className="text-xs text-slate-500">Don't have an account yet? </span>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('REGISTER');
                        setErrorMessage(null);
                      }}
                      className="text-xs font-bold text-emerald-600 hover:underline"
                    >
                      Register Now
                    </button>
                  </div>
                </form>
              )}

              {/* FORM: Register */}
              {authMode === 'REGISTER' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Username <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={regUsername}
                        onChange={e => setRegUsername(e.target.value)}
                        placeholder="e.g. greenfarms_latur"
                        className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        value={regEmail}
                        onChange={e => setRegEmail(e.target.value)}
                        placeholder="e.g. ramesh@greenfarms.com"
                        className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Password <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="password"
                        value={regPassword}
                        onChange={e => setRegPassword(e.target.value)}
                        placeholder="Min. 6 characters"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Confirm Password <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="password"
                        value={regConfirmPassword}
                        onChange={e => setRegConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                    ℹ️ <strong>Next Step:</strong> Immediately following registration, you will be guided to complete your {selectedRole === 'farmer' ? 'farm location, acreage and payout details' : 'delivery address and business information'}.
                  </div>

                  {loginIdentifier.trim().toLowerCase() === 'admin' && (
                    <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs flex items-center gap-2 animate-in fade-in">
                      <Shield className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                      <div>
                        <strong>Executive Console:</strong> Grants admin supervision and live farmer portal operations.
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-2 shadow-md transition ${
                      selectedRole === 'farmer'
                        ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                        : 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/20'
                    }`}
                  >
                    <span>Complete Registration & Setup Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center pt-1">
                    <span className="text-xs text-slate-500">Already registered? </span>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('LOGIN');
                        setErrorMessage(null);
                      }}
                      className="text-xs font-bold text-emerald-600 hover:underline"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Quick Demo Credentials Footer */}
            <div className="mt-8 pt-4 border-t border-slate-100">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Fast Sign-In (Pre-Configured Accounts)
              </label>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => fillQuickDemo('farmer', 'farmer_ramesh', 'farmer123')}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 font-medium transition"
                >
                  👨‍🌾 Farmer (Ramesh)
                </button>
                <button
                  type="button"
                  onClick={() => fillQuickDemo('buyer', 'priya_buyer', 'buyer123')}
                  className="px-2.5 py-1.5 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 font-medium transition"
                >
                  🛒 Household (Priya)
                </button>
                <button
                  type="button"
                  onClick={() => fillQuickDemo('buyer', 'royal_spice', 'bulk123')}
                  className="px-2.5 py-1.5 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100 font-medium transition"
                >
                  🏢 Bulk Buyer (Royal Spice)
                </button>
                {/* Subtle hidden key for administrator */}
                <button
                  type="button"
                  onClick={() => {
                    setAdminModeUnlocked(true);
                    setSelectedRole('farmer');
                    setAuthMode('LOGIN');
                    setLoginIdentifier('admin');
                    setLoginPassword('admin123');
                    setErrorMessage(null);
                  }}
                  className="p-1.5 text-slate-300 hover:text-indigo-600 rounded-lg transition ml-auto"
                  title="Administrative Console"
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
