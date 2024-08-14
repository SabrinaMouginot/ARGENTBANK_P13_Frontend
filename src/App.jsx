import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './designs/pages/HomePage';
import LoginPage from './designs/pages/LoginPage';
// import ProfilePage from './designs/pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
      </Routes>
    </Router>
  )
}

export default App;
