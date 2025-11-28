export interface ReferralData {
  driverId: string;
  clientName: string;
  clientPhone: string;
  timestamp: string;
}

export interface IncentiveInfo {
  originalPrice: number;
  discountedPrice: number;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}