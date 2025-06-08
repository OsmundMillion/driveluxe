import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthContext } from "./context/AuthContext";

// You can replace this with real auth logic later
const mockUser = null
/*{
  id: 1,
  username: "osmund",
  role: "customer",
};*/
// to test a guest user just change it to null Mandem
 // or { id: 1, username: 'osmund', role: 'customer' }

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContext.Provider value={{ user: mockUser }}>
      <App />
    </AuthContext.Provider>
  </StrictMode>
);
