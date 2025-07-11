import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store/store.js";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        {/* <div style={{ fontFamily: "Poppins, sans-serif" }}> */}
        <ScrollToTop />
        <App />
        {/* </div> */}
      </Router>
    </Provider>
  </StrictMode>
);
