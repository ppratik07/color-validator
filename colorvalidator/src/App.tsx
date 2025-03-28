

import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css'
import { Toaster } from './components/ui/sonner'
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from './components/ui/tooltip'
import History from './pages/History';
import Settings from './pages/Settings';
import Index from './pages/Index';
import AnalysisDetails from './pages/AnalysisDetail';
import { LandingPage } from './pages/LandingPage';
import AboutSection  from './pages/AboutSection';
import NotFound  from './pages/NotFound';

function App() {
  return (
    <>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/index" element={<Index />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
            <Route path='/analysis/:id' element={<AnalysisDetails/>}/>
            <Route path='/about' element={<AboutSection/>}/>
            <Route path='/404' element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </>
  )
}

export default App
