
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivyProvider } from '@privy-io/react-auth';
import Login from "./pages/Login";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import "./lib/i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PrivyProvider 
      appId="cmd3oei8i00w7jr0mgypmn8zv"
      config={{
        appearance: {
          accentColor: "#F9B572", // stashbox-orange
          theme: "light",
          showWalletLoginFirst: false,
          logo: "/lovable-uploads/da7d41e5-363b-4f62-8f48-6bb81deaa23b.png",
          walletChainType: "ethereum-and-solana",
          walletList: [
            "detected_wallets",
            "metamask",
            "phantom"
          ]
        },
        loginMethods: [
          "email",
          "sms",
          "farcaster"
        ],
        fundingMethodConfig: {
          moonpay: {
            useSandbox: true
          }
        },
        embeddedWallets: {
          requireUserPasswordOnCreate: false,
          showWalletUIs: true,
          ethereum: {
            createOnLogin: "off"
          },
          solana: {
            createOnLogin: "off"
          }
        },
        mfa: {
          noPromptOnMfaRequired: false
        },
        externalWallets: {
          solana: {
            connectors: {
              onMount: () => {},
              onUnmount: () => {},
              get: () => []
            }
          }
        }
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Index />} />
              <Route path="/profile" element={<Profile />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </Suspense>
    </PrivyProvider>
  </QueryClientProvider>
);

export default App;
