import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGamification } from '../../contexts/GamificationContext';
import { Star, Trophy, Target, TrendingUp } from 'lucide-react';

const ProgressTracker = () => {
  const { t, i18n } = useTranslation();
  const { userBadges, userPoints, userLevel, achievements } = useGamification();

  const nextLevelPoints = userLevel * 100;
  const currentLevelProgress = userPoints % 100;
  const progressPercentage = (currentLevelProgress / 100) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {t('yourProgress')}
        </h3>
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="font-semibold text-gray-900">
            {t('level')} {userLevel}
          </span>
        </div>
      </div>

      {/* Level Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{t('pointsToNextLevel')}</span>
          <span>{currentLevelProgress}/100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{userPoints}</div>
          <div className="text-xs text-purple-600">{t('totalPoints')}</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{userBadges.length}</div>
          <div className="text-xs text-yellow-600">{t('badgesEarned')}</div>
        </div>
      </div>

      {/* Recent Badges */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          {t('recentBadges')}
        </h4>
        <div className="flex space-x-2 overflow-x-auto">
          {userBadges.slice(-5).map((badge, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-12 h-12 rounded-full ${badge.color} flex items-center justify-center text-white text-lg`}
              title={i18n.language === 'hi' ? badge.nameHi : badge.name}
            >
              {badge.icon}
            </div>
          ))}
          {userBadges.length === 0 && (
            <div className="text-sm text-gray-500 italic">
              {t('noBadgesYet')}
            </div>
          )}
        </div>
      </div>

      {/* Achievement Progress */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          {t('achievements')}
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{t('trainingsCompleted')}</span>
            <span className="font-medium">{achievements.trainingsCompleted}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{t('groupsJoined')}</span>
            <span className="font-medium">{achievements.groupsJoined}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{t('mediaUploaded')}</span>
            <span className="font-medium">{achievements.mediaUploaded}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">{t('voiceInputsUsed')}</span>
            <span className="font-medium">{achievements.voiceInputsUsed}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;