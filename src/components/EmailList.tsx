import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Mail, User, Calendar, Tag, MessageSquare } from 'lucide-react';
import { Email } from '@/types/email';

interface EmailListProps {
  emails: Email[];
  onEmailSelect: (email: Email) => void;
  onBack: () => void;
}

export const EmailList = ({ emails, onEmailSelect, onBack }: EmailListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredEmails = emails.filter(email => {
    const matchesSearch = email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.body.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || email.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
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
            <h1 className="text-2xl font-bold">Support Emails</h1>
            <p className="text-muted-foreground">Filtered and analyzed support requests</p>
          </div>
        </div>

        {/* Filters */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                {['all', 'urgent', 'high', 'medium', 'low'].map((priority) => (
                  <Button
                    key={priority}
                    variant={priorityFilter === priority ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPriorityFilter(priority)}
                    className="capitalize"
                  >
                    {priority}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email List */}
        <div className="space-y-4">
          {filteredEmails.map((email) => (
            <Card key={email.id} className="shadow-card hover:shadow-elegant transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{email.sender}</h3>
                      <p className="text-sm text-muted-foreground">{email.contactInfo?.company}</p>
                    </div>
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

                <div className="mb-4">
                  <h4 className="font-medium mb-2">{email.subject}</h4>
                  <p className="text-muted-foreground line-clamp-3">{email.body}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{email.date.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Tag className="w-3 h-3" />
                      <span>{email.tags.join(', ')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Mail className="w-3 h-3" />
                      <span>{email.contactInfo?.email}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => onEmailSelect(email)}
                    className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Generate Response
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEmails.length === 0 && (
          <Card className="shadow-card">
            <CardContent className="py-12 text-center">
              <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No emails found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};