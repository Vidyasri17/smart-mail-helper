import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Send, Sparkles, Copy, RefreshCw, User, Calendar, Tag, Mail, Phone, Building } from 'lucide-react';
import { Email } from '@/types/email';
import { useToast } from '@/hooks/use-toast';

interface ResponseEditorProps {
  email: Email;
  onBack: () => void;
  onSave: (response: string) => void;
}

export const ResponseEditor = ({ email, onBack, onSave }: ResponseEditorProps) => {
  const [response, setResponse] = useState(email.aiResponse || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-urgent/10 text-urgent border-urgent';
      case 'high': return 'bg-priority-high/10 text-priority-high border-priority-high';
      case 'medium': return 'bg-priority-medium/10 text-priority-medium border-priority-medium';
      case 'low': return 'bg-priority-low/10 text-priority-low border-priority-low';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-sentiment-positive/10 text-sentiment-positive';
      case 'neutral': return 'bg-sentiment-neutral/10 text-sentiment-neutral';
      case 'negative': return 'bg-sentiment-negative/10 text-sentiment-negative';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleRegenerateResponse = async () => {
    setIsGenerating(true);
    // Simulate AI response generation
    setTimeout(() => {
      const newResponse = `Hello ${email.sender.split('@')[0]},\n\nThank you for contacting our support team regarding "${email.subject}". I understand your concern and I'm here to help.\n\n[AI-generated response would be more specific based on the email content]\n\nPlease let me know if you need any further assistance.\n\nBest regards,\nSupport Team`;
      setResponse(newResponse);
      setIsGenerating(false);
      toast({
        title: "Response regenerated",
        description: "AI has generated a new response for this email.",
      });
    }, 2000);
  };

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(response);
    toast({
      title: "Copied to clipboard",
      description: "The response has been copied to your clipboard.",
    });
  };

  const handleSaveResponse = () => {
    onSave(response);
    toast({
      title: "Response saved",
      description: "The email response has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">AI Response Editor</h1>
            <p className="text-muted-foreground">Review and edit AI-generated response</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Original Email */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Original Email</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Email Meta Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{email.sender}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getPriorityColor(email.priority)}>
                      {email.priority}
                    </Badge>
                    <Badge className={getSentimentColor(email.sentiment)}>
                      {email.sentiment}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{email.date.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    <span>{email.tags.join(', ')}</span>
                  </div>
                </div>

                {email.contactInfo && (
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{email.contactInfo.email}</span>
                    </div>
                    {email.contactInfo.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{email.contactInfo.phone}</span>
                      </div>
                    )}
                    {email.contactInfo.company && (
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span>{email.contactInfo.company}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Separator />

              {/* Subject */}
              <div>
                <h3 className="font-semibold mb-2">Subject</h3>
                <p className="text-sm bg-muted p-3 rounded-lg">{email.subject}</p>
              </div>

              {/* Body */}
              <div>
                <h3 className="font-semibold mb-2">Message</h3>
                <div className="text-sm bg-muted p-4 rounded-lg max-h-64 overflow-y-auto">
                  {email.body}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Response Editor */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span>AI Response</span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyResponse}
                    disabled={!response}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRegenerateResponse}
                    disabled={isGenerating}
                  >
                    <RefreshCw className={`w-4 h-4 mr-1 ${isGenerating ? 'animate-spin' : ''}`} />
                    Regenerate
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="AI-generated response will appear here..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
                disabled={isGenerating}
              />

              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  {response.length} characters
                </p>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={onBack}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveResponse}
                    disabled={!response.trim() || isGenerating}
                    className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Response
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Response Tips */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Response Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-accent/50 rounded-lg">
                <h4 className="font-medium mb-1">Tone Matching</h4>
                <p className="text-muted-foreground">
                  AI has analyzed the sentiment and matched an appropriate tone for the response.
                </p>
              </div>
              <div className="p-3 bg-accent/50 rounded-lg">
                <h4 className="font-medium mb-1">Priority Awareness</h4>
                <p className="text-muted-foreground">
                  Response urgency and language adjusted based on the email's priority level.
                </p>
              </div>
              <div className="p-3 bg-accent/50 rounded-lg">
                <h4 className="font-medium mb-1">Context Understanding</h4>
                <p className="text-muted-foreground">
                  AI has processed the email content and customer information for personalized responses.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};