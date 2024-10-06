import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import routes from './routes/routes'; // Import your routes file

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route 
            key={index} 
            path={route.layout + route.path}  // Combine layout and path
            element={route.component}  // Use the component from the routes file
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
