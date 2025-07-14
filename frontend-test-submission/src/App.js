import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UrlShortener from "./components/UrlShortener";
import UrlStatistics from "./components/UrlStatistics";
import RedirectPage from "./components/RedirectPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlShortener />} />
        <Route path="/stats" element={<UrlStatistics />} />
        <Route path="/:shortcode" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
