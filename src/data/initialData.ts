import { UserAccount, FarmerProfile, BuyerProfile, Product, Order, NotificationItem } from '../types';

export const INITIAL_USERS: UserAccount[] = [
  {
    id: 'user_farmer_01',
    username: 'farmer_ramesh',
    email: 'ramesh.patil@agridirect.com',
    password: 'farmer123',
    role: 'farmer',
    profileCompleted: true,
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'user_buyer_01',
    username: 'priya_buyer',
    email: 'priya.sharma@gmail.com',
    password: 'buyer123',
    role: 'buyer',
    profileCompleted: true,
    createdAt: '2026-09-05T09:00:00Z'
  },
  {
    id: 'user_bulk_01',
    username: 'royal_spice',
    email: 'procurement@royalspice.com',
    password: 'bulk123',
    role: 'buyer',
    profileCompleted: true,
    createdAt: '2026-09-10T10:00:00Z'
  },
  {
    id: 'user_admin_01',
    username: 'admin',
    email: 'admin@farm2market.com',
    password: 'admin123',
    role: 'admin',
    profileCompleted: true,
    createdAt: '2026-08-15T00:00:00Z'
  }
];

export const INITIAL_FARMER: FarmerProfile = {
  id: 'farmer_01',
  name: 'Ramesh Balasaheb Patil',
  phone: '+91 98220 14592',
  email: 'ramesh.patil.farms@gmail.com',
  farmName: 'Patil Agro Fresh & Organic Orchards',
  village: 'Dindori',
  district: 'Nashik',
  state: 'Maharashtra',
  pincode: '422202',
  farmSizeAcres: 12.5,
  specialization: ['Vegetables', 'Fruits', 'Grains & Cereals'],
  bankAccountOrUpi: 'rameshpatil@oksbi',
  verified: true,
  avatarUrl: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=200&auto=format&fit=crop&q=80'
};

export const INITIAL_INDIVIDUAL_BUYER: BuyerProfile = {
  id: 'buyer_ind_01',
  category: 'individual',
  name: 'Priya Aniket Sharma',
  phone: '+91 94231 88921',
  email: 'priya.sharma92@outlook.com',
  deliveryAddress: 'Flat 402, Green Meadows Residency, Mayur Colony, Kothrud',
  city: 'Pune',
  state: 'Maharashtra',
  pincode: '411038',
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80'
};

export const INITIAL_BULK_BUYER: BuyerProfile = {
  id: 'buyer_bulk_01',
  category: 'bulk',
  name: 'Vikramaditya Singhania',
  businessName: 'Royal Spice Grand Hotel & Cloud Kitchens Ltd',
  gstin: '27AABCR8921N1ZS',
  phone: '+91 98205 33411',
  email: 'procurement@royalspicekitchens.in',
  deliveryAddress: 'Central Kitchen Hub, Unit 4, MIDC Industrial Area, Hinjewadi Phase 1',
  city: 'Pune',
  state: 'Maharashtra',
  pincode: '411057',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80'
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_tomatoes_01',
    name: 'Farm Fresh Red Vine Tomatoes',
    category: 'Vegetables',
    farmerId: 'farmer_01',
    farmerName: 'Ramesh Balasaheb Patil',
    farmLocation: 'Dindori, Nashik (Maharashtra)',
    farmerPhone: '+91 98220 14592',
    pricePerUnit: 34,
    bulkPricePerUnit: 24,
    bulkMinQuantity: 40,
    unit: 'kg',
    availableQuantity: 850,
    harvestDate: '2026-09-22',
    shelfLifeDays: 8,
    isOrganic: true,
    images: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582284540020-eacbe03cf892?w=600&auto=format&fit=crop&q=80'
    ],
    photoVerified: true,
    qualityGrade: 'Grade A (Export / Premium)',
    freshnessScore: 97,
    aiInspectionNotes: 'Uniform deep red coloration, high firmness index, zero pesticide spray residue detected in sample.',
    description: 'Crisp, succulent vine-ripened tomatoes harvested yesterday morning from our solar-irrigated plot.',
    createdAt: '2026-09-22T06:00:00Z'
  },
  {
    id: 'prod_onions_02',
    name: 'Nashik Red Onions (Lasalgaon Mandi Grade)',
    category: 'Vegetables',
    farmerId: 'farmer_01',
    farmerName: 'Ramesh Balasaheb Patil',
    farmLocation: 'Dindori, Nashik (Maharashtra)',
    farmerPhone: '+91 98220 14592',
    pricePerUnit: 28,
    bulkPricePerUnit: 20,
    bulkMinQuantity: 100,
    unit: 'kg',
    availableQuantity: 2400,
    harvestDate: '2026-09-20',
    shelfLifeDays: 45,
    isOrganic: false,
    images: [
      'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508747703725-719777637510?w=600&auto=format&fit=crop&q=80'
    ],
    photoVerified: true,
    qualityGrade: 'Grade A (Export / Premium)',
    freshnessScore: 95,
    aiInspectionNotes: 'Sun-cured outer skin, tight neck seal, minimum moisture loss risk for bulk warehouse storage.',
    description: 'World-renowned pungency and rich flavor. Ideal for restaurants, caterers, and daily cooking.',
    createdAt: '2026-09-20T08:30:00Z'
  },
  {
    id: 'prod_wheat_03',
    name: 'Pure Sharbati Golden Wheat (MP Sehore Origin)',
    category: 'Grains & Cereals',
    farmerId: 'farmer_01',
    farmerName: 'Ramesh Balasaheb Patil',
    farmLocation: 'Dindori, Nashik (Maharashtra)',
    farmerPhone: '+91 98220 14592',
    pricePerUnit: 48,
    bulkPricePerUnit: 39,
    bulkMinQuantity: 50,
    unit: 'kg',
    availableQuantity: 1800,
    harvestDate: '2026-09-18',
    shelfLifeDays: 360,
    isOrganic: true,
    images: [
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80'
    ],
    photoVerified: true,
    qualityGrade: 'Grade A (Export / Premium)',
    freshnessScore: 99,
    aiInspectionNotes: '100% whole golden kernels, clean moisture levels (under 11%), machine winnowed.',
    description: 'High protein content, sweet natural taste, yields super soft chapatis and rotis.',
    createdAt: '2026-09-18T10:00:00Z'
  },
  {
    id: 'prod_bellpepper_04',
    name: 'Green Bell Peppers (Polyhouse Capsicum)',
    category: 'Vegetables',
    farmerId: 'farmer_01',
    farmerName: 'Ramesh Balasaheb Patil',
    farmLocation: 'Dindori, Nashik (Maharashtra)',
    farmerPhone: '+91 98220 14592',
    pricePerUnit: 46,
    bulkPricePerUnit: 34,
    bulkMinQuantity: 25,
    unit: 'kg',
    availableQuantity: 420,
    harvestDate: '2026-09-22',
    shelfLifeDays: 10,
    isOrganic: true,
    images: [
      'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop&q=80'
    ],
    photoVerified: true,
    qualityGrade: 'Grade A (Export / Premium)',
    freshnessScore: 98,
    aiInspectionNotes: 'Thick-walled bell peppers with glossy waxy coat. No sun-scald or fungal spots.',
    description: 'Crispy and sweet green capsicums grown in our climate-controlled shade net polyhouse.',
    createdAt: '2026-09-22T07:15:00Z'
  },
  {
    id: 'prod_mango_05',
    name: 'Organic Kesar Mangoes (Gir Sweet Orchard)',
    category: 'Fruits',
    farmerId: 'farmer_01',
    farmerName: 'Ramesh Balasaheb Patil',
    farmLocation: 'Dindori, Nashik (Maharashtra)',
    farmerPhone: '+91 98220 14592',
    pricePerUnit: 140,
    bulkPricePerUnit: 105,
    bulkMinQuantity: 30,
    unit: 'kg',
    availableQuantity: 320,
    harvestDate: '2026-09-21',
    shelfLifeDays: 9,
    isOrganic: true,
    images: [
      'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80'
    ],
    photoVerified: true,
    qualityGrade: 'Grade A (Export / Premium)',
    freshnessScore: 96,
    aiInspectionNotes: 'Naturally tree-ripened with hay grass, zero chemical carbide ripening.',
    description: 'Saffron fragrance with high pulp sweetness. Verified 100% carbide-free naturally matured.',
    createdAt: '2026-09-21T09:00:00Z'
  },
  {
    id: 'prod_turmeric_06',
    name: 'Raw Organic Salem Turmeric (High Curcumin 5.2%)',
    category: 'Spices',
    farmerId: 'farmer_01',
    farmerName: 'Ramesh Balasaheb Patil',
    farmLocation: 'Dindori, Nashik (Maharashtra)',
    farmerPhone: '+91 98220 14592',
    pricePerUnit: 155,
    bulkPricePerUnit: 118,
    bulkMinQuantity: 20,
    unit: 'kg',
    availableQuantity: 260,
    harvestDate: '2026-09-19',
    shelfLifeDays: 180,
    isOrganic: true,
    images: [
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80'
    ],
    photoVerified: true,
    qualityGrade: 'Grade A (Export / Premium)',
    freshnessScore: 99,
    aiInspectionNotes: 'Lab tested curcumin level 5.23%. Zero artificial dye or lead chromate polishing.',
    description: 'Raw unpolished organic golden turmeric rhizomes with potent natural medicinal benefits.',
    createdAt: '2026-09-19T11:40:00Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-2026-8921',
    buyerId: 'buyer_bulk_01',
    buyerName: 'Royal Spice Grand Hotel (Procurement Dept)',
    buyerPhone: '+91 98205 33411',
    buyerCategory: 'bulk',
    deliveryAddress: 'Central Kitchen Hub, Unit 4, MIDC Industrial Area, Hinjewadi Phase 1, Pune - 411057',
    items: [
      {
        productId: 'prod_onions_02',
        productName: 'Nashik Red Onions (Lasalgaon Mandi Grade)',
        farmerId: 'farmer_01',
        farmerName: 'Ramesh Balasaheb Patil',
        quantity: 150,
        unit: 'kg',
        unitPrice: 20, // Bulk price unlocked
        isBulk: true,
        totalPrice: 3000,
        imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80'
      },
      {
        productId: 'prod_tomatoes_01',
        productName: 'Farm Fresh Red Vine Tomatoes',
        farmerId: 'farmer_01',
        farmerName: 'Ramesh Balasaheb Patil',
        quantity: 60,
        unit: 'kg',
        unitPrice: 24, // Bulk price unlocked
        isBulk: true,
        totalPrice: 1440,
        imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'
      }
    ],
    subtotal: 4440,
    savings: 1800, // Regular was 150*28 + 60*34 = 4200 + 2040 = 6240 -> Saved 1800!
    deliveryFee: 120,
    platformFee: 0,
    totalAmount: 4560,
    paymentMethod: 'UPI',
    paymentStatus: 'PAID',
    status: 'ORDER_RECEIVED', // Waiting for Farmer Step 5 "Check Quantity"
    farmerConfirmedQuantity: false,
    farmerNotes: 'Fresh morning harvest ready in crated lots.',
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    timeline: [
      {
        status: 'ORDER_PLACED',
        title: 'Order Placed by Buyer',
        description: 'Bulk order submitted with instant UPI pre-authorization.',
        timestamp: '1 hour ago',
        completed: true
      },
      {
        status: 'ORDER_RECEIVED',
        title: 'Order Received by Farmer',
        description: 'Patil Farms alerted. Awaiting physical quantity & stock cross-check.',
        timestamp: '55 mins ago',
        completed: true
      },
      {
        status: 'QUANTITY_CONFIRMED',
        title: 'Quantity & Availability Cross-Check',
        description: 'Patil Farms must verify requested weight against physical crates.',
        timestamp: 'Pending farmer verification',
        completed: false
      },
      {
        status: 'PACKED',
        title: 'Produce Graded & Packed',
        description: 'Packed into breathable agri-crates with batch barcode tags.',
        timestamp: 'Pending',
        completed: false
      },
      {
        status: 'DISPATCHED',
        title: 'Dispatched with Logistics Partner',
        description: 'Assigned to Kisan Express Rural Transit.',
        timestamp: 'Pending',
        completed: false
      },
      {
        status: 'DELIVERED',
        title: 'Delivered to Customer Doorstep',
        description: 'Delivered & verified against physical receipt.',
        timestamp: 'Pending',
        completed: false
      }
    ]
  },
  {
    id: 'ORD-2026-8804',
    buyerId: 'buyer_ind_01',
    buyerName: 'Priya Aniket Sharma',
    buyerPhone: '+91 94231 88921',
    buyerCategory: 'individual',
    deliveryAddress: 'Flat 402, Green Meadows Residency, Mayur Colony, Kothrud, Pune - 411038',
    items: [
      {
        productId: 'prod_tomatoes_01',
        productName: 'Farm Fresh Red Vine Tomatoes',
        farmerId: 'farmer_01',
        farmerName: 'Ramesh Balasaheb Patil',
        quantity: 5,
        unit: 'kg',
        unitPrice: 34,
        isBulk: false,
        totalPrice: 170,
        imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'
      },
      {
        productId: 'prod_bellpepper_04',
        productName: 'Green Bell Peppers (Polyhouse Capsicum)',
        farmerId: 'farmer_01',
        farmerName: 'Ramesh Balasaheb Patil',
        quantity: 3,
        unit: 'kg',
        unitPrice: 46,
        isBulk: false,
        totalPrice: 138,
        imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop&q=80'
      }
    ],
    subtotal: 308,
    savings: 0,
    deliveryFee: 40,
    platformFee: 0,
    totalAmount: 348,
    paymentMethod: 'UPI',
    paymentStatus: 'PAID',
    status: 'DISPATCHED', // Already confirmed and in transit!
    farmerConfirmedQuantity: true,
    farmerNotes: 'Harvested fresh at 6:30 AM today.',
    logisticsPartner: 'Kisan Rural Express (Vehicle MH-15-EG-4412)',
    trackingNumber: 'F2M-TRK-78491',
    estimatedDeliveryDate: 'Today by 4:00 PM',
    createdAt: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
    timeline: [
      {
        status: 'ORDER_PLACED',
        title: 'Order Placed by Buyer',
        description: 'Retail order placed via UPI Payment.',
        timestamp: '4 hours ago',
        completed: true
      },
      {
        status: 'ORDER_RECEIVED',
        title: 'Order Received by Farmer',
        description: 'Ramesh Patil notified of new household order.',
        timestamp: '3.8 hours ago',
        completed: true
      },
      {
        status: 'QUANTITY_CONFIRMED',
        title: 'Quantity & Availability Confirmed',
        description: 'Farmer Ramesh Patil cross-checked available stock (5kg tomatoes, 3kg bell peppers) and confirmed 100% availability.',
        timestamp: '3.5 hours ago',
        completed: true
      },
      {
        status: 'PACKED',
        title: 'Produce Graded & Packed',
        description: 'Packed in eco-friendly ventilated cartons with Farm2Market quality seal.',
        timestamp: '2 hours ago',
        completed: true
      },
      {
        status: 'DISPATCHED',
        title: 'Dispatched with Logistics Partner',
        description: 'Driver Santosh Shinde picked up package in Temperature-Controlled Van MH-15-EG-4412.',
        timestamp: '1 hour ago',
        completed: true
      },
      {
        status: 'DELIVERED',
        title: 'Delivered to Customer Doorstep',
        description: 'Expected arrival at Kothrud, Pune.',
        timestamp: 'Estimated 4:00 PM',
        completed: false
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_01',
    targetRole: 'farmer',
    title: '🔔 New Bulk Order Received!',
    message: 'Royal Spice Grand Hotel placed an order for 150kg Onions & 60kg Tomatoes (₹4,560). Please verify quantity and confirm availability.',
    orderId: 'ORD-2026-8921',
    type: 'order',
    timestamp: '1 hour ago',
    read: false
  },
  {
    id: 'notif_02',
    targetRole: 'buyer',
    title: '🚚 Your Order is Out for Delivery!',
    message: 'Order #ORD-2026-8804 has been dispatched by Kisan Rural Express. Tracking: F2M-TRK-78491.',
    orderId: 'ORD-2026-8804',
    type: 'delivery',
    timestamp: '1 hour ago',
    read: false
  }
];
