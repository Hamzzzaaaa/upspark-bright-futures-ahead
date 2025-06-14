
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LoginSignup from "./pages/LoginSignup";
import Application from "./pages/Application";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import TherapistDetails from "./pages/TherapistDetails";
import PlanSelection from "./pages/PlanSelection";
import BookingConfirmation from "./pages/BookingConfirmation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/application" element={<Application />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/therapist/:therapistId" element={<TherapistDetails />} />
            <Route path="/plan-selection" element={<PlanSelection />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
