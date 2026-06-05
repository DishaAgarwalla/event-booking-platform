const checkoutDetails = document.getElementById("checkoutDetails");
const confirmBtn = document.getElementById("confirmBtn");
const confirmationDetails = document.getElementById("confirmationDetails");
const downloadBtn = document.getElementById("downloadTicket");
const addToCalendarBtn = document.getElementById("addToCalendarBtn");
const shareWhatsAppBtn = document.getElementById("shareWhatsAppBtn");

// Checkout Page - Display booking details
if (checkoutDetails) {
    const bookingData = JSON.parse(localStorage.getItem("bookingData"));
    
    if (bookingData) {
        const tax = Math.round(bookingData.total * 0.10);
        const grandTotal = bookingData.total + tax;
        const convenienceFee = 49;
        const finalTotal = grandTotal + convenienceFee;
        
        checkoutDetails.innerHTML = `
            <div class="booking-info">
                <h3><i class="fas fa-user"></i> Personal Details</h3>
                <p><strong>Name:</strong> ${bookingData.name}</p>
                <p><strong>Email:</strong> ${bookingData.email}</p>
                <p><strong>Phone:</strong> ${bookingData.phone}</p>
            </div>
            <div class="booking-info">
                <h3><i class="fas fa-ticket"></i> Ticket Details</h3>
                <p><strong>Event:</strong> ${bookingData.eventName || "Event"}</p>
                <p><strong>Ticket Type:</strong> ${bookingData.ticketType}</p>
                <p><strong>Quantity:</strong> ${bookingData.quantity}</p>
            </div>
            <div class="price-breakdown-checkout">
                <h3>Price Breakdown</h3>
                <div class="price-row"><span>Subtotal:</span><span>₹${bookingData.total}</span></div>
                <div class="price-row"><span>Tax (10% GST):</span><span>₹${tax}</span></div>
                <div class="price-row"><span>Convenience Fee:</span><span>₹${convenienceFee}</span></div>
                <div class="price-row total"><span>Total to Pay:</span><span>₹${finalTotal}</span></div>
            </div>
        `;
    } else {
        checkoutDetails.innerHTML = `<p>No booking data found. <a href="events.html">Browse Events</a></p>`;
    }
}

// Confirm Booking
if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
        const bookingId = "EVT" + Math.floor(100000 + Math.random() * 900000);
        localStorage.setItem("bookingId", bookingId);
        
        if (window.toast) {
            toast.success('Payment successful! Redirecting...', 'Booking Confirmed');
        }
        
        setTimeout(() => {
            window.location.href = "confirmation.html";
        }, 500);
    });
}

// Confirmation Page
if (confirmationDetails) {
    const bookingData = JSON.parse(localStorage.getItem("bookingData"));
    const bookingId = localStorage.getItem("bookingId");
    
    // Trigger confetti on page load
    if (typeof triggerMultipleConfetti === 'function') {
        setTimeout(() => {
            triggerMultipleConfetti(4);
            if (window.toast) {
                toast.success('Your tickets have been booked successfully!', '🎉 Congratulations!');
            }
        }, 300);
    }
    
    if (bookingData && bookingId) {
        confirmationDetails.innerHTML = `
            <div class="confirmation-info">
                <p><strong>🎫 Booking ID:</strong> ${bookingId}</p>
                <p><strong>👤 Name:</strong> ${bookingData.name}</p>
                <p><strong>📧 Email:</strong> ${bookingData.email}</p>
                <p><strong>🎟️ Ticket:</strong> ${bookingData.ticketType}</p>
                <p><strong>🔢 Quantity:</strong> ${bookingData.quantity}</p>
                <p><strong>💰 Amount Paid:</strong> ₹${bookingData.total}</p>
                <p><strong>✅ Status:</strong> <span style="color: #10b981;">Confirmed</span></p>
            </div>
        `;
        
        // Store event data for calendar/share
        window.confirmedEvent = {
            id: bookingId,
            name: bookingData.eventName,
            date: new Date().toISOString().split('T')[0],
            location: "Event Venue",
            description: `Ticket Type: ${bookingData.ticketType}\nQuantity: ${bookingData.quantity}`,
            price: bookingData.total
        };
    }
}

// Add to Calendar button on confirmation page
if (addToCalendarBtn && window.confirmedEvent) {
    addToCalendarBtn.addEventListener("click", () => {
        addToGoogleCalendar(window.confirmedEvent);
        if (window.toast) toast.success('Opening Google Calendar...', 'Add to Calendar');
    });
}

// Share on WhatsApp button on confirmation page
if (shareWhatsAppBtn && window.confirmedEvent) {
    shareWhatsAppBtn.addEventListener("click", () => {
        shareOnWhatsApp(window.confirmedEvent);
        if (window.toast) toast.success('Opening WhatsApp...', 'Share Event');
    });
}

// Download Ticket
if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
        const bookingData = JSON.parse(localStorage.getItem("bookingData"));
        const bookingId = localStorage.getItem("bookingId");
        
        const ticketContent = `
========================================
            EVENTHUB E-TICKET
========================================

Booking ID: ${bookingId}
Booking Date: ${new Date().toLocaleString()}

----------------------------------------
ATTENDEE DETAILS
----------------------------------------
Name: ${bookingData.name}
Email: ${bookingData.email}
Phone: ${bookingData.phone}

----------------------------------------
EVENT DETAILS
----------------------------------------
Event: ${bookingData.eventName || "Event"}
Ticket Type: ${bookingData.ticketType}
Quantity: ${bookingData.quantity}
Total Amount: ₹${bookingData.total}

----------------------------------------
Status: CONFIRMED ✅
----------------------------------------

Thank you for booking with EventHub!
Present this ticket at the venue entrance.

For support: support@eventhub.com
========================================
        `;
        
        const blob = new Blob([ticketContent], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `EventHub_Ticket_${bookingId}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        
        if (window.toast) {
            toast.success('Ticket downloaded successfully!', 'Download Complete');
        }
    });
}

// Dark mode init for checkout pages
function initDarkModeCheckout() {
    const toggleBtn = document.getElementById('darkModeToggle');
    if (!toggleBtn) return;
    
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkNow = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkNow);
        toggleBtn.innerHTML = isDarkNow ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

initDarkModeCheckout();