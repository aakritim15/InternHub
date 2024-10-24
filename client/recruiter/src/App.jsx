import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoutes'; // Import the ProtectedRoute component
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import routes from './routes/routes';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {routes.map((route, index) => {
            if (route.protected) {
              
              return (
                <Route
                  key={index}
                  path={route.layout + route.path}
                  element={
                    <ProtectedRoute>
                      {route.component}
                    </ProtectedRoute>
                  }
                />
              );
            }

            return (
              <Route
                key={index}
                path={route.layout + route.path}
                element={route.component}
              />
            );
          })}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
