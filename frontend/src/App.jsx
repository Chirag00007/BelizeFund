import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MultiStepForm from './components/MultiStepForm'
import ConceptForm from './components/ConceptForm'
import Navigation from './components/Navigation'
import CommunityProposalForm from './components/CommunityProposalForm'

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="min-h-screen bg-gray-50 py-8">
          <Routes>
            <Route path="/proposal-form" element={<MultiStepForm />} />
            <Route path="/community-proposal-form" element={<CommunityProposalForm />} />
            <Route path="/" element={<ConceptForm />} />
          </Routes>
        </main>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
              borderRadius: "10px",
              padding: "16px",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App 