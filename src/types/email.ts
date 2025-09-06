export interface Email {
  id: string;
  sender: string;
  subject: string;
  body: string;
  date: Date;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  sentiment: 'positive' | 'neutral' | 'negative';
  aiResponse?: string;
  contactInfo?: {
    email: string;
    phone?: string;
    company?: string;
  };
  isRead?: boolean;
  tags: string[];
}

export interface Analytics {
  totalEmails: number;
  urgentCount: number;
  nonUrgentCount: number;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  last24Hours: number;
}