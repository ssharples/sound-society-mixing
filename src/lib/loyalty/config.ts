import { TierRequirements, TierBenefits, MembershipTier } from '../../types/loyalty';

export const POINTS_PER_DOLLAR = 10;
export const POINTS_EXPIRATION_MONTHS = 12;
export const REFERRAL_POINTS = 1000;
export const BIRTHDAY_POINTS = 500;

export const tierRequirements: Record<MembershipTier, TierRequirements> = {
  bronze: {
    minPoints: 0,
    minSpent: 0,
    minSubscriptionMonths: 0
  },
  silver: {
    minPoints: 10000,
    minSpent: 1000,
    minSubscriptionMonths: 3
  },
  gold: {
    minPoints: 50000,
    minSpent: 5000,
    minSubscriptionMonths: 6
  }
};

export const tierBenefits: Record<MembershipTier, TierBenefits> = {
  bronze: {
    discountPercentage: 5,
    pointsMultiplier: 1,
    freeDelivery: false,
    prioritySupport: false,
    exclusiveContent: false,
    earlyAccess: false
  },
  silver: {
    discountPercentage: 10,
    pointsMultiplier: 1.5,
    freeDelivery: true,
    prioritySupport: false,
    exclusiveContent: true,
    earlyAccess: false
  },
  gold: {
    discountPercentage: 15,
    pointsMultiplier: 2,
    freeDelivery: true,
    prioritySupport: true,
    exclusiveContent: true,
    earlyAccess: true
  }
};