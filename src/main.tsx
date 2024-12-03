import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TransactionProvider } from "./context/TransactionContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TransactionProvider>
          <App />
        </TransactionProvider>
      </UserProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
