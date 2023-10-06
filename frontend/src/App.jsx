import "./App.css";
import PublicHeader from "./components/PublicHeader";
import ConcertsPage from "./pages/ConcertsPage";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/custom.scss";
import ProtectedViews from "./utils/ProtectedViews";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedOrganizerViews from "./utils/ProtectedOrganizerViews";
import OrganizerDashboard from "./pages/organizer_protected/OrganizerDashboard";
import EditConcert from "./pages/organizer_protected/EditConcert";
import NotFound from "./pages/NotFound";
import ConcertGuestView from "./pages/ConcertGuestView";
import ProtectedAccountViews from "./utils/ProtectedAccountViews";
import AccountDashboard from "./pages/account_protected/AccountDashboard";
import FooterComponent from "./components/FooterComponent";
import AccountEditProfile from "./pages/account_protected/AccountEditProfile";
import AccountChangePassword from "./pages/account_protected/AccountChangePassword";
import ScrollToTop from "./utils/ScrollToTop";
import { ThemeProvider, createTheme } from "@mui/material";
import { TicketProvider } from "./context/TicketContext";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0DCAF0",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="body">
        <div className="App container-fluid m-0 p-0">
          <BrowserRouter>
            <ScrollToTop>
              <AuthProvider>
                <TicketProvider>
                  <PublicHeader />
                  <div className="container main-content">
                    <Routes>
                      {/* Public routes */}

                      <Route path="/" element={<ConcertsPage />} exact />
                      <Route
                        path="/:concertID"
                        element={<ConcertGuestView />}
                      />
                      <Route path="*" element={<NotFound />} />

                      {/* Inside here are protected routes */}
                      <Route element={<ProtectedViews />}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="*" element={<NotFound />} />
                      </Route>

                      <Route element={<ProtectedAccountViews />}>
                        <Route path="/account" element={<AccountDashboard />} />
                        <Route
                          path="/account/edit"
                          element={<AccountEditProfile />}
                        />
                        <Route
                          path="/account/edit/changepassword"
                          element={<AccountChangePassword />}
                        />
                        <Route path="*" element={<NotFound />} />
                      </Route>

                      <Route element={<ProtectedOrganizerViews />}>
                        <Route
                          path="/dashboard"
                          element={<OrganizerDashboard />}
                        />
                        <Route
                          path="/dashboard/:concertName/edit"
                          element={<EditConcert />}
                        />

                        <Route path="*" element={<NotFound />} />
                      </Route>
                    </Routes>
                  </div>
                  <FooterComponent />
                </TicketProvider>
              </AuthProvider>
            </ScrollToTop>
          </BrowserRouter>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
