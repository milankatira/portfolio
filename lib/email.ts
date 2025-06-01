import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import FeedbackNotification from '@/emails/FeedbackNotification';
import React from 'react';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail(to: string, message: string) {
  const emailHtml = await render(
    React.createElement(FeedbackNotification, { message: message })
  );

  const mailOptions = {
    from: process.env.SMTP_FROM_EMAIL,
    to,
    subject: 'New Feedback Submission',
    html: emailHtml,
  };

  return transporter.sendMail(mailOptions);
}
