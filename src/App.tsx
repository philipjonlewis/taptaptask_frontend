import React, { useState } from "react";
import "./styles/style.scss";

import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

import { Home, About, Contact, Pricing, ErrorPage } from "./pages";
import {
  Workshop,
  DashboardPanel,
  ProjectsPanel,
  IndividualProject,
  ProjectInformation,
  ProjectPhaseView,
  NotesDashboard,
} from "./pages/workshop";

import { LogIn, SignUp } from "./pages/authentication";

import { RequireAuth } from "./authentication";

import { LandingNavBar } from "./components";

import { Routes, Route, useLocation } from "react-router-dom";

const App = () => {
  const [isInWorkshop, setIsInWorkshop] = useState(false);

  const location = useLocation();

  return (
    <React.Fragment>
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
                <Workshop
                  setIsInWorkshop={setIsInWorkshop}
                  isInWorkshop={isInWorkshop}
                />
              </RequireAuth>
            }
          >
            <Route index element={<DashboardPanel />} />
            <Route path="dashboard" element={<DashboardPanel />} />
            <Route path="notes" element={<NotesDashboard />} />

            <Route path="projects" element={<ProjectsPanel />}>
              <Route
                path=":projectId"
                element={
                  // THis should be surrounded by a params handler
                  <IndividualProject />
                  // THis should be surrounded by a params handler
                }
              >
                <Route index element={<ProjectInformation />} />
                <Route path="information" element={<ProjectInformation />} />
                <Route path="phase" element={<ProjectPhaseView />} />
              </Route>
            </Route>
          </Route>
          {/* End of authenticated component */}

          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AnimatePresence>
    </React.Fragment>
  );
};

export default App;
