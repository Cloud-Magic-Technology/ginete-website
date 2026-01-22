// Netlify Function for Contact Form
const { Resend } = require('resend');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const data = JSON.parse(event.body);
        const { name, email, phone, organization, service, message } = data;

        if (!name || !email || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
            from: 'Ginete Website <noreply@ginete.co>',
            to: 'hello@ginete.co',
            replyTo: email,
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
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: 'Message sent successfully'
            })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to send message',
                details: error.message
            })
        };
    }
};
