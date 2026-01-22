// Netlify Function for Gated Resource Downloads
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
        const { name, email, organization, resource_id } = data;

        if (!name || !email || !resource_id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }

        const resources = {
            'cms-compliance-guide': {
                title: 'CMS Compliance Guide',
                description: 'Complete guide to Medicare Advantage, Part D, and Medicaid managed care'
            },
            'dhcs-medi-cal-guide': {
                title: 'DHCS Medi-Cal Managed Care Manual',
                description: 'California Medi-Cal managed care compliance requirements'
            },
            'dmhc-survey-guide': {
                title: 'DMHC Survey Preparation Guide',
                description: 'Prepare for and respond to DMHC health plan surveys'
            },
            'ncqa-accreditation-roadmap': {
                title: 'NCQA Accreditation Roadmap',
                description: 'Achieve NCQA health plan accreditation'
            },
            'ma-stars-rating-guide': {
                title: 'Medicare Advantage Stars Rating Guide',
                description: 'Improve your MA Stars ratings'
            },
            'risk-assessment-guide': {
                title: 'Health Plan Compliance Risk Assessment',
                description: 'Identify and manage compliance risks'
            }
        };

        const resource = resources[resource_id];

        if (!resource) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Resource not found' })
            };
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        // Send eBook to user
        await resend.emails.send({
            from: 'Ginete Healthcare <noreply@ginete.co>',
            to: email,
            subject: `Your Free eBook: ${resource.title}`,
            text: [
                `Hi ${name},`,
                '',
                `Thank you for downloading "${resource.title}" from Ginete Healthcare Consulting Group!`,
                '',
                resource.description,
                '',
                `Your download link:`,
                `https://ginete.co/resources/${resource_id}.pdf`,
                '',
                'If you have any questions or would like to discuss how we can help your organization,',
                'please don\'t hesitate to reach out to us at hello@ginete.co.',
                '',
                'Best regards,',
                'The Ginete Team'
            ].join('\n')
        });

        // Send notification to admin
        await resend.emails.send({
            from: 'Ginete Website <noreply@ginete.co>',
            to: 'hello@ginete.co',
            subject: `New Resource Download: ${resource.title}`,
            text: [
                'New Resource Download',
                '',
                `Resource: ${resource.title}`,
                `Name: ${name}`,
                `Email: ${email}`,
                `Organization: ${organization || 'Not provided'}`
            ].join('\n')
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: 'Resource sent to your email'
            })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to process request',
                details: error.message
            })
        };
    }
};
