import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Checkbox } from './ui/checkbox';

interface ReportingSystemProps {
  messageId: string | null;
  onClose: () => void;
}

export const ReportingSystem: React.FC<ReportingSystemProps> = ({ messageId, onClose }) => {
  const [reportType, setReportType] = useState('');
  const [description, setDescription] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const reportTypes = [
    {
      id: 'trafficking',
      label: 'Human Trafficking / Sexual Exploitation',
      description: 'Suspected human trafficking, forced labor, or sexual exploitation',
      urgent: true,
      icon: '🚨'
    },
    {
      id: 'harassment',
      label: 'Harassment or Threats',
      description: 'Threatening, intimidating, or harassing messages',
      urgent: false,
      icon: '⚠️'
    },
    {
      id: 'spam',
      label: 'Spam or Scam',
      description: 'Unwanted promotional content or fraudulent schemes',
      urgent: false,
      icon: '🚫'
    },
    {
      id: 'inappropriate',
      label: 'Inappropriate Content',
      description: 'Sexual content, violence, or other inappropriate material',
      urgent: false,
      icon: '🔞'
    },
    {
      id: 'impersonation',
      label: 'Impersonation',
      description: 'Pretending to be someone else',
      urgent: false,
      icon: '🎭'
    },
    {
      id: 'other',
      label: 'Other Safety Concern',
      description: 'Other safety or security issues',
      urgent: false,
      icon: '🛡️'
    }
  ];

  const handleSubmit = () => {
    if (!reportType) return;
    
    const report = {
      messageId,
      type: reportType,
      description,
      isUrgent: isUrgent || reportTypes.find(t => t.id === reportType)?.urgent,
      timestamp: new Date(),
      reporterId: 'current-user'
    };

    // In a real app, this would be sent to the backend immediately
    console.log('Report submitted:', report);
    
    // For trafficking reports, also log to law enforcement system
    if (reportType === 'trafficking') {
      console.log('URGENT: Trafficking report forwarded to authorities');
    }
    
    setSubmitted(true);
    
    // Auto-close after showing confirmation
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md bg-gray-800 border-gray-600">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-white text-lg font-semibold mb-2">Report Submitted</h3>
              <p className="text-gray-300 mb-4">
                Thank you for keeping our community safe. We take all reports seriously.
              </p>
              {reportType === 'trafficking' && (
                <Alert className="bg-red-900 border-red-600 mb-4">
                  <AlertDescription className="text-red-100">
                    🚨 This urgent report has been forwarded to appropriate authorities and our safety team.
                  </AlertDescription>
                </Alert>
              )}
              <p className="text-gray-400 text-sm">This window will close automatically...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl bg-gray-800 border-gray-600 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-white">Report Message</CardTitle>
            <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
              ✕
            </Button>
          </div>
          <p className="text-gray-400 text-sm">
            Help us keep the community safe by reporting inappropriate content or behavior.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Emergency Notice */}
          <Alert className="bg-red-900 border-red-600">
            <AlertDescription className="text-red-100">
              🚨 <strong>Emergency:</strong> If you or someone you know is in immediate danger, 
              please contact local emergency services (911) or the National Human Trafficking Hotline: 
              <strong> 1-888-373-7888</strong>
            </AlertDescription>
          </Alert>

          {/* Report Type Selection */}
          <div>
            <Label className="text-white text-base font-medium mb-4 block">
              What type of issue are you reporting?
            </Label>
            <RadioGroup value={reportType} onValueChange={setReportType}>
              <div className="space-y-3">
                {reportTypes.map((type) => (
                  <div key={type.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-600 hover:border-gray-500">
                    <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={type.id} className="text-white font-medium flex items-center space-x-2 cursor-pointer">
                        <span>{type.icon}</span>
                        <span>{type.label}</span>
                        {type.urgent && <span className="text-red-400 text-xs">(URGENT)</span>}
                      </Label>
                      <p className="text-gray-400 text-sm mt-1">{type.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Additional Details */}
          <div>
            <Label htmlFor="description" className="text-white text-base font-medium mb-2 block">
              Additional Details (Optional)
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide any additional context that might help our safety team..."
              className="bg-gray-700 border-gray-600 text-white"
              rows={4}
            />
          </div>

          {/* Urgency Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="urgent"
              checked={isUrgent}
              onCheckedChange={(checked) => setIsUrgent(checked as boolean)}
            />
            <Label htmlFor="urgent" className="text-white text-sm">
              This requires immediate attention (safety risk)
            </Label>
          </div>

          {/* Safety Information */}
          <div className="bg-gray-700 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2">🛡️ Your Safety Matters</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Reports are reviewed by our safety team within 24 hours</li>
              <li>• Urgent reports (trafficking, threats) are escalated immediately</li>
              <li>• Your identity is kept confidential</li>
              <li>• We work with law enforcement when necessary</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={handleSubmit}
              disabled={!reportType}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Submit Report
            </Button>
            <Button variant="outline" onClick={onClose} className="border-gray-600 text-gray-300">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};