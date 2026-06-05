// Get event data from URL
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("id");

// Load event data for summary
const eventsData = [
    { id: 1, name: "AI & Machine Learning Workshop", price: 499 },
    { id: 2, name: "Web Development Bootcamp", price: 599 },
    { id: 3, name: "Startup Networking Meetup", price: 299 },
    { id: 4, name: "Live Music Concert", price: 999 },
    { id: 5, name: "Cricket Championship", price: 799 },
    { id: 6, name: "Food Festival 2026", price: 399 }
];

const selectedEvent = eventsData.find(e => e.id == eventId);
const eventSummary = document.getElementById("eventSummary");
if (eventSummary && selectedEvent) {
    eventSummary.innerHTML = `
        <strong>🎟️ Booking for:</strong> ${selectedEvent.name}<br>
        <strong>💰 Base Price:</strong> ₹${selectedEvent.price}
    `;
}

const ticketType = document.getElementById("ticketType");
const quantity = document.getElementById("quantity");
const totalPrice = document.getElementById("totalPrice");
const ticketPriceDisplay = document.getElementById("ticketPriceDisplay");
const quantityDisplay = document.getElementById("quantityDisplay");
const bookingForm = document.getElementById("bookingForm");

if (ticketType && quantity && totalPrice && bookingForm) {
    
    function calculateTotal() {
        const ticketPrice = Number(ticketType.value);
        const qty = Number(quantity.value);
        const subtotal = ticketPrice * qty;
        
        totalPrice.textContent = `₹${subtotal}`;
        if (ticketPriceDisplay) ticketPriceDisplay.textContent = `₹${ticketPrice}`;
        if (quantityDisplay) quantityDisplay.textContent = qty;
    }
    
    ticketType.addEventListener("change", calculateTotal);
    quantity.addEventListener("input", calculateTotal);
    calculateTotal();
    
    bookingForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        
        if (!name || !email || !phone) {
            if (window.toast) {
                toast.error('Please fill in all fields', 'Missing Information');
            } else {
                alert("Please fill in all fields");
            }
            return;
        }
        
        if (!email.includes("@")) {
            if (window.toast) {
                toast.error('Please enter a valid email address', 'Invalid Email');
            } else {
                alert("Please enter a valid email address");
            }
            return;
        }
        
        if (phone.length < 10) {
            if (window.toast) {
                toast.error('Please enter a valid 10-digit phone number', 'Invalid Phone');
            } else {
                alert("Please enter a valid phone number");
            }
            return;
        }
        
        const bookingData = {
            eventId: eventId,
            eventName: selectedEvent ? selectedEvent.name : "Event",
            name: name,
            email: email,
            phone: phone,
            ticketType: ticketType.options[ticketType.selectedIndex].text,
            ticketPrice: Number(ticketType.value),
            quantity: Number(quantity.value),
            total: Number(ticketType.value) * Number(quantity.value)
        };
        
        localStorage.setItem("bookingData", JSON.stringify(bookingData));
        
        if (window.toast) {
            toast.success('Redirecting to secure checkout...', 'Booking Details Saved');
        }
        
        setTimeout(() => {
            window.location.href = "checkout.html";
        }, 500);
    });
}

// Dark mode init for booking page
function initDarkModeBooking() {
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

initDarkModeBooking();