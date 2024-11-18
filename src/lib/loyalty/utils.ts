import { MembershipTier, LoyaltyProfile } from '../../types/loyalty';
import { tierRequirements, tierBenefits } from './config';

export const calculateTier = (profile: LoyaltyProfile): MembershipTier => {
  if (
    profile.points.lifetime >= tierRequirements.gold.minPoints &&
    profile.totalSpent >= tierRequirements.gold.minSpent &&
    profile.subscriptionMonths >= tierRequirements.gold.minSubscriptionMonths
  ) {
    return 'gold';
  }

  if (
    profile.points.lifetime >= tierRequirements.silver.minPoints &&
    profile.totalSpent >= tierRequirements.silver.minSpent &&
    profile.subscriptionMonths >= tierRequirements.silver.minSubscriptionMonths
  ) {
    return 'silver';
  }

  return 'bronze';
};

export const calculateNextTierProgress = (profile: LoyaltyProfile): number => {
  const currentTier = profile.tier;
  if (currentTier === 'gold') return 100;

  const nextTier = currentTier === 'bronze' ? 'silver' : 'gold';
  const requirements = tierRequirements[nextTier];
  
  const pointsProgress = Math.min(100, (profile.points.lifetime / requirements.minPoints) * 100);
  const spentProgress = Math.min(100, (profile.totalSpent / requirements.minSpent) * 100);
  const subscriptionProgress = Math.min(100, (profile.subscriptionMonths / requirements.minSubscriptionMonths) * 100);

  return Math.floor((pointsProgress + spentProgress + subscriptionProgress) / 3);
};

export const calculatePointsExpiration = (points: number): Date => {
  const expirationDate = new Date();
  expirationDate.setMonth(expirationDate.getMonth() + 12);
  return expirationDate;
};

export const generateReferralCode = (userId: string): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const prefix = userId.slice(0, 4).toUpperCase();
  const randomChars = Array.from({ length: 4 }, () => 
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('');
  return `${prefix}-${randomChars}`;
};</content>