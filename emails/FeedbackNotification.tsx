import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Link,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface FeedbackEmailProps {
  message: string;
}

export const FeedbackNotification = ({ message }: FeedbackEmailProps) => (
  <Html>
    <Head />
    <Preview>New Feedback Submission - FeedSpark</Preview>
    <Body style={main}>
      <Container style={container}>

        <Section style={content}>
          <Heading style={h1}>New Feedback Received</Heading>
          <Text style={subtitle}>
            A new feedback submission has been received through your FeedSpark
            form.
          </Text>

          <Hr style={divider} />

          <Section style={feedbackSection}>
            <Text style={feedbackText}>{message}</Text>
          </Section>

          <Hr style={divider} />

          <Section style={ctaSection}>
            <Link style={button} href='https://feed-spark.vercel.app/dashboard'>
              View in Dashboard
            </Link>
          </Section>
        </Section>

      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 0',
  maxWidth: '600px',
};


const content = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '40px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '32px',
  margin: '0 0 12px',
  textAlign: 'center' as const,
};

const subtitle = {
  color: '#687087',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 24px',
  textAlign: 'center' as const,
};

const divider = {
  borderTop: '1px solid #e9ecef',
  margin: '24px 0',
};

const feedbackSection = {
  backgroundColor: '#f8fafc',
  borderRadius: '6px',
  padding: '24px',
  margin: '24px 0',
};

const feedbackText = {
  color: '#334155',
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#3b82f6',
  borderRadius: '6px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: '600',
  padding: '12px 24px',
  textDecoration: 'none',
  textAlign: 'center' as const,
};

export default FeedbackNotification;
