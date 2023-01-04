//#Global Imports
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

//#Local Imports
import { Quotes, Stocks } from "./Pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Stocks />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/quotes/:symbol" element={<Quotes />} />
      </Routes>
    </Router>
  );
}

export default App;
