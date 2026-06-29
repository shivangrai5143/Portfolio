import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { addDocument } from "@/lib/firestore";

interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}


export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (message.length > 2000) {
      return NextResponse.json({ error: "Message is too long (max 2000 chars)." }, { status: 400 });
    }

    const recipientEmail = process.env.CONTACT_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL;

    // 1. Store message in Firestore
    await addDocument("messages", {
      name,
      email,
      subject: subject || "New Contact Message",
      message,
      read: false,
      createdAt: new Date().toISOString(),
    });

    // 2. Send email notification via Resend
    if (recipientEmail && process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: recipientEmail,
        replyTo: email,
        subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
        html: `
          <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f8fafc; border-radius: 12px;">
            <h2 style="color: #0f172a; margin-bottom: 4px;">New Portfolio Message</h2>
            <p style="color: #64748b; font-size: 14px; margin-bottom: 24px; margin-top: 4px;">Someone reached out via your portfolio contact form.</p>
            
            <div style="background: white; border-radius: 8px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 16px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 80px; vertical-align: top;">Name</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 13px; vertical-align: top;">Email</td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #3b82f6;">${email}</a></td>
                </tr>
                ${subject ? `<tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 13px; vertical-align: top;">Subject</td>
                  <td style="padding: 8px 0; color: #0f172a;">${subject}</td>
                </tr>` : ""}
              </table>
            </div>
            
            <div style="background: white; border-radius: 8px; padding: 20px; border: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px; font-weight: 600;">Message</p>
              <p style="color: #1e293b; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="margin-top: 20px; text-align: center;">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || `Your portfolio message`)}" 
                style="display: inline-block; background: #3b82f6; color: white; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                Reply to ${name}
              </a>
            </div>
            
            <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 20px;">
              Received from your portfolio contact form. Go to <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/messages" style="color: #3b82f6;">Admin Dashboard</a> to view all messages.
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
