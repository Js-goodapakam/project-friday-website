import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import CRM from "./pages/CRM";
import Automation from "./pages/Automation";
import Communication from "./pages/Communication";
import AI from "./pages/AI";
import Transformation from "./pages/Transformation";
import Branding from "./pages/Branding";
import WebDev from "./pages/WebDev";
import SEO from "./pages/SEO";
import IndustriesPage from "./pages/Industries";
import OurTeam from "./pages/OurTeam";
import Careers from "./pages/Careers";
import Vision from "./pages/Vision";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { EASE } from "./lib/motion";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: EASE }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/automation" element={<Automation />} />
          <Route path="/communication" element={<Communication />} />
          <Route path="/friday-ai" element={<AI />} />
          <Route path="/digital-transformation" element={<Transformation />} />
          <Route path="/digital-marketing/branding" element={<Branding />} />
          <Route path="/digital-marketing/website-development" element={<WebDev />} />
          <Route path="/digital-marketing/seo" element={<SEO />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/about/our-team" element={<OurTeam />} />
          <Route path="/about/careers" element={<Careers />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}
