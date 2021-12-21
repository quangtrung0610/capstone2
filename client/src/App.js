import "antd/dist/antd.css";
import Home from "./Screens/Home";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "./Assets/Style/App.scss";
import AuthProvider from "./Context/AuthProvider";

function App() {
  return (
    <>
      <Router>
        {/* <AuthProvider> */}
        <Home />
        {/* </AuthProvider> */}
      </Router>
    </>
  );
}

export default App;
