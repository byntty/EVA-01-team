import { lazy, Suspense } from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { ConvexAuthProvider } from './lib/convex-auth'
import { LanguageProvider } from './lib/language'
import { RootErrorBoundary } from './components/RootErrorBoundary'
import { ToolbarErrorBoundary } from './components/ToolbarErrorBoundary'
import { VlyToolbar } from './components/VlyToolbar'
import { RouteSyncer } from './components/RouteSyncer'
import { RequireAuth } from './components/RequireAuth'
import { CookieConsent } from './components/CookieConsent'
import './index.css'

const Landing = lazy(() => import('./pages/Landing'))
const PeakDetail = lazy(() => import('./pages/PeakDetail'))
const Catalog = lazy(() => import('./pages/Catalog'))
const AuthPage = lazy(() => import('./pages/AuthPage'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const NotFound = lazy(() => import('./pages/NotFound'))
const LegalPage = lazy(() => import('./pages/LegalPage'))

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: '#fdf6e3' }}>
      <div className="retro-card p-8 text-center">
        <div className="text-4xl mb-4 retro-float">⛰️</div>
        <p style={{ color: '#6b5a3e', fontFamily: "'Special Elite', Georgia, serif", fontSize: '0.9rem' }}>AlatauPeaks</p>
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootErrorBoundary>
      <ToolbarErrorBoundary>
        <VlyToolbar />
        <ConvexAuthProvider>
          <LanguageProvider>
            <HashRouter>
              <RouteSyncer />
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/catalog" element={<Catalog />} />
                  <Route path="/auth" element={<AuthPage redirectAfterAuth="/dashboard" />} />
                  <Route path="/peak/:id" element={<PeakDetail />} />
                  <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
                  <Route path="/privacy" element={<LegalPage kind="privacy" />} />
                  <Route path="/cookies" element={<LegalPage kind="cookies" />} />
                  <Route path="/terms" element={<LegalPage kind="terms" />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <CookieConsent />
            </HashRouter>
          </LanguageProvider>
        </ConvexAuthProvider>
      </ToolbarErrorBoundary>
    </RootErrorBoundary>
  </StrictMode>
)
