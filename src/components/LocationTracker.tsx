
import { useState, useEffect } from "react";
import { MapPin, Loader, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface LocationTrackerProps {
  location: {lat: number, lng: number} | null;
  setLocation: (location: {lat: number, lng: number} | null) => void;
  locationLoading: boolean;
  setLocationLoading: (loading: boolean) => void;
}

export const LocationTracker = ({ 
  location, 
  setLocation, 
  locationLoading, 
  setLocationLoading 
}: LocationTrackerProps) => {
  const [locationError, setLocationError] = useState<string>('');
  const { toast } = useToast();

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      return;
    }

    setLocationLoading(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setLocationLoading(false);
        toast({
          title: "Location captured",
          description: "Your location has been added to the report.",
        });
      },
      (error) => {
        setLocationLoading(false);
        let errorMessage = '';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location services.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
          default:
            errorMessage = 'An unknown error occurred while retrieving location.';
            break;
        }
        
        setLocationError(errorMessage);
        toast({
          title: "Location Error",
          description: errorMessage,
          variant: "destructive",
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  useEffect(() => {
    // Auto-capture location on component mount
    getCurrentLocation();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-red-600" />
          Location Services
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {location ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                ✅ Location Captured
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={getCurrentLocation}
                disabled={locationLoading}
              >
                Update
              </Button>
            </div>
            
            <div className="bg-gray-50 p-3 rounded border text-xs font-mono">
              <p>Lat: {location.lat.toFixed(6)}</p>
              <p>Lng: {location.lng.toFixed(6)}</p>
            </div>
            
            <div className="text-sm text-gray-600 space-y-1">
              <p>✅ Nearest hospitals will be alerted</p>
              <p>✅ Police dispatch notified</p>
              <p>✅ Ambulance services contacted</p>
            </div>
          </div>
        ) : locationLoading ? (
          <div className="text-center py-4">
            <Loader className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
            <p className="text-sm text-gray-600">Capturing your location...</p>
          </div>
        ) : (
          <div className="space-y-3">
            <Button 
              onClick={getCurrentLocation}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={locationLoading}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Capture Location
            </Button>
            
            {locationError && (
              <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded">
                <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-700">{locationError}</p>
              </div>
            )}
          </div>
        )}
        
        <div className="pt-3 border-t">
          <p className="text-xs text-gray-500">
            Location data is used to dispatch emergency services and will be shared with authorized responders only.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
