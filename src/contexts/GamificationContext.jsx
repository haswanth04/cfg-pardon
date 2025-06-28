import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import confetti from 'canvas-confetti';

const GamificationContext = createContext();

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

const BADGES = {
  FIRST_LOGIN: {
    id: 'first_login',
    name: 'Welcome Warrior',
    nameHi: 'स्वागत योद्धा',
    description: 'Completed first login to the platform',
    descriptionHi: 'प्लेटफॉर्म में पहली बार लॉगिन किया',
    icon: '🌟',
    points: 10,
    color: 'bg-blue-500'
  },
  FIRST_TRAINING: {
    id: 'first_training',
    name: 'Learning Beginner',
    nameHi: 'सीखने की शुरुआत',
    description: 'Enrolled in first training program',
    descriptionHi: 'पहले प्रशिक्षण कार्यक्रम में नामांकन',
    icon: '📚',
    points: 25,
    color: 'bg-green-500'
  },
  TRAINING_COMPLETE: {
    id: 'training_complete',
    name: 'Knowledge Seeker',
    nameHi: 'ज्ञान खोजी',
    description: 'Completed first training program',
    descriptionHi: 'पहला प्रशिक्षण कार्यक्रम पूरा किया',
    icon: '🎓',
    points: 50,
    color: 'bg-purple-500'
  },
  COMMUNITY_ACTIVE: {
    id: 'community_active',
    name: 'Community Builder',
    nameHi: 'समुदाय निर्माता',
    description: 'Joined 3 community groups',
    descriptionHi: '3 सामुदायिक समूहों में शामिल हुई',
    icon: '👥',
    points: 30,
    color: 'bg-pink-500'
  },
  MEDIA_CONTRIBUTOR: {
    id: 'media_contributor',
    name: 'Story Teller',
    nameHi: 'कहानी सुनाने वाली',
    description: 'Uploaded 5 media files',
    descriptionHi: '5 मीडिया फाइलें अपलोड कीं',
    icon: '📸',
    points: 40,
    color: 'bg-orange-500'
  },
  VOICE_PIONEER: {
    id: 'voice_pioneer',
    name: 'Voice Pioneer',
    nameHi: 'आवाज़ अग्रणी',
    description: 'Used voice input 10 times',
    descriptionHi: '10 बार आवाज़ इनपुट का उपयोग किया',
    icon: '🎤',
    points: 35,
    color: 'bg-red-500'
  },
  INCOME_DOUBLED: {
    id: 'income_doubled',
    name: 'Prosperity Achiever',
    nameHi: 'समृद्धि प्राप्तकर्ता',
    description: 'Reported income increase of 100%',
    descriptionHi: '100% आय वृद्धि की रिपोर्ट की',
    icon: '💰',
    points: 100,
    color: 'bg-yellow-500'
  },
  MENTOR: {
    id: 'mentor',
    name: 'Mentor Leader',
    nameHi: 'मार्गदर्शक नेता',
    description: 'Helped 5 other women in community',
    descriptionHi: 'समुदाय में 5 अन्य महिलाओं की मदद की',
    icon: '🌟',
    points: 75,
    color: 'bg-indigo-500'
  }
};

export const GamificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [userBadges, setUserBadges] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [showBadgeModal, setShowBadgeModal] = useState(null);
  const [achievements, setAchievements] = useState({
    trainingsCompleted: 0,
    groupsJoined: 0,
    mediaUploaded: 0,
    voiceInputsUsed: 0,
    incomeIncrease: 0,
    peopleHelped: 0
  });

  // Load user progress from localStorage
  useEffect(() => {
    if (user) {
      const savedBadges = localStorage.getItem(`badges_${user.id}`);
      const savedPoints = localStorage.getItem(`points_${user.id}`);
      const savedLevel = localStorage.getItem(`level_${user.id}`);
      const savedAchievements = localStorage.getItem(`achievements_${user.id}`);

      if (savedBadges) setUserBadges(JSON.parse(savedBadges));
      if (savedPoints) setUserPoints(parseInt(savedPoints));
      if (savedLevel) setUserLevel(parseInt(savedLevel));
      if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
    }
  }, [user]);

  // Calculate level based on points
  const calculateLevel = (points) => {
    return Math.floor(points / 100) + 1;
  };

  // Award badge
  const awardBadge = (badgeId) => {
    if (!user || userBadges.some(badge => badge.id === badgeId)) return;

    const badge = BADGES[badgeId];
    if (!badge) return;

    const newBadge = {
      ...badge,
      earnedAt: new Date().toISOString()
    };

    const updatedBadges = [...userBadges, newBadge];
    const updatedPoints = userPoints + badge.points;
    const newLevel = calculateLevel(updatedPoints);

    setUserBadges(updatedBadges);
    setUserPoints(updatedPoints);
    setUserLevel(newLevel);

    // Save to localStorage
    localStorage.setItem(`badges_${user.id}`, JSON.stringify(updatedBadges));
    localStorage.setItem(`points_${user.id}`, updatedPoints.toString());
    localStorage.setItem(`level_${user.id}`, newLevel.toString());

    // Show celebration
    triggerCelebration();
    setShowBadgeModal(newBadge);
  };

  // Trigger confetti celebration
  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Update achievement progress
  const updateAchievement = (type, value) => {
    const updatedAchievements = {
      ...achievements,
      [type]: value
    };

    setAchievements(updatedAchievements);
    localStorage.setItem(`achievements_${user.id}`, JSON.stringify(updatedAchievements));

    // Check for badge eligibility
    checkBadgeEligibility(updatedAchievements);
  };

  // Check if user is eligible for new badges
  const checkBadgeEligibility = (currentAchievements) => {
    // First training enrollment
    if (currentAchievements.trainingsCompleted >= 1 && !userBadges.some(b => b.id === 'first_training')) {
      awardBadge('FIRST_TRAINING');
    }

    // First training completion
    if (currentAchievements.trainingsCompleted >= 1 && !userBadges.some(b => b.id === 'training_complete')) {
      awardBadge('TRAINING_COMPLETE');
    }

    // Community participation
    if (currentAchievements.groupsJoined >= 3 && !userBadges.some(b => b.id === 'community_active')) {
      awardBadge('COMMUNITY_ACTIVE');
    }

    // Media contribution
    if (currentAchievements.mediaUploaded >= 5 && !userBadges.some(b => b.id === 'media_contributor')) {
      awardBadge('MEDIA_CONTRIBUTOR');
    }

    // Voice input usage
    if (currentAchievements.voiceInputsUsed >= 10 && !userBadges.some(b => b.id === 'voice_pioneer')) {
      awardBadge('VOICE_PIONEER');
    }

    // Income doubled
    if (currentAchievements.incomeIncrease >= 100 && !userBadges.some(b => b.id === 'income_doubled')) {
      awardBadge('INCOME_DOUBLED');
    }

    // Mentor achievement
    if (currentAchievements.peopleHelped >= 5 && !userBadges.some(b => b.id === 'mentor')) {
      awardBadge('MENTOR');
    }
  };

  // Award first login badge
  useEffect(() => {
    if (user && !userBadges.some(b => b.id === 'first_login')) {
      setTimeout(() => awardBadge('FIRST_LOGIN'), 1000);
    }
  }, [user]);

  const value = {
    userBadges,
    userPoints,
    userLevel,
    achievements,
    showBadgeModal,
    setShowBadgeModal,
    awardBadge,
    updateAchievement,
    triggerCelebration,
    BADGES
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
};