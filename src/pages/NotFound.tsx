
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      <Card className="border-2 border-gray-600 shadow-2xl bg-gray-800 max-w-md w-full">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4 rounded-full shadow-2xl">
              <AlertTriangle className="w-12 h-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-6xl font-black text-white mb-4 tracking-tight">
            404
          </CardTitle>
          <p className="text-2xl text-white font-bold mb-4">
            Oops! Page not found
          </p>
          <p className="text-lg text-gray-200 font-semibold">
            The page you're looking for doesn't exist.
          </p>
        </CardHeader>
        <CardContent className="text-center p-8">
          <Button
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black py-4 px-8 rounded-lg h-14 text-xl shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Home className="w-6 h-6 mr-3" />
            Return to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
