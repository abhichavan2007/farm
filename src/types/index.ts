export type UserRole = 'farmer' | 'buyer' | 'admin';
export type BuyerCategory = 'individual' | 'bulk';

export interface UserAccount {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  profileCompleted: boolean;
  createdAt: string;
}

export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  farmName: string;
  village: string;
  district: string;
  state: string;
  pincode: string;
  farmSizeAcres: number;
  specialization: string[];
  bankAccountOrUpi: string;
  verified: boolean;
  avatarUrl: string;
}

export interface BuyerProfile {
  id: string;
  category: BuyerCategory; // Individual Household vs Bulk (Restaurant, Retailer, Wholesaler)
  name: string;
  businessName?: string;
  gstin?: string;
  phone: string;
  email: string;
  deliveryAddress: string;
  city: string;
  state: string;
  pincode: string;
  avatarUrl: string;
}

export type ProductCategory = 
  | 'Vegetables' 
  | 'Fruits' 
  | 'Grains & Cereals' 
  | 'Pulses' 
  | 'Spices' 
  | 'Dairy & Natural';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  farmerId: string;
  farmerName: string;
  farmLocation: string;
  farmerPhone: string;
  pricePerUnit: number;        // Standard Retail Price (e.g. per kg)
  bulkPricePerUnit: number;    // Wholesale Price for bulk orders
  bulkMinQuantity: number;     // Threshold (e.g. 50 kg) to unlock bulk price
  unit: 'kg' | 'quintal' | 'box' | 'crate' | 'litre';
  availableQuantity: number;
  harvestDate: string;
  shelfLifeDays: number;
  isOrganic: boolean;
  images: string[];
  photoVerified: boolean;
  qualityGrade: 'Grade A (Export / Premium)' | 'Grade B (Standard)' | 'Economy';
  freshnessScore: number;      // e.g. 96 out of 100
  aiInspectionNotes: string;
  description: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  isBulk: boolean;
}

export type OrderStatus =
  | 'ORDER_PLACED'          // Step 4 Buyer: Order submitted
  | 'ORDER_RECEIVED'        // Step 4 Farmer: Alert received by farmer
  | 'QUANTITY_CONFIRMED'   // Step 5 Farmer: Cross-checked quantity & availability confirmed
  | 'PACKED'                // Farmer packed produce with safety seals
  | 'DISPATCHED'            // Step 6 Farmer: Picked up by logistics, in transit
  | 'DELIVERED';            // Arrived at buyer doorstep

export interface OrderTimelineItem {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  farmerId: string;
  farmerName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  isBulk: boolean;
  totalPrice: number;
  imageUrl: string;
}

export interface Order {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerPhone: string;
  buyerCategory: BuyerCategory;
  deliveryAddress: string;
  items: OrderItem[];
  subtotal: number;
  savings: number; // Bulk discount savings
  deliveryFee: number;
  platformFee: number; // 0 for zero-middleman farmer empowerment
  totalAmount: number;
  paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Net Banking' | 'Cash on Delivery / Escrow';
  paymentStatus: 'PAID' | 'ESCROW_HELD' | 'PENDING';
  status: OrderStatus;
  farmerConfirmedQuantity: boolean;
  farmerNotes?: string;
  logisticsPartner?: string;
  trackingNumber?: string;
  estimatedDeliveryDate?: string;
  createdAt: string;
  timeline: OrderTimelineItem[];
}

export interface NotificationItem {
  id: string;
  targetRole: UserRole;
  title: string;
  message: string;
  orderId?: string;
  type: 'order' | 'verification' | 'delivery' | 'system';
  timestamp: string;
  read: boolean;
}
