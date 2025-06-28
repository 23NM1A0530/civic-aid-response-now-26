
import { Phone, Hospital, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const EmergencyContacts = () => {
  const emergencyServices = [
    {
      name: "Police Emergency",
      number: "911",
      icon: Shield,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "For immediate police assistance"
    },
    {
      name: "Medical Emergency",
      number: "911",
      icon: Hospital,
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "For ambulance and medical emergencies"
    },
    {
      name: "Fire Emergency",
      number: "911",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      description: "For fire and rescue services"
    }
  ];

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Phone className="w-5 h-5 mr-2 text-green-600" />
          Emergency Contacts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {emergencyServices.map((service, index) => (
          <div 
            key={index}
            className={`${service.bgColor} border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <service.icon className={`w-4 h-4 ${service.color}`} />
                <span className="font-medium text-sm">{service.name}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {service.number}
              </Badge>
            </div>
            <p className="text-xs text-gray-600 mb-2">{service.description}</p>
            <Button 
              size="sm" 
              className="w-full h-8 text-xs"
              onClick={() => handleCall(service.number)}
            >
              <Phone className="w-3 h-3 mr-1" />
              Call {service.number}
            </Button>
          </div>
        ))}
        
        <div className="pt-3 border-t">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">Important</span>
            </div>
            <p className="text-xs text-yellow-700">
              This form supplements but does not replace calling 911 for immediate emergencies.
            </p>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <h4 className="text-sm font-medium text-gray-900">Nearby Services</h4>
          <div className="space-y-1 text-xs text-gray-600">
            <p>🏥 City General Hospital - 2.3 miles</p>
            <p>🚑 Metro Ambulance Station - 1.8 miles</p>
            <p>🚔 Central Police Station - 1.2 miles</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
