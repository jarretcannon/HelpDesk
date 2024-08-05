import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Link,
} from "react-router-dom";
import UserForm from "./components/UserForm";
import AdminDashboard from "./components/AdminDashboard";
import { RequestProvider } from "./providers/RequestProvider";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AlertPage from "./components/AlertPage";

function App() {
  return (
    <ThemeProvider>
      <RequestProvider>
        <Router>
          <ThemedContent />
        </Router>
      </RequestProvider>
    </ThemeProvider>
  );
}

function ThemedContent() {
  const { pathname } = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme(pathname === "/admin" ? "dark" : "light");
  }, [pathname, setTheme]);

  return (
    <div className={`app-container ${theme}`}>
      <header>
        <Navbar bg={theme} variant={theme}>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/helpdesk">
              Help Desk
            </Nav.Link>
            <Nav.Link as={Link} to="/admin">
              Admin Dashboard
            </Nav.Link>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Routes>
          <Route path="/helpdesk" element={<UserForm />} />
          <Route path="/AlertPage" element={<AlertPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/" element={<UserForm />} />
        </Routes>
      </main>
    </div>
  );
}


export default App;
