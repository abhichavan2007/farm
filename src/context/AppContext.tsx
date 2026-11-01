import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  UserRole, 
  BuyerCategory, 
  UserAccount,
  FarmerProfile, 
  BuyerProfile, 
  Product, 
  CartItem, 
  Order, 
  NotificationItem, 
  OrderStatus 
} from '../types';
import { 
  INITIAL_USERS,
  INITIAL_FARMER, 
  INITIAL_INDIVIDUAL_BUYER, 
  INITIAL_BULK_BUYER, 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_NOTIFICATIONS 
} from '../data/initialData';

interface AppContextType {
  // Auth & Session
  users: UserAccount[];
  currentUser: UserAccount | null;
  isAuthenticated: boolean;
  registerUser: (username: string, email: string, password: string, role: UserRole) => { success: boolean; error?: string };
  loginUser: (usernameOrEmail: string, password: string) => { success: boolean; error?: string };
  logoutUser: () => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  completeOnboarding: (data: Partial<FarmerProfile> | Partial<BuyerProfile>) => void;

  // Active Role & Buyer Profile
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  buyerType: BuyerCategory;
  setBuyerType: (type: BuyerCategory) => void;

  farmer: FarmerProfile;
  updateFarmerProfile: (profile: Partial<FarmerProfile>) => void;
  individualBuyer: BuyerProfile;
  bulkBuyer: BuyerProfile;
  activeBuyer: BuyerProfile;
  updateBuyerProfile: (profile: Partial<BuyerProfile>) => void;

  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'farmerId' | 'farmerName' | 'farmLocation' | 'farmerPhone'>) => Product;
  verifyProductPhoto: (productId: string, score: number, grade: Product['qualityGrade'], notes: string) => void;
  deleteProduct: (productId: string) => void;

  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartSavings: number;

  orders: Order[];
  placeOrder: (paymentMethod: Order['paymentMethod'], deliveryAddress: string) => Order;
  farmerConfirmQuantity: (orderId: string, confirmed: boolean, notes?: string) => void;
  farmerPackOrder: (orderId: string) => void;
  farmerDispatchOrder: (orderId: string, partner: string, trackingNo: string, eta: string) => void;
  markOrderDelivered: (orderId: string) => void;

  notifications: NotificationItem[];
  unreadFarmerNotifications: number;
  unreadBuyerNotifications: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: (role: UserRole) => void;

  // Modals & UI Controls
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAddProductModalOpen: boolean;
  setIsAddProductModalOpen: (open: boolean) => void;
  isCheckQuantityModalOpen: boolean;
  setIsCheckQuantityModalOpen: (open: boolean) => void;
  activeOrderForQuantityCheck: Order | null;
  setActiveOrderForQuantityCheck: (order: Order | null) => void;
  isDeliveryModalOpen: boolean;
  setIsDeliveryModalOpen: (open: boolean) => void;
  activeOrderForDelivery: Order | null;
  setActiveOrderForDelivery: (order: Order | null) => void;
  isPhotoVerifyModalOpen: boolean;
  setIsPhotoVerifyModalOpen: (open: boolean) => void;
  productForPhotoVerify: Product | null;
  setProductForPhotoVerify: (product: Product | null) => void;
  selectedOrderForTracking: Order | null;
  setSelectedOrderForTracking: (order: Order | null) => void;

  // Admin Controls
  adminFarmerMode: boolean;
  setAdminFarmerMode: (mode: boolean) => void;
  toggleFarmerVerification: (verified?: boolean) => void;
  adminUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  adminDeleteProduct: (productId: string) => void;
  adminUpdateProduct: (productId: string, updates: Partial<Product>) => void;

  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: 'f2m_users_v2',
  CURRENT_USER: 'f2m_current_user_v2',
  FARMER: 'f2m_farmer_v2',
  IND_BUYER: 'f2m_ind_buyer_v2',
  BULK_BUYER: 'f2m_bulk_buyer_v2',
  PRODUCTS: 'f2m_products_v2',
  ORDERS: 'f2m_orders_v2',
  NOTIFICATIONS: 'f2m_notifications_v2',
  ROLE: 'f2m_role_v2',
  BUYER_TYPE: 'f2m_buyer_type_v2',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Users state
  const [users, setUsers] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!saved) return INITIAL_USERS;
    try {
      const parsed = JSON.parse(saved);
      const adminExists = parsed.some((u: UserAccount) => u.username === 'admin');
      if (!adminExists) {
        const adminAccount = INITIAL_USERS.find(u => u.username === 'admin');
        if (adminAccount) {
          return [...parsed, adminAccount];
        }
      }
      return parsed;
    } catch {
      return INITIAL_USERS;
    }
  });

  // Current session
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return saved ? JSON.parse(saved) : null;
  });

  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [adminFarmerMode, setAdminFarmerMode] = useState<boolean>(false);

  // Active Role based on current user
  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => {
    return currentUser?.role || 'buyer';
  });

  const [buyerType, setBuyerTypeState] = useState<BuyerCategory>(() => {
    return (localStorage.getItem(STORAGE_KEYS.BUYER_TYPE) as BuyerCategory) || 'individual';
  });

  // Entities
  const [farmer, setFarmer] = useState<FarmerProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FARMER);
    return saved ? JSON.parse(saved) : INITIAL_FARMER;
  });

  const [individualBuyer, setIndividualBuyer] = useState<BuyerProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.IND_BUYER);
    return saved ? JSON.parse(saved) : INITIAL_INDIVIDUAL_BUYER;
  });

  const [bulkBuyer, setBulkBuyer] = useState<BuyerProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BULK_BUYER);
    return saved ? JSON.parse(saved) : INITIAL_BULK_BUYER;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [cart, setCart] = useState<CartItem[]>([]);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isCheckQuantityModalOpen, setIsCheckQuantityModalOpen] = useState(false);
  const [activeOrderForQuantityCheck, setActiveOrderForQuantityCheck] = useState<Order | null>(null);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [activeOrderForDelivery, setActiveOrderForDelivery] = useState<Order | null>(null);
  const [isPhotoVerifyModalOpen, setIsPhotoVerifyModalOpen] = useState(false);
  const [productForPhotoVerify, setProductForPhotoVerify] = useState<Product | null>(null);
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<Order | null>(null);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
      setCurrentRoleState(currentUser.role);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BUYER_TYPE, buyerType);
  }, [buyerType]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FARMER, JSON.stringify(farmer));
  }, [farmer]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IND_BUYER, JSON.stringify(individualBuyer));
  }, [individualBuyer]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BULK_BUYER, JSON.stringify(bulkBuyer));
  }, [bulkBuyer]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  // Audio effect helper (soft web audio ping for real-time notifications)
  const playNotificationSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch {
      // AudioContext may be blocked before interaction, safe fallback
    }
  };

  // Auth Operations
  const registerUser = (username: string, email: string, password: string, role: UserRole) => {
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim().toLowerCase();

    // Check duplicate
    const exists = users.some(
      u => u.username.toLowerCase() === trimmedUsername.toLowerCase() || u.email.toLowerCase() === trimmedEmail
    );

    if (exists) {
      return { success: false, error: 'Username or Email is already registered. Please sign in.' };
    }

    const newUser: UserAccount = {
      id: `usr_${Date.now()}`,
      username: trimmedUsername,
      email: trimmedEmail,
      password,
      role,
      profileCompleted: false,
      createdAt: new Date().toISOString()
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setCurrentRoleState(role);

    // Seed basic profile defaults
    if (role === 'farmer') {
      setFarmer(prev => ({
        ...prev,
        name: trimmedUsername,
        email: trimmedEmail
      }));
    } else {
      setIndividualBuyer(prev => ({
        ...prev,
        name: trimmedUsername,
        email: trimmedEmail
      }));
    }

    // Immediately open profile onboarding!
    setIsOnboardingOpen(true);

    return { success: true };
  };

  const loginUser = (usernameOrEmail: string, password: string) => {
    const query = usernameOrEmail.trim().toLowerCase();
    const user = users.find(
      u => (u.username.toLowerCase() === query || u.email.toLowerCase() === query) && u.password === password
    );

    if (!user) {
      return { success: false, error: 'Invalid username/email or password.' };
    }

    setCurrentUser(user);
    setCurrentRoleState(user.role);

    if (!user.profileCompleted) {
      setIsOnboardingOpen(true);
    }

    return { success: true };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setAdminFarmerMode(false);
    setIsCartOpen(false);
    setSelectedOrderForTracking(null);
  };

  const completeOnboarding = (data: Partial<FarmerProfile> | Partial<BuyerProfile>) => {
    if (currentRole === 'farmer') {
      setFarmer(prev => ({ ...prev, ...data }));
    } else {
      if (buyerType === 'individual') {
        setIndividualBuyer(prev => ({ ...prev, ...(data as Partial<BuyerProfile>) }));
      } else {
        setBulkBuyer(prev => ({ ...prev, ...(data as Partial<BuyerProfile>) }));
      }
    }

    if (currentUser) {
      const updatedUser = { ...currentUser, profileCompleted: true };
      setCurrentUser(updatedUser);
      setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    }

    setIsOnboardingOpen(false);

    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch {
      // ignore
    }
  };

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
  };

  const setBuyerType = (type: BuyerCategory) => {
    setBuyerTypeState(type);
  };

  const activeBuyer = buyerType === 'individual' ? individualBuyer : bulkBuyer;

  const updateFarmerProfile = (data: Partial<FarmerProfile>) => {
    setFarmer(prev => ({ ...prev, ...data }));
  };

  const updateBuyerProfile = (data: Partial<BuyerProfile>) => {
    if (buyerType === 'individual') {
      setIndividualBuyer(prev => ({ ...prev, ...data }));
    } else {
      setBulkBuyer(prev => ({ ...prev, ...data }));
    }
  };

  // Farmer: Add Product
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'farmerId' | 'farmerName' | 'farmLocation' | 'farmerPhone'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod_${Date.now()}`,
      farmerId: farmer.id,
      farmerName: farmer.name,
      farmLocation: `${farmer.village}, ${farmer.district} (${farmer.state})`,
      farmerPhone: farmer.phone,
      createdAt: new Date().toISOString()
    };
    setProducts(prev => [newProduct, ...prev]);

    // Push notification to farmer
    const notif: NotificationItem = {
      id: `notif_${Date.now()}`,
      targetRole: 'farmer',
      title: '🌱 Product Listed Successfully',
      message: `${newProduct.name} (${newProduct.availableQuantity} ${newProduct.unit}) is now live for buyers!`,
      type: 'order',
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [notif, ...prev]);

    return newProduct;
  };

  // Farmer: Photo Verification
  const verifyProductPhoto = (productId: string, score: number, grade: Product['qualityGrade'], notes: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          photoVerified: true,
          freshnessScore: score,
          qualityGrade: grade,
          aiInspectionNotes: notes
        };
      }
      return p;
    }));

    const notif: NotificationItem = {
      id: `notif_${Date.now()}`,
      targetRole: 'farmer',
      title: '✅ Quality Verified',
      message: `Product image verified: Freshness ${score}/100. "${grade}" certificate badge issued!`,
      type: 'verification',
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [notif, ...prev]);
    playNotificationSound();
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const toggleFarmerVerification = (verified?: boolean) => {
    setFarmer(prev => ({
      ...prev,
      verified: verified !== undefined ? verified : !prev.verified
    }));
  };

  const adminUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: newStatus,
          timeline: [
            ...o.timeline,
            {
              status: newStatus,
              title: `Admin Override: ${newStatus.replace('_', ' ')}`,
              description: `Order status updated to ${newStatus.replace('_', ' ')} by System Administrator.`,
              timestamp: 'Just now',
              completed: true
            }
          ]
        };
      }
      return o;
    }));
  };

  const adminDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const adminUpdateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, ...updates } : p));
  };

  // Cart operations
  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      const isBulk = buyerType === 'bulk' || quantity >= product.bulkMinQuantity;

      if (existing) {
        const newQty = existing.quantity + quantity;
        const newIsBulk = buyerType === 'bulk' || newQty >= product.bulkMinQuantity;
        return prev.map(item => item.product.id === product.id 
          ? { ...item, quantity: newQty, isBulk: newIsBulk } 
          : item
        );
      } else {
        return [...prev, { product, quantity, isBulk }];
      }
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const isBulk = buyerType === 'bulk' || quantity >= item.product.bulkMinQuantity;
        return { ...item, quantity, isBulk };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce((sum, item) => {
    const unitPrice = item.isBulk ? item.product.bulkPricePerUnit : item.product.pricePerUnit;
    return sum + (unitPrice * item.quantity);
  }, 0);

  const cartSavings = cart.reduce((sum, item) => {
    if (item.isBulk) {
      const regularTotal = item.product.pricePerUnit * item.quantity;
      const bulkTotal = item.product.bulkPricePerUnit * item.quantity;
      return sum + (regularTotal - bulkTotal);
    }
    return sum;
  }, 0);

  // Buyer: Place Order -> Alerts Farmer
  const placeOrder = (paymentMethod: Order['paymentMethod'], deliveryAddress: string) => {
    const newOrderId = `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const deliveryFee = buyerType === 'bulk' ? 120 : 40;
    const totalAmount = cartSubtotal + deliveryFee;

    const orderItems = cart.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      farmerId: item.product.farmerId,
      farmerName: item.product.farmerName,
      quantity: item.quantity,
      unit: item.product.unit,
      unitPrice: item.isBulk ? item.product.bulkPricePerUnit : item.product.pricePerUnit,
      isBulk: item.isBulk,
      totalPrice: (item.isBulk ? item.product.bulkPricePerUnit : item.product.pricePerUnit) * item.quantity,
      imageUrl: item.product.images[0] || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600'
    }));

    // Deduct stock
    setProducts(prev => prev.map(p => {
      const cartItem = cart.find(ci => ci.product.id === p.id);
      if (cartItem) {
        return {
          ...p,
          availableQuantity: Math.max(0, p.availableQuantity - cartItem.quantity)
        };
      }
      return p;
    }));

    const newOrder: Order = {
      id: newOrderId,
      buyerId: activeBuyer.id,
      buyerName: activeBuyer.category === 'bulk' && activeBuyer.businessName 
        ? `${activeBuyer.businessName} (${activeBuyer.name})`
        : activeBuyer.name,
      buyerPhone: activeBuyer.phone,
      buyerCategory: activeBuyer.category,
      deliveryAddress,
      items: orderItems,
      subtotal: cartSubtotal,
      savings: cartSavings,
      deliveryFee,
      platformFee: 0,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery / Escrow' ? 'PENDING' : 'PAID',
      status: 'ORDER_RECEIVED',
      farmerConfirmedQuantity: false,
      farmerNotes: 'Fresh morning harvest ready.',
      createdAt: new Date().toISOString(),
      timeline: [
        {
          status: 'ORDER_PLACED',
          title: 'Order Placed by Buyer',
          description: `Order successfully placed via ${paymentMethod}.`,
          timestamp: 'Just now',
          completed: true
        },
        {
          status: 'ORDER_RECEIVED',
          title: 'Order Received by Farmer',
          description: 'Farmer alerted. Ready for physical quantity & stock cross-check.',
          timestamp: 'Just now',
          completed: true
        },
        {
          status: 'QUANTITY_CONFIRMED',
          title: 'Quantity & Availability Cross-Check',
          description: 'Farmer cross-checks requested produce weight against stock in barn.',
          timestamp: 'Awaiting farmer check',
          completed: false
        },
        {
          status: 'PACKED',
          title: 'Graded & Packed',
          description: 'Sorted, weighed, and sealed in eco-crates with quality batch tag.',
          timestamp: 'Pending',
          completed: false
        },
        {
          status: 'DISPATCHED',
          title: 'Dispatched with Delivery Partner',
          description: 'Handed over to farm logistics carrier.',
          timestamp: 'Pending',
          completed: false
        },
        {
          status: 'DELIVERED',
          title: 'Delivered to Buyer',
          description: 'Final delivery completed at doorstep.',
          timestamp: 'Pending',
          completed: false
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setIsCartOpen(false);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    // Farmer notification
    const farmerNotif: NotificationItem = {
      id: `notif_${Date.now()}_farmer`,
      targetRole: 'farmer',
      title: '🚨 New Order Received!',
      message: `Buyer ${newOrder.buyerName} ordered ${orderItems.map(i => `${i.quantity}${i.unit} ${i.productName}`).join(', ')} (₹${totalAmount.toLocaleString('en-IN')}). Please confirm quantity!`,
      orderId: newOrderId,
      type: 'order',
      timestamp: 'Just now',
      read: false
    };

    // Buyer notification
    const buyerNotif: NotificationItem = {
      id: `notif_${Date.now()}_buyer`,
      targetRole: 'buyer',
      title: '🎉 Order Placed Successfully!',
      message: `Your order #${newOrderId} for ₹${totalAmount.toLocaleString('en-IN')} has been sent to farmer ${farmer.name}.`,
      orderId: newOrderId,
      type: 'order',
      timestamp: 'Just now',
      read: false
    };

    setNotifications(prev => [farmerNotif, buyerNotif, ...prev]);
    playNotificationSound();
    setSelectedOrderForTracking(newOrder);

    return newOrder;
  };

  // Farmer: Confirm Availability
  const farmerConfirmQuantity = (orderId: string, confirmed: boolean, notes?: string) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        const updatedTimeline = ord.timeline.map(t => {
          if (t.status === 'QUANTITY_CONFIRMED') {
            return {
              ...t,
              completed: true,
              description: notes || `Farmer ${farmer.name} verified physical stock: 100% available and ready for harvest packaging.`,
              timestamp: 'Just now'
            };
          }
          return t;
        });

        return {
          ...ord,
          status: 'QUANTITY_CONFIRMED',
          farmerConfirmedQuantity: confirmed,
          farmerNotes: notes || ord.farmerNotes,
          timeline: updatedTimeline
        };
      }
      return ord;
    }));

    const buyerNotif: NotificationItem = {
      id: `notif_${Date.now()}_q_confirm`,
      targetRole: 'buyer',
      title: '✅ Farmer Confirmed Produce Availability!',
      message: `Farmer ${farmer.name} has cross-checked and verified all items for Order #${orderId}. Produce is now being packed!`,
      orderId: orderId,
      type: 'order',
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [buyerNotif, ...prev]);
    playNotificationSound();
  };

  // Farmer: Pack
  const farmerPackOrder = (orderId: string) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        const updatedTimeline = ord.timeline.map(t => {
          if (t.status === 'PACKED') {
            return {
              ...t,
              completed: true,
              description: 'Weighed, graded, and packed in ventilated containers with Farm2Market QR seal.',
              timestamp: 'Just now'
            };
          }
          return t;
        });

        return {
          ...ord,
          status: 'PACKED',
          timeline: updatedTimeline
        };
      }
      return ord;
    }));

    const buyerNotif: NotificationItem = {
      id: `notif_${Date.now()}_packed`,
      targetRole: 'buyer',
      title: '📦 Order Packed & Sealed',
      message: `Order #${orderId} is packed with Farm2Market quality seal. Ready for pickup.`,
      orderId: orderId,
      type: 'order',
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [buyerNotif, ...prev]);
    playNotificationSound();
  };

  // Farmer: Dispatch
  const farmerDispatchOrder = (orderId: string, partner: string, trackingNo: string, eta: string) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        const updatedTimeline = ord.timeline.map(t => {
          if (t.status === 'DISPATCHED') {
            return {
              ...t,
              completed: true,
              description: `Dispatched with ${partner}. Consignment #${trackingNo}. Expected delivery ${eta}.`,
              timestamp: 'Just now'
            };
          }
          return t;
        });

        return {
          ...ord,
          status: 'DISPATCHED',
          logisticsPartner: partner,
          trackingNumber: trackingNo,
          estimatedDeliveryDate: eta,
          timeline: updatedTimeline
        };
      }
      return ord;
    }));

    const buyerNotif: NotificationItem = {
      id: `notif_${Date.now()}_shipped`,
      targetRole: 'buyer',
      title: '🚚 Order Dispatched & In Transit!',
      message: `Your produce is on the way! Dispatched via ${partner} (Tracking: ${trackingNo}).`,
      orderId: orderId,
      type: 'delivery',
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [buyerNotif, ...prev]);
    playNotificationSound();
  };

  // Mark Delivered
  const markOrderDelivered = (orderId: string) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        const updatedTimeline = ord.timeline.map(t => {
          if (t.status === 'DELIVERED') {
            return {
              ...t,
              completed: true,
              description: 'Delivered directly to customer doorstep. Freshness acknowledged.',
              timestamp: 'Just now'
            };
          }
          return t;
        });

        return {
          ...ord,
          status: 'DELIVERED',
          timeline: updatedTimeline
        };
      }
      return ord;
    }));

    const notif: NotificationItem = {
      id: `notif_${Date.now()}_delivered`,
      targetRole: 'buyer',
      title: '🎉 Order Successfully Delivered!',
      message: `Order #${orderId} was safely delivered! Enjoy fresh farm produce.`,
      orderId: orderId,
      type: 'delivery',
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [notif, ...prev]);
    playNotificationSound();
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = (role: UserRole) => {
    setNotifications(prev => prev.map(n => n.targetRole === role ? { ...n, read: true } : n));
  };

  const unreadFarmerNotifications = notifications.filter(n => n.targetRole === 'farmer' && !n.read).length;
  const unreadBuyerNotifications = notifications.filter(n => n.targetRole === 'buyer' && !n.read).length;

  const resetDemoData = () => {
    setUsers(INITIAL_USERS);
    setCurrentUser(null);
    setFarmer(INITIAL_FARMER);
    setIndividualBuyer(INITIAL_INDIVIDUAL_BUYER);
    setBulkBuyer(INITIAL_BULK_BUYER);
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCart([]);
  };

  const isAuthenticated = Boolean(currentUser);

  return (
    <AppContext.Provider
      value={{
        users,
        currentUser,
        isAuthenticated,
        registerUser,
        loginUser,
        logoutUser,
        isOnboardingOpen,
        setIsOnboardingOpen,
        completeOnboarding,
        currentRole,
        setCurrentRole,
        buyerType,
        setBuyerType,
        farmer,
        updateFarmerProfile,
        individualBuyer,
        bulkBuyer,
        activeBuyer,
        updateBuyerProfile,
        products,
        addProduct,
        verifyProductPhoto,
        deleteProduct,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        cartSavings,
        orders,
        placeOrder,
        farmerConfirmQuantity,
        farmerPackOrder,
        farmerDispatchOrder,
        markOrderDelivered,
        notifications,
        unreadFarmerNotifications,
        unreadBuyerNotifications,
        markNotificationRead,
        markAllNotificationsRead,
        isCartOpen,
        setIsCartOpen,
        isAddProductModalOpen,
        setIsAddProductModalOpen,
        isCheckQuantityModalOpen,
        setIsCheckQuantityModalOpen,
        activeOrderForQuantityCheck,
        setActiveOrderForQuantityCheck,
        isDeliveryModalOpen,
        setIsDeliveryModalOpen,
        activeOrderForDelivery,
        setActiveOrderForDelivery,
        isPhotoVerifyModalOpen,
        setIsPhotoVerifyModalOpen,
        productForPhotoVerify,
        setProductForPhotoVerify,
        selectedOrderForTracking,
        setSelectedOrderForTracking,
        adminFarmerMode,
        setAdminFarmerMode,
        toggleFarmerVerification,
        adminUpdateOrderStatus,
        adminDeleteProduct,
        adminUpdateProduct,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
