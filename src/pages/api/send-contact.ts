import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
    try {
        const data = await request.json();
        const { name, email, phone, organization, service, message } = data;

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { env } = (locals as any).runtime;

        const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fa;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:#0066cc;padding:32px 40px;">
            <p style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">Ginete Healthcare Consulting</p>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">New Contact Form Submission</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e9ecef;">
                  <p style="margin:0;font-size:12px;color:#6a6a6a;text-transform:uppercase;letter-spacing:0.5px;">Name</p>
                  <p style="margin:4px 0 0;font-size:16px;color:#1a1a1a;font-weight:600;">${name}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e9ecef;">
                  <p style="margin:0;font-size:12px;color:#6a6a6a;text-transform:uppercase;letter-spacing:0.5px;">Email</p>
                  <p style="margin:4px 0 0;font-size:16px;color:#0066cc;">${email}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e9ecef;">
                  <p style="margin:0;font-size:12px;color:#6a6a6a;text-transform:uppercase;letter-spacing:0.5px;">Phone</p>
                  <p style="margin:4px 0 0;font-size:16px;color:#1a1a1a;">${phone || 'Not provided'}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e9ecef;">
                  <p style="margin:0;font-size:12px;color:#6a6a6a;text-transform:uppercase;letter-spacing:0.5px;">Organization</p>
                  <p style="margin:4px 0 0;font-size:16px;color:#1a1a1a;">${organization || 'Not provided'}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e9ecef;">
                  <p style="margin:0;font-size:12px;color:#6a6a6a;text-transform:uppercase;letter-spacing:0.5px;">Service Interest</p>
                  <p style="margin:4px 0 0;font-size:16px;color:#1a1a1a;">${service || 'Not specified'}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 0 0;">
                  <p style="margin:0;font-size:12px;color:#6a6a6a;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
                  <p style="margin:8px 0 0;font-size:15px;color:#1a1a1a;line-height:1.6;background:#f8f9fa;padding:16px;border-radius:6px;border-left:3px solid #0066cc;">${message.replace(/\n/g, '<br>')}</p>
                </td>
              </tr>
            </table>
            <div style="margin-top:32px;">
              <a href="mailto:${email}" style="display:inline-block;background:#0066cc;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:6px;font-size:14px;font-weight:600;">Reply to ${name}</a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px;background:#f8f9fa;border-top:1px solid #e9ecef;">
            <p style="margin:0;font-size:12px;color:#6a6a6a;">Ginete Healthcare Consulting Group &bull; <a href="https://ginete.co" style="color:#0066cc;text-decoration:none;">ginete.co</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Ginete Website <noreply@ginete.co>',
                to: 'hello@ginete.co',
                reply_to: email,
                subject: `New Contact Form Submission from ${name}`,
                html,
                text: [
                    'New Contact Form Submission',
                    '',
                    `Name: ${name}`,
                    `Email: ${email}`,
                    `Phone: ${phone || 'Not provided'}`,
                    `Organization: ${organization || 'Not provided'}`,
                    `Service Interest: ${service || 'Not specified'}`,
                    '',
                    'Message:',
                    message,
                ].join('\n'),
            }),
        });

        if (!res.ok) {
            const err = await res.text();
            throw new Error(err);
        }

        return new Response(
            JSON.stringify({ success: true, message: 'Message sent successfully' }),
            { headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error: any) {
        return new Response(
            JSON.stringify({ error: 'Failed to send message', details: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
