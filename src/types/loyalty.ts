export type MembershipTier = 'bronze' | 'silver' | 'gold';

export interface TierRequirements {
  minPoints: number;
  minSpent: number;
  minSubscriptionMonths: number;
}

export interface TierBenefits {
  discountPercentage: number;
  pointsMultiplier: number;
  freeDelivery: boolean;
  prioritySupport: boolean;
  exclusiveContent: boolean;
  earlyAccess: boolean;
}

export interface LoyaltyPoints {
  current: number;
  lifetime: number;
  pending: number;
  expiring: number;
  expirationDate: string | null;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'earn' | 'redeem' | 'expire' | 'bonus';
  points: number;
  description: string;
  createdAt: string;
}

export interface Referral {
  id: string;
  referrerId: string;
  referredId: string;
  status: 'pending' | 'completed';
  pointsAwarded: number;
  createdAt: string;
}

export interface LoyaltyProfile {
  userId: string;
  tier: MembershipTier;
  points: LoyaltyPoints;
  totalSpent: number;
  subscriptionMonths: number;
  birthday: string | null;
  referralCode: string;
  lastTierUpdate: string;
  nextTierProgress: number;
}</content>