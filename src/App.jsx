import React, { lazy, Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';   // ✅ Import Footer

// Pages
import Home from './Components/Home/Home';
import About from './Components/About/About';
import ServicePage from './Components/ServicePage/ServicePage';
import Gallery from './Components/Gallery/Gallery';
import Career from './Components/Career/Career';
import Contact from './Components/Contact/Contact';
import Login from './Components/Login/Login';
import InternshipApplication from './Components/InternshipApplication/InternshipApplication';
import SkillArc from './Components/SkillArc/SkillArc'; // skillarc (donot touch)
import Admin from './Components/Admin/Admin';

const Products = lazy(() => import('./Components/Products/Products'));

// Scroll to Top Component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Reusable motion wrapper for transitions
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -40 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

// Routes wrapped in AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/About" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/Gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
        <Route path="/ServicePage" element={<PageWrapper><ServicePage /></PageWrapper>} />
        <Route path="/Career" element={<PageWrapper><Career /></PageWrapper>} />
        <Route
          path="/Products"
          element={
            <PageWrapper>
              <Suspense fallback={<div style={{color:'white',textAlign:'center',padding:'2rem'}}>Loading Products...</div>}>
                <Products />
              </Suspense>
            </PageWrapper>
          }
        />
        <Route path="/Contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/Login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/internship-application" element={<InternshipApplication />} />
        {/* skillarc (donot touch) */}
        <Route path="/skillarc" element={<SkillArc />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </AnimatePresence>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <AnimatedRoutes />
      <Footer />   {/* ✅ Added Footer globally */}
    </Router>
  );
};

export default App;
