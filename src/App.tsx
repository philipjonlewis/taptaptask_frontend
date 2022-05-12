import React, { useState } from "react";
import "./styles/tailwind.scss";
// import "./styles/style.scss";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

import { Home, About, Contact, Pricing, ErrorPage } from "./pages";
import { Workshop, Dashboard, Projects } from "./pages/workshop";

import { LogIn, SignUp } from "./pages/authentication";

import { RequireAuth } from "./authentication";

import { LandingNavBar } from "./components/navigation";

import { Routes, Route, useLocation } from "react-router-dom";

const App = () => {
  const [isInWorkshop, setIsInWorkshop] = useState(false);

  const location = useLocation();

  return (
    <>
      {/* instead of using auth as the basis for this LandingNavBar, use a isInsideWorkshop state */}
      {!isInWorkshop && <LandingNavBar />}

      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="pricing" element={<Pricing />} />

          {/* Make an authenticated component */}
          <Route
            path="workshop"
            element={
              <RequireAuth>
                <Workshop setIsInWorkshop={setIsInWorkshop} />
              </RequireAuth>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
          </Route>
          {/* End of authenticated component */}

          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
