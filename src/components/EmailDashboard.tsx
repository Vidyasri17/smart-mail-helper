import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Mail, Clock, TrendingUp, AlertTriangle, MessageSquare, User, Calendar, Tag } from 'lucide-react';
import { mockEmails, mockAnalytics } from '@/data/mockEmails';
import { Email } from '@/types/email';
import { EmailList } from './EmailList';
import { ResponseEditor } from './ResponseEditor';

const SENTIMENT_COLORS = {
  positive: 'hsl(var(--positive))',
  neutral: 'hsl(var(--neutral))',
  negative: 'hsl(var(--negative))'
};

const EmailDashboard = () => {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [view, setView] = useState<'dashboard' | 'emails' | 'editor'>('dashboard');

  const sentimentData = [
    { name: 'Positive', value: mockAnalytics.sentimentBreakdown.positive, color: SENTIMENT_COLORS.positive },
    { name: 'Neutral', value: mockAnalytics.sentimentBreakdown.neutral, color: SENTIMENT_COLORS.neutral },
    { name: 'Negative', value: mockAnalytics.sentimentBreakdown.negative, color: SENTIMENT_COLORS.negative }
  ];

  const priorityData = [
    { name: 'Urgent', value: mockAnalytics.urgentCount },
    { name: 'Non-Urgent', value: mockAnalytics.nonUrgentCount }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'urgent';
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'muted';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'sentiment-positive';
      case 'neutral': return 'sentiment-neutral';
      case 'negative': return 'sentiment-negative';
      default: return 'muted';
    }
  };

  if (view === 'emails') {
    return (
      <EmailList 
        emails={mockEmails} 
        onEmailSelect={(email) => {
          setSelectedEmail(email);
          setView('editor');
        }}
        onBack={() => setView('dashboard')}
      />
    );
  }

  if (view === 'editor' && selectedEmail) {
    return (
      <ResponseEditor 
        email={selectedEmail}
        onBack={() => setView('emails')}
        onSave={(response) => {
          // In a real app, this would save the response
          console.log('Saving response:', response);
          setView('emails');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              AI Email Assistant
            </h1>
            <p className="text-muted-foreground mt-1">
              Intelligent support email management with AI-powered responses
            </p>
          </div>
          <Button 
            onClick={() => setView('emails')}
            className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
          >
            <Mail className="w-4 h-4 mr-2" />
            View Emails
          </Button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-card hover:shadow-elegant transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Emails</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{mockAnalytics.totalEmails}</div>
              <p className="text-xs text-muted-foreground">Support emails filtered</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Urgent Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-urgent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-urgent">{mockAnalytics.urgentCount}</div>
              <p className="text-xs text-muted-foreground">Require immediate attention</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last 24 Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-info">{mockAnalytics.last24Hours}</div>
              <p className="text-xs text-muted-foreground">New support requests</p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">98%</div>
              <p className="text-xs text-muted-foreground">AI response generation</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Priority Distribution</CardTitle>
              <CardDescription>Urgent vs non-urgent email breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priorityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Sentiment Analysis</CardTitle>
              <CardDescription>Customer sentiment distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Emails Preview */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recent Support Emails</CardTitle>
            <CardDescription>Latest filtered support requests with AI analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockEmails.slice(0, 3).map((email) => (
                <div key={email.id} className="flex items-start space-x-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <p className="text-sm font-medium">{email.sender}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="outline" 
                          className={`border-${getPriorityColor(email.priority)} text-${getPriorityColor(email.priority)}`}
                        >
                          {email.priority}
                        </Badge>
                        <Badge 
                          variant="secondary"
                          className={`bg-${getSentimentColor(email.sentiment)}/10 text-${getSentimentColor(email.sentiment)}`}
                        >
                          {email.sentiment}
                        </Badge>
                      </div>
                    </div>
                    <h3 className="font-medium mb-1">{email.subject}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{email.body}</p>
                    <div className="flex items-center mt-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 mr-1" />
                      {email.date.toLocaleDateString()}
                      <Separator orientation="vertical" className="mx-2 h-3" />
                      <Tag className="w-3 h-3 mr-1" />
                      {email.tags.join(', ')}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedEmail(email);
                      setView('editor');
                    }}
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Reply
                  </Button>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <Button 
              variant="ghost" 
              onClick={() => setView('emails')}
              className="w-full"
            >
              View All Emails
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailDashboard;