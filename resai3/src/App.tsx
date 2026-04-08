import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResAILandingPageV2 from './pages/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ResAILandingPageV2 />} />
      </Routes>
    </Router>
  );
}

export default App;
