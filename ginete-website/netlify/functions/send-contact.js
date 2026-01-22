// Netlify Function for Contact Form
const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
    
    try {
        const data = JSON.parse(event.body);
        const { name, email, phone, organization, service, message } = data;
        
        // Validate required fields
        if (!name || !email || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }
        
        // Email content
        const emailContent = `
            New Contact Form Submission
            
            Name: ${name}
            Email: ${email}
            Phone: ${phone || 'Not provided'}
            Organization: ${organization || 'Not provided'}
            Service Interest: ${service || 'Not specified'}
            
            Message:
            ${message}
        `;
        
        // For production, configure with actual SMTP settings
        // This is a simplified example - in production, use environment variables
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: process.env.SMTP_PORT || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
        
        // Send email
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: 'hello@ginete.co',
            subject: `New Contact Form Submission from ${name}`,
            text: emailContent,
            replyTo: email
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
