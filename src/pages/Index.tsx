
import { useState, useEffect } from "react";
import { MapPin, Camera, Phone, AlertTriangle, Clock, Hospital, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ReportForm } from "@/components/ReportForm";
import { LocationTracker } from "@/components/LocationTracker";
import { EmergencyContacts } from "@/components/EmergencyContacts";

const Index = () => {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-red-500">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Emergency Report</h1>
                <p className="text-sm text-gray-600">Quick Accident Reporting System</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              System Active
            </Badge>
          </div>
        </div>
      </header>

      {/* Emergency Alert Banner */}
      <div className="bg-red-500 text-white py-2">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-medium">
            🚨 For immediate life-threatening emergencies, call 911 first 🚨
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Report Form */}
          <div className="lg:col-span-2">
            <ReportForm location={location} setLocation={setLocation} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <LocationTracker 
              location={location} 
              setLocation={setLocation}
              locationLoading={locationLoading}
              setLocationLoading={setLocationLoading}
            />
            <EmergencyContacts />
            
            {/* Quick Stats */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    &lt; 2 min
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Units</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    24/7
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Coverage Area</span>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    Citywide
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Emergency Services</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Police: 911</p>
                <p>Fire: 911</p>
                <p>Medical: 911</p>
                <p>Non-Emergency: 311</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Access</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>QR Code Ready</p>
                <p>NFC Compatible</p>
                <p>Mobile Optimized</p>
                <p>Anonymous Reporting</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>24/7 Technical Support</p>
                <p>Multi-language Support</p>
                <p>Accessibility Features</p>
                <p>Privacy Protected</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
