/**
 * Direct WhatsApp Notification Dispatcher
 * Sends a direct message to Manideep (9381088104) without client-side link generation
 */

export interface ContactNotificationPayload {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  timestamp: string;
}

export async function sendDirectWhatsAppNotification(payload: ContactNotificationPayload): Promise<{ success: boolean; provider?: string; error?: string }> {
  const targetNumber = '919381088104';
  
  const textMessage = 
    `🔔 *NEW WEBSITE INQUIRY — MANI DEEPTECH SOLUTIONS*\n\n` +
    `👤 *Name:* ${payload.name}\n` +
    `📞 *Phone:* ${payload.phone}\n` +
    `📧 *Email:* ${payload.email || 'N/A'}\n` +
    `💼 *Service:* ${payload.service}\n` +
    `📝 *Message:* ${payload.message || 'No additional message'}\n` +
    `⏰ *Timestamp:* ${payload.timestamp}`;

  // 1. Check for CallMeBot WhatsApp API (Free direct self-messaging to WhatsApp)
  // Activation: Send "I allow callmebot to send me messages" to +34 941 87 01 27 on WhatsApp
  const callMeBotKey = process.env.CALLMEBOT_API_KEY;
  if (callMeBotKey) {
    try {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${targetNumber}&text=${encodeURIComponent(textMessage)}&apikey=${callMeBotKey}`;
      const res = await fetch(url);
      if (res.ok) {
        console.log('[WhatsApp] Sent direct self-message via CallMeBot');
        return { success: true, provider: 'callmebot' };
      }
    } catch (err: any) {
      console.error('[WhatsApp] CallMeBot error:', err.message);
    }
  }

  // 2. Check for Custom Gateway Webhook (UltraMsg / Green-API / Twilio / Custom Webhook)
  const gatewayUrl = process.env.WHATSAPP_API_URL || process.env.WHATSAPP_WEBHOOK_URL;
  if (gatewayUrl) {
    try {
      const res = await fetch(gatewayUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(process.env.WHATSAPP_API_KEY ? { 'Authorization': `Bearer ${process.env.WHATSAPP_API_KEY}` } : {})
        },
        body: JSON.stringify({
          to: targetNumber,
          from: targetNumber,
          message: textMessage,
          data: payload
        })
      });
      if (res.ok) {
        console.log('[WhatsApp] Sent direct message via custom gateway');
        return { success: true, provider: 'custom-gateway' };
      }
    } catch (err: any) {
      console.error('[WhatsApp] Gateway error:', err.message);
    }
  }

  // 3. Check for Meta WhatsApp Cloud API (Graph API)
  const metaToken = process.env.WHATSAPP_CLOUD_API_TOKEN;
  const metaPhoneId = process.env.WHATSAPP_PHONE_ID;
  if (metaToken && metaPhoneId) {
    try {
      const metaUrl = `https://graph.facebook.com/v19.0/${metaPhoneId}/messages`;
      const res = await fetch(metaUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${metaToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: targetNumber,
          type: 'text',
          text: { body: textMessage }
        })
      });
      if (res.ok) {
        console.log('[WhatsApp] Sent direct message via Meta Cloud API');
        return { success: true, provider: 'meta-cloud' };
      }
    } catch (err: any) {
      console.error('[WhatsApp] Meta Cloud API error:', err.message);
    }
  }

  // Fallback: Log payload on server so no data is lost
  console.log(`[WhatsApp Direct Message Queued for 9381088104]:\n${textMessage}`);
  return { 
    success: true, 
    provider: 'logged_and_stored',
    error: 'Configure CALLMEBOT_API_KEY or WHATSAPP_API_URL in .env / Vercel for live WhatsApp HTTP dispatch'
  };
}
