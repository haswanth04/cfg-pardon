import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGamification } from '../../contexts/GamificationContext';
import { X, Star } from 'lucide-react';

const BadgeModal = () => {
  const { t, i18n } = useTranslation();
  const { showBadgeModal, setShowBadgeModal } = useGamification();

  if (!showBadgeModal) return null;

  const badge = showBadgeModal;
  const badgeName = i18n.language === 'hi' ? badge.nameHi : badge.name;
  const badgeDescription = i18n.language === 'hi' ? badge.descriptionHi : badge.description;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-sm w-full overflow-hidden">
        {/* Header with celebration background */}
        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-6 text-center relative">
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="relative">
            <div className="text-6xl mb-2">{badge.icon}</div>
            <h2 className="text-xl font-bold text-white mb-1">
              {t('congratulations')}!
            </h2>
            <p className="text-yellow-100 text-sm">
              {t('youEarnedABadge')}
            </p>
          </div>
        </div>

        {/* Badge Details */}
        <div className="p-6 text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${badge.color} text-white text-2xl mb-4`}>
            {badge.icon}
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {badgeName}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4">
            {badgeDescription}
          </p>

          <div className="flex items-center justify-center space-x-2 mb-6">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold text-gray-900">
              +{badge.points} {t('points')}
            </span>
          </div>

          <button
            onClick={() => setShowBadgeModal(null)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            {t('awesome')}!
          </button>
        </div>

        {/* Close button */}
        <button
          onClick={() => setShowBadgeModal(null)}
          className="absolute top-4 right-4 p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default BadgeModal;