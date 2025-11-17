import { Resend } from 'resend';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return {apiKey: connectionSettings.settings.api_key, fromEmail: connectionSettings.settings.from_email};
}

async function getResendClient() {
  const credentials = await getCredentials();
  return {
    client: new Resend(credentials.apiKey),
    fromEmail: credentials.fromEmail
  };
}

export async function sendLeadNotification(lead: {
  name: string;
  email: string;
  phone?: string | null;
  businessName?: string | null;
  serviceInterest?: string | null;
  message?: string | null;
}) {
  try {
    const { client, fromEmail } = await getResendClient();
    
    await client.emails.send({
      from: fromEmail,
      to: fromEmail, // Send to the configured email
      subject: `New Lead: ${lead.name} from Anchorage Direct Mail`,
      html: `
        <h2>New Lead Submission</h2>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        ${lead.phone ? `<p><strong>Phone:</strong> ${lead.phone}</p>` : ""}
        ${lead.businessName ? `<p><strong>Business:</strong> ${lead.businessName}</p>` : ""}
        ${lead.serviceInterest ? `<p><strong>Service Interest:</strong> ${lead.serviceInterest}</p>` : ""}
        ${lead.message ? `<p><strong>Message:</strong><br>${lead.message.replace(/\n/g, "<br>")}</p>` : ""}
        <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
      `,
    });
    
    console.log("Lead notification sent successfully");
  } catch (error) {
    console.error("Failed to send lead notification:", error);
  }
}

export async function sendNewsletterNotification(subscriber: {
  email: string;
}) {
  try {
    const { client, fromEmail } = await getResendClient();
    
    await client.emails.send({
      from: fromEmail,
      to: fromEmail,
      subject: `New Newsletter Subscriber from Anchorage Direct Mail`,
      html: `
        <h2>New Newsletter Subscriber</h2>
        <p><strong>Email:</strong> ${subscriber.email}</p>
        <p><em>Subscribed at: ${new Date().toLocaleString()}</em></p>
      `,
    });
    
    console.log("Newsletter notification sent successfully");
  } catch (error) {
    console.error("Failed to send newsletter notification:", error);
  }
}

export async function sendQuoteRequestNotification(request: {
  name: string;
  email: string;
  phone?: string | null;
  businessName?: string | null;
  materialType?: string | null;
  quantity?: string | null;
  timeline?: string | null;
  message?: string | null;
}) {
  try {
    const { client, fromEmail } = await getResendClient();
    
    await client.emails.send({
      from: fromEmail,
      to: fromEmail,
      subject: `New Quote Request: ${request.name} from Anchorage Direct Mail`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${request.name}</p>
        <p><strong>Email:</strong> ${request.email}</p>
        ${request.phone ? `<p><strong>Phone:</strong> ${request.phone}</p>` : ""}
        ${request.businessName ? `<p><strong>Business:</strong> ${request.businessName}</p>` : ""}
        ${request.materialType ? `<p><strong>Material Type:</strong> ${request.materialType}</p>` : ""}
        ${request.quantity ? `<p><strong>Quantity:</strong> ${request.quantity}</p>` : ""}
        ${request.timeline ? `<p><strong>Timeline:</strong> ${request.timeline}</p>` : ""}
        ${request.message ? `<p><strong>Message:</strong><br>${request.message.replace(/\n/g, "<br>")}</p>` : ""}
        <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
      `,
    });
    
    console.log("Quote request notification sent successfully");
  } catch (error) {
    console.error("Failed to send quote request notification:", error);
  }
}

export async function sendConsultationNotification(booking: {
  name: string;
  email: string;
  phone?: string | null;
  serviceType?: string | null;
  preferredTime?: string | null;
  message?: string | null;
}) {
  try {
    const { client, fromEmail } = await getResendClient();
    
    await client.emails.send({
      from: fromEmail,
      to: fromEmail,
      subject: `New Consultation Booking: ${booking.name} from Anchorage Direct Mail`,
      html: `
        <h2>New Consultation Booking</h2>
        <p><strong>Name:</strong> ${booking.name}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        ${booking.phone ? `<p><strong>Phone:</strong> ${booking.phone}</p>` : ""}
        ${booking.serviceType ? `<p><strong>Service Type:</strong> ${booking.serviceType}</p>` : ""}
        ${booking.preferredTime ? `<p><strong>Preferred Time:</strong> ${booking.preferredTime}</p>` : ""}
        ${booking.message ? `<p><strong>Message:</strong><br>${booking.message.replace(/\n/g, "<br>")}</p>` : ""}
        <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
      `,
    });
    
    console.log("Consultation notification sent successfully");
  } catch (error) {
    console.error("Failed to send consultation notification:", error);
  }
}

export async function sendEmailMarketingWaitlistNotification(entry: {
  email: string;
  name?: string | null;
  businessName?: string | null;
  serviceType?: string | null;
}) {
  try {
    const { client, fromEmail } = await getResendClient();
    
    await client.emails.send({
      from: fromEmail,
      to: fromEmail,
      subject: `New Email Marketing Waitlist Signup from Rute Reach AK`,
      html: `
        <h2>New Email Marketing Waitlist Signup</h2>
        <p><strong>Email:</strong> ${entry.email}</p>
        ${entry.name ? `<p><strong>Name:</strong> ${entry.name}</p>` : ""}
        ${entry.businessName ? `<p><strong>Business:</strong> ${entry.businessName}</p>` : ""}
        ${entry.serviceType ? `<p><strong>Service Type:</strong> ${entry.serviceType}</p>` : ""}
        <p><em>Joined at: ${new Date().toLocaleString()}</em></p>
      `,
    });
    
    console.log("Email marketing waitlist notification sent successfully");
  } catch (error) {
    console.error("Failed to send email marketing waitlist notification:", error);
  }
}

export async function sendPrintMaterialsWaitlistNotification(entry: {
  email: string;
  name?: string | null;
  businessName?: string | null;
  materialTypes?: string | null;
  otherMaterialType?: string | null;
  industry?: string | null;
  quantity?: string | null;
  typicalNeed?: string | null;
}) {
  try {
    const { client, fromEmail } = await getResendClient();
    
    await client.emails.send({
      from: fromEmail,
      to: fromEmail,
      subject: `New Print Materials Waitlist Signup from Rute Reach AK`,
      html: `
        <h2>New Print Materials Waitlist Signup</h2>
        <p><strong>Email:</strong> ${entry.email}</p>
        ${entry.name ? `<p><strong>Name:</strong> ${entry.name}</p>` : ""}
        ${entry.businessName ? `<p><strong>Business:</strong> ${entry.businessName}</p>` : ""}
        ${entry.materialTypes ? `<p><strong>Material Types:</strong> ${entry.materialTypes}</p>` : ""}
        ${entry.otherMaterialType ? `<p><strong>Other Material Type:</strong> ${entry.otherMaterialType}</p>` : ""}
        ${entry.industry ? `<p><strong>Industry:</strong> ${entry.industry}</p>` : ""}
        ${entry.quantity ? `<p><strong>Quantity:</strong> ${entry.quantity}</p>` : ""}
        ${entry.typicalNeed ? `<p><strong>Typical Need:</strong> ${entry.typicalNeed}</p>` : ""}
        <p><em>Joined at: ${new Date().toLocaleString()}</em></p>
      `,
    });
    
    console.log("Print materials waitlist notification sent successfully");
  } catch (error) {
    console.error("Failed to send print materials waitlist notification:", error);
  }
}
