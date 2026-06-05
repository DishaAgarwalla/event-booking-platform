
// Google Calendar Export Function
function addToGoogleCalendar(eventData) {
    // Format date for Google Calendar (YYYYMMDDTHHMMSSZ)
    const formatDateForCalendar = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}${month}${day}T100000Z`;
    };
    
    const startDate = formatDateForCalendar(eventData.date);
    const endDate = formatDateForCalendar(new Date(new Date(eventData.date).getTime() + 3 * 60 * 60 * 1000));
    
    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: eventData.name,
        dates: `${startDate}/${endDate}`,
        details: `${eventData.description}\n\n📍 Venue: ${eventData.location}\n💰 Price: ₹${eventData.price}\n\nBooked via EventHub`,
        location: eventData.location,
        sf: 'true',
        output: 'csp'
    });
    
    const url = `https://calendar.google.com/calendar/render?${params.toString()}`;
    window.open(url, '_blank');
}

// Download .ics file for Apple/Outlook Calendar
function downloadICSFile(eventData) {
    const formatDateForICS = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    const startDate = formatDateForICS(eventData.date);
    const endDate = formatDateForICS(new Date(new Date(eventData.date).getTime() + 3 * 60 * 60 * 1000));
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//EventHub//Event Calendar//EN
BEGIN:VEVENT
UID:${eventData.id}@eventhub.com
DTSTAMP:${startDate}
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${eventData.name}
DESCRIPTION:${eventData.description}\\n📍 Venue: ${eventData.location}\\n💰 Price: ₹${eventData.price}
LOCATION:${eventData.location}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;
    
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${eventData.name.replace(/\s/g, '_')}_event.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

// WhatsApp Share Function
function shareOnWhatsApp(eventData) {
    const message = `🎟️ Check out this event: ${eventData.name}!\n\n📅 Date: ${new Date(eventData.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}\n📍 Location: ${eventData.location}\n💰 Price: ₹${eventData.price}\n\nBook now at EventHub! 🚀`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}