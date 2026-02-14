import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TripProvider } from './context/TripContext';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { MyTrips } from './pages/MyTrips';
import { CreateTrip } from './pages/CreateTrip';
import { TripDetails } from './pages/TripDetails';
import { BudgetPlanner } from './pages/BudgetPlanner';
import { Explore } from './pages/Explore';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

// Removed the TypeScript interface and kept it simple for JSX
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <TripProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <MainLayout>
                  <Home />
                </MainLayout>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/trips"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <MyTrips />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/trips/new"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <CreateTrip />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/trips/:id"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <TripDetails />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/budget"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <BudgetPlanner />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/explore"
              element={
                <MainLayout>
                  <Explore />
                </MainLayout>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Profile />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Settings />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </TripProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;