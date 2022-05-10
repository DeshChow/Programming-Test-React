import { React, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
const SpaceXData = lazy(() => import("./pages/SpaceXData/SpaceXData"));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading page...</p>}>
        <Route path="/" exact>
          <SpaceXData />
        </Route>
      </Suspense>
    </Router>
  );
}

export default App;
