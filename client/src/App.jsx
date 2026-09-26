import React, { useState, lazy, Suspense } from 'react'
import MainLayout from './MainLayout'
import useAuthStore from './store/useAuthStore'
import { ThemeProvider } from './context/ThemeContext'

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Courses = lazy(() => import('./pages/Courses'));
const Agents = lazy(() => import('./pages/Agents'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Profile = lazy(() => import('./pages/Profile'));
const Auth = lazy(() => import('./pages/Auth'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const Lab = lazy(() => import('./pages/Lab'));
const DigitalTwin = lazy(() => import('./pages/DigitalTwin'));
const KnowledgeGraph = lazy(() => import('./pages/KnowledgeGraph'));
const Productivity = lazy(() => import('./pages/Productivity'));
const Metaverse = lazy(() => import('./pages/Metaverse'));
const RiskPrediction = lazy(() => import('./pages/RiskPrediction'));
const Settings = lazy(() => import('./pages/Settings'));
const LearningGalaxy = lazy(() => import('./pages/LearningGalaxy'));

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const { isAuthenticated, onboarded, setOnboarded } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <ThemeProvider>
        <div className="neural-bg">
          <Suspense fallback={<div className="min-h-screen soft-gradient" />}>
            <Auth />
          </Suspense>
        </div>
      </ThemeProvider>
    );
  }

  if (!onboarded) {
    return (
      <ThemeProvider>
        <div className="neural-bg">
          <Suspense fallback={<div className="min-h-screen soft-gradient" />}>
            <Onboarding onComplete={() => setOnboarded(true)} />
          </Suspense>
        </div>
      </ThemeProvider>
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard setActivePage={setActivePage} />;
      case 'courses': return <Courses />;
      case 'agents': return <Agents />;
      case 'analytics': return <Analytics setActivePage={setActivePage} />;
      case 'profile': return <Profile setActivePage={setActivePage} />;
      case 'lab': return <Lab />;
      case 'digital_twin': return <DigitalTwin />;
      case 'knowledge_graph': return <KnowledgeGraph />;
      case 'productivity': return <Productivity />;
      case 'metaverse': return <Metaverse />;
      case 'risk_prediction': return <RiskPrediction />;
      case 'settings': return <Settings />;
      case 'roadmap': return <LearningGalaxy />;
      default: return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <div className="neural-bg">
        <MainLayout activePage={activePage} setActivePage={setActivePage}>
          <Suspense fallback={<div className="flex items-center justify-center p-20"><div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" /></div>}>
            {renderPage()}
          </Suspense>
        </MainLayout>
      </div>
    </ThemeProvider>
  )
}

export default App
