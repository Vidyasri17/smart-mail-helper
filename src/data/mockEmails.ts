import { Email, Analytics } from '@/types/email';

export const mockEmails: Email[] = [
  {
    id: '1',
    sender: 'sarah.johnson@company.com',
    subject: 'Urgent Support Request - System Down',
    body: 'Our entire payment system is down and we are losing customers. This is affecting our Black Friday sales. Please help immediately!',
    date: new Date('2024-01-15T09:30:00'),
    priority: 'urgent',
    sentiment: 'negative',
    contactInfo: {
      email: 'sarah.johnson@company.com',
      phone: '+1-555-0123',
      company: 'E-commerce Plus'
    },
    tags: ['payment', 'system-down', 'urgent'],
    aiResponse: 'Hello Sarah,\n\nI understand the urgency of your payment system issue, especially during Black Friday. I\'m immediately escalating this to our emergency response team.\n\nIn the meantime, please:\n1. Check if the issue is isolated to specific payment methods\n2. Verify your API key status in your dashboard\n3. Send us any error codes you\'re seeing\n\nOur senior engineer will contact you within 15 minutes.\n\nBest regards,\nSupport Team'
  },
  {
    id: '2',
    sender: 'mike.davis@startup.io',
    subject: 'Help with API Integration Query',
    body: 'Hi team, I\'m having some trouble integrating your API with our mobile app. The documentation mentions webhook setup but I\'m not sure about the authentication process. Could you provide some guidance?',
    date: new Date('2024-01-15T08:15:00'),
    priority: 'medium',
    sentiment: 'neutral',
    contactInfo: {
      email: 'mike.davis@startup.io',
      company: 'TechStart Solutions'
    },
    tags: ['api', 'integration', 'webhooks'],
    aiResponse: 'Hi Mike,\n\nThank you for reaching out about the API integration. I\'d be happy to help you with the webhook authentication process.\n\nFor webhook setup:\n1. Generate your webhook secret in the developer dashboard\n2. Use HMAC-SHA256 for signature verification\n3. Include the timestamp header to prevent replay attacks\n\nI\'ll send you our detailed integration guide with code examples. Would you like to schedule a quick call to walk through the setup?\n\nBest regards,\nDeveloper Relations Team'
  },
  {
    id: '3',
    sender: 'lisa.chen@enterprise.com',
    subject: 'Feature Request - Bulk Data Export',
    body: 'Hello! We love using your platform and would like to request a feature for bulk data export. Our compliance team needs to export large datasets monthly for auditing purposes. Is this something you could implement?',
    date: new Date('2024-01-15T07:45:00'),
    priority: 'low',
    sentiment: 'positive',
    contactInfo: {
      email: 'lisa.chen@enterprise.com',
      company: 'Enterprise Corp'
    },
    tags: ['feature-request', 'bulk-export', 'compliance'],
    aiResponse: 'Hello Lisa,\n\nThank you for the positive feedback and for using our platform! I\'m excited to hear about your bulk data export needs.\n\nGood news - we\'re actually working on an enterprise-grade export feature that should meet your compliance requirements. It\'s currently in beta testing.\n\nI\'d love to:\n1. Add you to our beta program\n2. Understand your specific export requirements\n3. Schedule a demo of the new features\n\nWould next week work for a brief call to discuss this further?\n\nBest regards,\nProduct Team'
  },
  {
    id: '4',
    sender: 'alex.rodriguez@freelance.com',
    subject: 'Support Query - Account Access Issue',
    body: 'I can\'t access my account since yesterday. I keep getting an error message when trying to log in. This is really frustrating as I have a project deadline coming up.',
    date: new Date('2024-01-15T10:20:00'),
    priority: 'high',
    sentiment: 'negative',
    contactInfo: {
      email: 'alex.rodriguez@freelance.com'
    },
    tags: ['account-access', 'login-error'],
    aiResponse: 'Hi Alex,\n\nI apologize for the login issues you\'re experiencing, especially with your project deadline approaching. Let me help resolve this quickly.\n\nI\'ve checked your account and noticed some unusual activity that triggered our security measures. I\'m going to:\n1. Reset your account access immediately\n2. Send you a secure login link via email\n3. Provide you with additional security recommendations\n\nYou should receive the login link within 5 minutes. If you continue having issues, please reply immediately.\n\nBest regards,\nSecurity & Support Team'
  },
  {
    id: '5',
    sender: 'jennifer.white@startup.com',
    subject: 'Request for Demo and Pricing Information',
    body: 'Hi there! We\'re a growing startup and are interested in your enterprise solution. Could you provide us with a demo and information about your pricing tiers? We\'re particularly interested in the team collaboration features.',
    date: new Date('2024-01-14T16:30:00'),
    priority: 'medium',
    sentiment: 'positive',
    contactInfo: {
      email: 'jennifer.white@startup.com',
      company: 'Innovation Labs'
    },
    tags: ['demo-request', 'pricing', 'enterprise'],
    aiResponse: 'Hi Jennifer,\n\nThank you for your interest in our enterprise solution! I\'m thrilled to hear from a growing startup like Innovation Labs.\n\nI\'d be delighted to:\n1. Schedule a personalized demo focusing on team collaboration features\n2. Provide you with startup-friendly pricing options\n3. Connect you with our customer success team\n\nFor startups, we offer special discounts and flexible payment terms. When would be a good time for a 30-minute demo call this week?\n\nLooking forward to working together!\n\nBest regards,\nSales Team'
  }
];

export const mockAnalytics: Analytics = {
  totalEmails: 5,
  urgentCount: 1,
  nonUrgentCount: 4,
  sentimentBreakdown: {
    positive: 2,
    neutral: 1,
    negative: 2
  },
  last24Hours: 4
};