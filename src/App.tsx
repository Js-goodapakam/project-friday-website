import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";
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
          <Route path="/crm" element={<ComingSoon title="Friday CRM" />} />
          <Route path="/automation" element={<ComingSoon title="Automation" />} />
          <Route path="/communication" element={<ComingSoon title="Communication" />} />
          <Route path="/ai" element={<ComingSoon title="AI" />} />
          <Route path="/industries" element={<ComingSoon title="Industries" />} />
          <Route path="/vision" element={<ComingSoon title="Vision" />} />
          <Route path="/contact" element={<ComingSoon title="Let's Talk" />} />
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
