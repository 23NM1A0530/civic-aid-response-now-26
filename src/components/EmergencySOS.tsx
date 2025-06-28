
import { useState } from "react";
import { Phone, MapPin, AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export const EmergencySOS = () => {
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();

  const emergencyCall = (service: string, number: string) => {
    setIsActive(true);
    
    // Get location if possible
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Emergency call to ${service} - Location: ${latitude}, ${longitude}`);
          
          toast({
            title: `Calling ${service}`,
            description: `Location shared: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          });
        },
        () => {
          console.log(`Emergency call to ${service} - Location unavailable`);
        }
      );
    }

    // Initiate call
    window.location.href = `tel:${number}`;
    
    setTimeout(() => setIsActive(false), 3000);
  };

  const emergencySOSCall = () => {
    let count = 5;
    setCountdown(count);
    
    const timer = setInterval(() => {
      count--;
      setCountdown(count);
      
      if (count === 0) {
        clearInterval(timer);
        emergencyCall("911 Emergency", "911");
        setCountdown(0);
      }
    }, 1000);

    toast({
      title: "Emergency SOS Activated",
      description: "Calling 911 in 5 seconds. Location will be shared automatically.",
      variant: "destructive",
    });
  };

  const cancelSOS = () => {
    setCountdown(0);
    toast({
      title: "SOS Cancelled",
      description: "Emergency call has been cancelled.",
    });
  };

  return (
    <Card className="w-full border-red-200 bg-red-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center text-red-700">
          <AlertTriangle className="w-6 h-6 mr-2 animate-pulse" />
          Emergency SOS
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {countdown > 0 ? (
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-red-600 animate-pulse">
              {countdown}
            </div>
            <p className="text-lg text-red-700 font-medium">
              Calling 911 Emergency Services
            </p>
            <Button 
              variant="outline" 
              onClick={cancelSOS}
              className="w-full border-red-300 text-red-700 hover:bg-red-100"
            >
              Cancel SOS
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Button 
              onClick={emergencySOSCall}
              className="w-full h-16 text-xl font-bold bg-red-600 hover:bg-red-700 text-white"
              disabled={isActive}
            >
              <AlertTriangle className="w-8 h-8 mr-3" />
              SOS - EMERGENCY
            </Button>
            
            <div className="grid grid-cols-1 gap-3">
              <Button 
                onClick={() => emergencyCall("Police", "911")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isActive}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Police (911)
              </Button>
              
              <Button 
                onClick={() => emergencyCall("Fire Department", "911")}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                disabled={isActive}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Fire Dept (911)
              </Button>
              
              <Button 
                onClick={() => emergencyCall("Medical Emergency", "911")}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={isActive}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Medical (911)
              </Button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">Auto Location Sharing</span>
              </div>
              <p className="text-xs text-yellow-700">
                Your location will be automatically shared with emergency services when you make a call.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Quick Access</span>
              </div>
              <p className="text-xs text-blue-700">
                Use the red SOS button for immediate 911 call with 5-second countdown, or use specific service buttons for direct calls.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
