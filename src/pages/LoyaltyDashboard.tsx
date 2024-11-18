import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Crown, Gift, Users, Calendar, ChevronRight, Award } from 'lucide-react';
import { LoyaltyProfile, Transaction } from '../types/loyalty';
import { tierBenefits } from '../lib/loyalty/config';
import { formatDistanceToNow } from 'date-fns';

const mockProfile: LoyaltyProfile = {
  userId: '1',
  tier: 'silver',
  points: {
    current: 12500,
    lifetime: 15000,
    pending: 500,
    expiring: 1000,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  totalSpent: 1500,
  subscriptionMonths: 4,
  birthday: '1990-01-01',
  referralCode: 'USER1-ABC123',
  lastTierUpdate: new Date().toISOString(),
  nextTierProgress: 65
};

const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: '1',
    type: 'earn',
    points: 500,
    description: 'Project completion bonus',
    createdAt: new Date().toISOString()
  },
  // Add more mock transactions as needed
];

export default function LoyaltyDashboard() {
  const { user } = useAuth();
  const [profile] = React.useState<LoyaltyProfile>(mockProfile);
  const [transactions] = React.useState<Transaction[]>(mockTransactions);

  const benefits = tierBenefits[profile.tier];

  return (
    <div className="min-h-screen bg-chrome-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
            Loyalty Program
          </h1>
          <p className="text-gray-400 mt-2">
            Track your rewards, benefits, and membership status
          </p>
        </div>

        {/* Points Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-100">Current Points</h3>
              <Award className="h-6 w-6 text-indigo-400" />
            </div>
            <p className="text-3xl font-bold text-indigo-400">{profile.points.current}</p>
            {profile.points.pending > 0 && (
              <p className="text-sm text-gray-400 mt-2">
                +{profile.points.pending} points pending
              </p>
            )}
          </div>

          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-100">Membership Tier</h3>
              <Crown className="h-6 w-6 text-indigo-400" />
            </div>
            <p className="text-3xl font-bold capitalize bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent">
              {profile.tier}
            </p>
            <div className="mt-2">
              <div className="w-full bg-chrome-700 rounded-full h-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full transition-all"
                  style={{ width: `${profile.nextTierProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {100 - profile.nextTierProgress}% to next tier
              </p>
            </div>
          </div>

          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-100">Referral Program</h3>
              <Users className="h-6 w-6 text-indigo-400" />
            </div>
            <p className="text-sm text-gray-400 mb-2">Your referral code:</p>
            <p className="text-xl font-mono text-indigo-400">{profile.referralCode}</p>
            <button className="mt-2 text-sm text-indigo-400 hover:text-indigo-300">
              Copy code
            </button>
          </div>

          <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-100">Next Reward</h3>
              <Gift className="h-6 w-6 text-indigo-400" />
            </div>
            <p className="text-3xl font-bold text-indigo-400">500</p>
            <p className="text-sm text-gray-400 mt-2">
              Birthday bonus in {formatDistanceToNow(new Date(profile.birthday!))}
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-100 mb-6">Your Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Discount</span>
                <span className="text-indigo-400">{benefits.discountPercentage}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Points Multiplier</span>
                <span className="text-indigo-400">{benefits.pointsMultiplier}x</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Free Delivery</span>
                <span className="text-indigo-400">{benefits.freeDelivery ? 'Yes' : 'No'}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Priority Support</span>
                <span className="text-indigo-400">{benefits.prioritySupport ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Exclusive Content</span>
                <span className="text-indigo-400">{benefits.exclusiveContent ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Early Access</span>
                <span className="text-indigo-400">{benefits.earlyAccess ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-chrome-800 border border-chrome-600 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-100 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between py-3 border-b border-chrome-700 last:border-0"
              >
                <div>
                  <p className="text-gray-300">{transaction.description}</p>
                  <p className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(transaction.createdAt), { addSuffix: true })}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className={`text-lg font-medium ${
                    transaction.type === 'earn' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.type === 'earn' ? '+' : '-'}{transaction.points}
                  </span>
                  <ChevronRight className="h-5 w-5 text-gray-500 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}