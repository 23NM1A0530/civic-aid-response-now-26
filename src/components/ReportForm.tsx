
import { useState } from "react";
import { Camera, Upload, AlertTriangle, User, Phone, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface ReportFormProps {
  location: {lat: number, lng: number} | null;
  setLocation: (location: {lat: number, lng: number} | null) => void;
}

export const ReportForm = ({ location }: ReportFormProps) => {
  const [formData, setFormData] = useState({
    reporterType: '',
    contactNumber: '',
    accidentType: '',
    severity: '',
    numberOfVehicles: '',
    injuries: '',
    description: '',
    patientName: '',
    patientAge: '',
    patientGender: '',
    isAnonymous: false
  });
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedImages(prev => [...prev, ...files]);
    toast({
      title: "Images uploaded",
      description: `${files.length} image(s) added to your report.`,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Report Submitted Successfully!",
        description: "Emergency services have been notified. Help is on the way.",
        variant: "default",
      });
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        reporterType: '',
        contactNumber: '',
        accidentType: '',
        severity: '',
        numberOfVehicles: '',
        injuries: '',
        description: '',
        patientName: '',
        patientAge: '',
        patientGender: '',
        isAnonymous: false
      });
      setUploadedImages([]);
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'minor': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white">
        <CardTitle className="text-2xl flex items-center">
          <AlertTriangle className="w-6 h-6 mr-3" />
          Accident Report Form
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Reporter Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Reporter Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reporterType">I am reporting as</Label>
                <Select value={formData.reporterType} onValueChange={(value) => setFormData({...formData, reporterType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="victim">Accident Victim</SelectItem>
                    <SelectItem value="witness">Witness</SelectItem>
                    <SelectItem value="good-samaritan">Good Samaritan</SelectItem>
                    <SelectItem value="first-responder">First Responder</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="anonymous"
                checked={formData.isAnonymous}
                onCheckedChange={(checked) => setFormData({...formData, isAnonymous: checked as boolean})}
              />
              <Label htmlFor="anonymous" className="text-sm">Report anonymously (contact info will not be shared)</Label>
            </div>
          </div>

          {/* Accident Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Accident Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="accidentType">Accident Type</Label>
                <Select value={formData.accidentType} onValueChange={(value) => setFormData({...formData, accidentType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select accident type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vehicle-collision">Vehicle Collision</SelectItem>
                    <SelectItem value="pedestrian">Pedestrian Accident</SelectItem>
                    <SelectItem value="motorcycle">Motorcycle Accident</SelectItem>
                    <SelectItem value="bicycle">Bicycle Accident</SelectItem>
                    <SelectItem value="single-vehicle">Single Vehicle</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="numberOfVehicles">Number of Vehicles</Label>
                <Select value={formData.numberOfVehicles} onValueChange={(value) => setFormData({...formData, numberOfVehicles: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Vehicle</SelectItem>
                    <SelectItem value="2">2 Vehicles</SelectItem>
                    <SelectItem value="3">3 Vehicles</SelectItem>
                    <SelectItem value="4+">4+ Vehicles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">Severity Assessment</Label>
              <RadioGroup 
                value={formData.severity} 
                onValueChange={(value) => setFormData({...formData, severity: value})}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="minor" id="minor" />
                  <Label htmlFor="minor" className={`px-3 py-1 rounded border ${getSeverityColor('minor')}`}>
                    Minor - No injuries, minor damage
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate" className={`px-3 py-1 rounded border ${getSeverityColor('moderate')}`}>
                    Moderate - Minor injuries, medical attention needed
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="critical" id="critical" />
                  <Label htmlFor="critical" className={`px-3 py-1 rounded border ${getSeverityColor('critical')}`}>
                    Critical - Serious injuries, immediate medical attention required
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="injuries">Injuries Reported</Label>
              <Select value={formData.injuries} onValueChange={(value) => setFormData({...formData, injuries: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select injury status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Injuries</SelectItem>
                  <SelectItem value="minor">Minor Injuries</SelectItem>
                  <SelectItem value="serious">Serious Injuries</SelectItem>
                  <SelectItem value="unknown">Unknown/Uncertain</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Patient Information (Optional) */}
          {formData.severity === 'moderate' || formData.severity === 'critical' ? (
            <div className="space-y-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Patient Information (Optional)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input
                    id="patientName"
                    placeholder="If known"
                    value={formData.patientName}
                    onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="patientAge">Age</Label>
                  <Input
                    id="patientAge"
                    type="number"
                    placeholder="If known"
                    value={formData.patientAge}
                    onChange={(e) => setFormData({...formData, patientAge: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="patientGender">Gender</Label>
                  <Select value={formData.patientGender} onValueChange={(value) => setFormData({...formData, patientGender: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="If known" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ) : null}

          {/* Description */}
          <div>
            <Label htmlFor="description">Description of the Accident</Label>
            <Textarea
              id="description"
              placeholder="Please describe what happened, road conditions, weather, and any other relevant details..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Upload Photos (Optional)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <Label htmlFor="image-upload" className="cursor-pointer">
                <span className="text-lg font-medium text-blue-600 hover:text-blue-500">
                  Click to upload photos
                </span>
                <Input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </Label>
              <p className="mt-2 text-sm text-gray-500">
                Upload photos of the accident scene, vehicle damage, or injuries
              </p>
            </div>
            
            {uploadedImages.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Uploaded: {uploadedImages.length} image(s)
                </p>
                <div className="flex flex-wrap gap-2">
                  {uploadedImages.map((file, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {file.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Location Status */}
          {location && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-700 font-medium">
                ✅ Location captured: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 text-lg font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Submitting Report...
              </div>
            ) : (
              "Submit Emergency Report"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
