// Cloudflare Pages Function for Contact Form
export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const data = await request.json();
        const { name, email, phone, organization, service, message } = data;

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'Ginete Website <noreply@ginete.co>',
                to: 'hello@ginete.co',
                reply_to: email,
                subject: `New Contact Form Submission from ${name}`,
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
                    message
                ].join('\n')
            })
        });

        if (!res.ok) {
            const err = await res.text();
            throw new Error(err);
        }

        return new Response(JSON.stringify({
            success: true,
            message: 'Message sent successfully'
        }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        return new Response(JSON.stringify({
            error: 'Failed to send message',
            details: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
