/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';

// 📤 Function to Send Message to Discord
export async function postMessageToDiscord(
  webhookUrl: string,
  content: string
) {
  try {
    await axios.post(webhookUrl, { content });
    console.log('✅ Message sent to Discord');
  } catch (error: any) {
    console.error('❌ Error sending message to Discord:', error.message);
  }
}
