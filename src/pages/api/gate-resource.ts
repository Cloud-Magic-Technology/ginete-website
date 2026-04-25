import type { APIRoute } from 'astro';

const resources: Record<string, { title: string; description: string }> = {
    'cms-compliance-guide': {
        title: 'CMS Compliance Guide',
        description: 'Complete guide to Medicare Advantage, Part D, and Medicaid managed care',
    },
    'dhcs-medi-cal-guide': {
        title: 'DHCS Medi-Cal Managed Care Manual',
        description: 'California Medi-Cal managed care compliance requirements',
    },
    'dmhc-survey-guide': {
        title: 'DMHC Survey Preparation Guide',
        description: 'Prepare for and respond to DMHC health plan surveys',
    },
    'ncqa-accreditation-roadmap': {
        title: 'NCQA Accreditation Roadmap',
        description: 'Achieve NCQA health plan accreditation',
    },
    'ma-stars-rating-guide': {
        title: 'Medicare Advantage Stars Rating Guide',
        description: 'Improve your MA Stars ratings',
    },
    'risk-assessment-guide': {
        title: 'Health Plan Compliance Risk Assessment',
        description: 'Identify and manage compliance risks',
    },
};

export const POST: APIRoute = async ({ request, locals }) => {
    try {
        const data = await request.json();
        const { name, email, organization, resource_id } = data;

        if (!name || !email || !resource_id) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const resource = resources[resource_id];

        if (!resource) {
            return new Response(JSON.stringify({ error: 'Resource not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const { env } = (locals as any).runtime;

        const userHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fa;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:linear-gradient(135deg,#0066cc 0%,#00a896 100%);padding:40px;">
            <p style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">Ginete Healthcare Consulting</p>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:15px;">Your free resource is ready</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <p style="margin:0;font-size:16px;color:#1a1a1a;line-height:1.6;">Hi ${name},</p>
            <p style="margin:16px 0;font-size:16px;color:#4a4a4a;line-height:1.6;">Thank you for downloading <strong>${resource.title}</strong> from Ginete Healthcare Consulting Group. We hope it provides valuable guidance for your compliance journey.</p>

            <div style="background:#f0f7ff;border:1px solid #cce0ff;border-radius:8px;padding:24px;margin:24px 0;">
              <p style="margin:0 0 6px;font-size:12px;color:#0066cc;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;">Your Download</p>
              <p style="margin:0 0 4px;font-size:18px;color:#1a1a1a;font-weight:700;">${resource.title}</p>
              <p style="margin:0 0 20px;font-size:14px;color:#4a4a4a;">${resource.description}</p>
              <a href="https://ginete.co/resources/${resource_id}.pdf" style="display:inline-block;background:#0066cc;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:6px;font-size:15px;font-weight:600;">Download PDF &rarr;</a>
            </div>

            <p style="margin:24px 0 0;font-size:15px;color:#4a4a4a;line-height:1.6;">If you have questions or want to discuss how Ginete can support your organization's compliance program, we'd love to connect.</p>
            <p style="margin:12px 0 0;font-size:15px;color:#4a4a4a;">
              &rarr; <a href="mailto:hello@ginete.co" style="color:#0066cc;text-decoration:none;">hello@ginete.co</a><br>
              &rarr; <a href="https://ginete.co/contact" style="color:#0066cc;text-decoration:none;">Schedule a consultation</a>
            </p>

            <p style="margin:32px 0 0;font-size:15px;color:#1a1a1a;">Best regards,<br><strong>The Ginete Team</strong></p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px;background:#f8f9fa;border-top:1px solid #e9ecef;">
            <p style="margin:0;font-size:12px;color:#6a6a6a;">Ginete Healthcare Consulting Group &bull; <a href="https://ginete.co" style="color:#0066cc;text-decoration:none;">ginete.co</a> &bull; <a href="mailto:hello@ginete.co" style="color:#0066cc;text-decoration:none;">hello@ginete.co</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

        const adminHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8f9fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fa;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:#00a896;padding:28px 40px;">
            <p style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">New Resource Download</p>
            <p style="margin:4px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">${resource.title}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e9ecef;">
                  <p style="margin:0;font-size:12px;color:#6a6a6a;text-transform:uppercase;letter-spacing:0.5px;">Resource</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#1a1a1a;font-weight:600;">${resource.title}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e9ecef;">
                  <p style="margin:0;font-size:12px;color:#6a6a6a;text-transform:uppercase;letter-spacing:0.5px;">Name</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#1a1a1a;">${name}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e9ecef;">
                  <p style="margin:0;font-size:12px;color:#6a6a6a;text-transform:uppercase;letter-spacing:0.5px;">Email</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#0066cc;">${email}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;">
                  <p style="margin:0;font-size:12px;color:#6a6a6a;text-transform:uppercase;letter-spacing:0.5px;">Organization</p>
                  <p style="margin:4px 0 0;font-size:15px;color:#1a1a1a;">${organization || 'Not provided'}</p>
                </td>
              </tr>
            </table>
            <div style="margin-top:24px;">
              <a href="mailto:${email}" style="display:inline-block;background:#0066cc;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:6px;font-size:14px;font-weight:600;">Follow Up with ${name}</a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 40px;background:#f8f9fa;border-top:1px solid #e9ecef;">
            <p style="margin:0;font-size:12px;color:#6a6a6a;">Ginete Website &bull; <a href="https://ginete.co" style="color:#0066cc;text-decoration:none;">ginete.co</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

        // Send eBook to user
        await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Ginete Healthcare <noreply@ginete.co>',
                to: email,
                subject: `Your Free eBook: ${resource.title}`,
                html: userHtml,
                text: [
                    `Hi ${name},`,
                    '',
                    `Thank you for downloading "${resource.title}" from Ginete Healthcare Consulting Group!`,
                    '',
                    resource.description,
                    '',
                    'Your download link:',
                    `https://ginete.co/resources/${resource_id}.pdf`,
                    '',
                    'If you have any questions or would like to discuss how we can help your organization,',
                    "please don't hesitate to reach out to us at hello@ginete.co.",
                    '',
                    'Best regards,',
                    'The Ginete Team',
                ].join('\n'),
            }),
        });

        // Send notification to admin
        await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Ginete Website <noreply@ginete.co>',
                to: 'hello@ginete.co',
                subject: `New Resource Download: ${resource.title}`,
                html: adminHtml,
                text: [
                    'New Resource Download',
                    '',
                    `Resource: ${resource.title}`,
                    `Name: ${name}`,
                    `Email: ${email}`,
                    `Organization: ${organization || 'Not provided'}`,
                ].join('\n'),
            }),
        });

        return new Response(
            JSON.stringify({ success: true, message: 'Resource sent to your email' }),
            { headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error: any) {
        return new Response(
            JSON.stringify({ error: 'Failed to process request', details: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
};
