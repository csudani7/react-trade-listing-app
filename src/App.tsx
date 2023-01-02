//#Global Imports
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

//#Local Imports
import PrivateRoute from "./hoc/PrivateRoute";
import { Quotes, Stocks } from "./Pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Stocks />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/quotes/:symbol" element={<Quotes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
