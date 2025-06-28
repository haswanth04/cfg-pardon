# CFG-Pradan Rural Women Empowerment Platform

A comprehensive web application designed to empower rural women through training, community engagement, and skill development.

## 🌟 Features

### Core Functionality
- **Role-based Authentication**: Admin, Field Officer, and SHG Woman roles with JWT simulation
- **Multilingual Support**: English and Hindi with react-i18next
- **Mobile-First PWA**: Responsive design with offline capabilities
- **Voice Input**: Web Speech API integration for accessibility
- **Offline Support**: Local storage with sync capabilities
- **Real-time Analytics**: Interactive charts and village-wise data visualization

### Modules
1. **Dashboard**: Role-specific overview with stats and quick actions
2. **Training**: Course enrollment, progress tracking, and certificates
3. **Community**: Groups, discussions, events, and announcements
4. **Analytics**: Impact visualization with charts and village data
5. **Media**: Upload and manage images, audio, and video files
6. **Chatbot**: AI assistant for platform guidance and FAQs
7. **Map**: Geographic visualization of program impact

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd cfg-pradan-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

### Demo Credentials
- **Admin**: admin@cfg-pradan.org / admin123
- **Field Officer**: field@cfg-pradan.org / field123  
- **SHG Woman**: shg@cfg-pradan.org / shg123

## 🛠 Technology Stack

### Frontend
- **React 18** with JSX
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **React Router** for navigation
- **Framer Motion** for animations

### Key Libraries
- **react-i18next**: Internationalization
- **Recharts**: Data visualization
- **Lucide React**: Icons
- **React Hook Form**: Form management
- **Date-fns**: Date utilities

### PWA Features
- **Vite PWA Plugin**: Service worker and manifest
- **Workbox**: Caching strategies
- **Offline-first**: Local storage with sync

## 📱 Mobile Features

### Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Touch-friendly interface with large tap targets
- Optimized layouts for all screen sizes

### PWA Capabilities
- Add to home screen prompt
- Offline functionality
- Background sync
- Push notifications ready

### Accessibility
- Voice input for forms
- High contrast ratios
- Screen reader support
- Keyboard navigation

## 🌐 Multilingual Support

### Languages
- English (default)
- Hindi (हिंदी)

### Features
- Automatic language detection
- Persistent language preference
- Real-time language switching
- Voice input in both languages

## 📊 Analytics & Reporting

### Dashboard Metrics
- Participation rates
- Completion statistics
- Village-wise performance
- Program effectiveness

### Visualizations
- Bar charts for village data
- Pie charts for program distribution
- Line charts for progress trends
- Geographic impact mapping

## 🎯 User Roles & Permissions

### Admin
- Full platform access
- User management
- Analytics overview
- Program administration

### Field Officer
- Assigned village management
- Progress monitoring
- Report generation
- Community facilitation

### SHG Woman
- Training enrollment
- Community participation
- Progress tracking
- Media sharing

## 🔧 Development

### Project Structure
```
src/
├── components/          # React components
│   ├── Auth/           # Authentication
│   ├── Dashboard/      # Dashboard module
│   ├── Training/       # Training module
│   ├── Community/      # Community features
│   ├── Analytics/      # Data visualization
│   ├── Media/          # File management
│   ├── Chatbot/        # AI assistant
│   ├── Map/            # Geographic visualization
│   ├── Layout/         # Header, Sidebar
│   └── VoiceInput/     # Voice functionality
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── i18n/              # Internationalization
└── utils/             # Utility functions
```

### Key Features Implementation

#### Voice Input
```javascript
// Web Speech API integration
const recognition = new SpeechRecognition();
recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
recognition.continuous = true;
recognition.interimResults = true;
```

#### Offline Support
```javascript
// Service worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// Local storage with sync
const addToPendingSync = (operation) => {
  const updatedPendingSync = [...pendingSync, operation];
  localStorage.setItem('pendingSync', JSON.stringify(updatedPendingSync));
};
```

#### Multilingual Setup
```javascript
// i18next configuration
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: {...}, hi: {...} },
    fallbackLng: 'en'
  });
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Vercel**: Frontend deployment
- **Netlify**: Static site hosting
- **GitHub Pages**: Free hosting option

### Environment Variables
```env
VITE_API_URL=your_api_url
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- CFG-Pradan team for requirements and guidance
- Rural women communities for inspiration
- Open source community for tools and libraries

## 📞 Support

For technical support or questions:
- Email: support@cfg-pradan.org
- Documentation: [Link to docs]
- Issues: [GitHub Issues]

---

**Built with ❤️ for empowering rural women through technology**# cfg-pardon
