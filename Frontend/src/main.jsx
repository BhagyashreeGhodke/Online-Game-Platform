import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "./components/context/ThemeContext.jsx";
import { SidebarProvider } from "./components/context/SidebarContext.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </ThemeProvider>
  </Provider>
);