// Google Calendar Integration
document.addEventListener('DOMContentLoaded', function () {
    const openCalendarBtn = document.getElementById('open-calendar');
    const calendarContainer = document.getElementById('calendar-widget-container');

    if (openCalendarBtn) {
        openCalendarBtn.addEventListener('click', function () {
            // Replace with actual Google Calendar appointment scheduling link
            // You'll need to set this up in Google Workspace Calendar
            const calendarLink = 'https://calendar.app.google/HxpYxirEwov26huk6';

            // Open in new window
            window.open(calendarLink, '_blank', 'width=800,height=600');

            // Or embed inline (uncomment below to use embedded version)
            /*
            calendarContainer.innerHTML = `
                <iframe 
                    src="${calendarLink}" 
                    style="border: 0; width: 100%; height: 600px;"
                    frameborder="0" 
                    scrolling="no">
                </iframe>
            `;
            */
        });
    }

    // Alternative: Load Google Calendar Appointment Scheduling
    // This function can be used to dynamically load the calendar widget
    function loadGoogleCalendar() {
        // Configuration for Google Calendar API
        const config = {
            // Replace with your Google Calendar ID
            calendarId: 'hello@ginete.co',
            // Replace with your API Key (create one in Google Cloud Console)
            apiKey: 'YOUR_GOOGLE_API_KEY',
            // Your Google Workspace Appointment Schedule ID
            scheduleId: 'YOUR_SCHEDULE_ID'
        };

        // You can customize this further based on your Google Workspace setup
        console.log('Calendar configuration loaded');
    }

    // Uncomment to load calendar on page load
    // loadGoogleCalendar();
});

/*
 * SETUP INSTRUCTIONS FOR GOOGLE CALENDAR INTEGRATION:
 * 
 * 1. Set up Google Workspace Calendar:
 *    - Go to Google Calendar (calendar.google.com)
 *    - Click "Create" > "Appointment schedule"
 *    - Configure your availability and booking settings
 *    - Get the shareable scheduling link
 * 
 * 2. Update the calendar link:
 *    - Replace 'YOUR_SCHEDULE_ID' with your actual schedule ID from Google
 *    - The link format is: https://calendar.google.com/calendar/appointments/schedules/[SCHEDULE_ID]
 * 
 * 3. For embedded calendar (optional):
 *    - Uncomment the iframe code above
 *    - The calendar will be embedded directly in the page
 * 
 * 4. For more advanced integration:
 *    - Set up Google Calendar API in Google Cloud Console
 *    - Create API credentials
 *    - Use the Calendar API to fetch and display available times
 */
