import sgMail from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY not set - email notifications will be disabled");
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "noreply@example.com";

export async function sendLeadNotification(lead: {
  name: string;
  email: string;
  phone?: string | null;
  businessName?: string | null;
  serviceInterest?: string | null;
  message?: string | null;
}) {
  if (!process.env.SENDGRID_API_KEY) {
    console.log("Email notification skipped (no API key):", lead);
    return;
  }

  const msg = {
    to: NOTIFICATION_EMAIL,
    from: NOTIFICATION_EMAIL,
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
  };

  try {
    await sgMail.send(msg);
    console.log("Lead notification sent successfully");
  } catch (error) {
    console.error("Failed to send lead notification:", error);
  }
}

export async function sendNewsletterNotification(subscriber: {
  email: string;
}) {
  if (!process.env.SENDGRID_API_KEY) {
    console.log("Email notification skipped (no API key):", subscriber);
    return;
  }

  const msg = {
    to: NOTIFICATION_EMAIL,
    from: NOTIFICATION_EMAIL,
    subject: `New Newsletter Subscriber from Anchorage Direct Mail`,
    html: `
      <h2>New Newsletter Subscriber</h2>
      <p><strong>Email:</strong> ${subscriber.email}</p>
      <p><em>Subscribed at: ${new Date().toLocaleString()}</em></p>
    `,
  };

  try {
    await sgMail.send(msg);
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
  if (!process.env.SENDGRID_API_KEY) {
    console.log("Email notification skipped (no API key):", request);
    return;
  }

  const msg = {
    to: NOTIFICATION_EMAIL,
    from: NOTIFICATION_EMAIL,
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
  };

  try {
    await sgMail.send(msg);
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
  if (!process.env.SENDGRID_API_KEY) {
    console.log("Email notification skipped (no API key):", booking);
    return;
  }

  const msg = {
    to: NOTIFICATION_EMAIL,
    from: NOTIFICATION_EMAIL,
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
  };

  try {
    await sgMail.send(msg);
    console.log("Consultation notification sent successfully");
  } catch (error) {
    console.error("Failed to send consultation notification:", error);
  }
}
