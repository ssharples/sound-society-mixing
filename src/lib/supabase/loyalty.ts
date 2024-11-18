import { supabase } from '../supabase';
import { LoyaltyProfile, Transaction, Referral } from '../../types/loyalty';
import { calculateTier, calculateNextTierProgress, generateReferralCode } from '../loyalty/utils';
import { POINTS_PER_DOLLAR, REFERRAL_POINTS, BIRTHDAY_POINTS } from '../loyalty/config';

export const createLoyaltyProfile = async (userId: string): Promise<LoyaltyProfile> => {
  const profile: LoyaltyProfile = {
    userId,
    tier: 'bronze',
    points: {
      current: 0,
      lifetime: 0,
      pending: 0,
      expiring: 0,
      expirationDate: null
    },
    totalSpent: 0,
    subscriptionMonths: 0,
    birthday: null,
    referralCode: generateReferralCode(userId),
    lastTierUpdate: new Date().toISOString(),
    nextTierProgress: 0
  };

  const { error } = await supabase
    .from('loyalty_profiles')
    .insert(profile);

  if (error) throw error;
  return profile;
};

export const getLoyaltyProfile = async (userId: string): Promise<LoyaltyProfile | null> => {
  const { data, error } = await supabase
    .from('loyalty_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const updatePoints = async (
  userId: string,
  amount: number,
  type: Transaction['type'],
  description: string
): Promise<void> => {
  const { data: profile, error: profileError } = await supabase
    .from('loyalty_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (profileError) throw profileError;

  const newPoints = {
    ...profile.points,
    current: profile.points.current + amount,
    lifetime: type === 'earn' ? profile.points.lifetime + amount : profile.points.lifetime
  };

  const transaction: Partial<Transaction> = {
    userId,
    type,
    points: amount,
    description,
    createdAt: new Date().toISOString()
  };

  const { error: transactionError } = await supabase
    .from('transactions')
    .insert(transaction);

  if (transactionError) throw transactionError;

  const { error: updateError } = await supabase
    .from('loyalty_profiles')
    .update({ points: newPoints })
    .eq('user_id', userId);

  if (updateError) throw updateError;
};

export const processReferral = async (referralCode: string, newUserId: string): Promise<void> => {
  const { data: referrer, error: referrerError } = await supabase
    .from('loyalty_profiles')
    .select('user_id')
    .eq('referral_code', referralCode)
    .single();

  if (referrerError) throw referrerError;

  const referral: Partial<Referral> = {
    referrerId: referrer.user_id,
    referredId: newUserId,
    status: 'pending',
    pointsAwarded: 0,
    createdAt: new Date().toISOString()
  };

  const { error: referralError } = await supabase
    .from('referrals')
    .insert(referral);

  if (referralError) throw referralError;
};

export const completeReferral = async (referralId: string): Promise<void> => {
  const { data: referral, error: referralError } = await supabase
    .from('referrals')
    .select('*')
    .eq('id', referralId)
    .single();

  if (referralError) throw referralError;

  await updatePoints(
    referral.referrerId,
    REFERRAL_POINTS,
    'earn',
    'Successful referral bonus'
  );

  const { error: updateError } = await supabase
    .from('referrals')
    .update({
      status: 'completed',
      pointsAwarded: REFERRAL_POINTS
    })
    .eq('id', referralId);

  if (updateError) throw updateError;
};

export const processPurchase = async (
  userId: string,
  amount: number
): Promise<void> => {
  const points = Math.floor(amount * POINTS_PER_DOLLAR);
  
  await updatePoints(
    userId,
    points,
    'earn',
    `Purchase points: $${amount.toFixed(2)}`
  );

  const { error } = await supabase
    .from('loyalty_profiles')
    .update({
      totalSpent: supabase.sql`total_spent + ${amount}`
    })
    .eq('user_id', userId);

  if (error) throw error;
};</content>