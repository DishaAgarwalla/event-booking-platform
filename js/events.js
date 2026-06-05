// Complete events database
const events = [
    {
        id: 1,
        name: "AI & Machine Learning Workshop",
        category: "Tech",
        date: "2026-06-20",
        location: "Bhubaneswar",
        price: 499,
        image: "images/ai-workshop.jpg",
        description: "Learn Artificial Intelligence, Machine Learning, Deep Learning and real-world applications from industry experts. Hands-on sessions and certificate included."
    },
    {
        id: 2,
        name: "Web Development Bootcamp",
        category: "Tech",
        date: "2026-06-25",
        location: "Cuttack",
        price: 599,
        image: "images/web-dev.jpg",
        description: "Master HTML, CSS, JavaScript, React and modern web development practices. Build real-world projects and boost your career."
    },
    {
        id: 3,
        name: "Startup Networking Meetup",
        category: "Business",
        date: "2026-06-30",
        location: "Bhubaneswar",
        price: 299,
        image: "images/startup.jpg",
        description: "Connect with entrepreneurs, founders, investors and professionals. Pitch your ideas and find collaborators."
    },
    {
        id: 4,
        name: "Live Music Concert",
        category: "Music",
        date: "2026-07-05",
        location: "Puri",
        price: 999,
        image: "images/concert.jpg",
        description: "Enjoy an unforgettable evening of live music performances by top artists. Food and drinks available."
    },
    {
        id: 5,
        name: "Cricket Championship",
        category: "Sports",
        date: "2026-07-10",
        location: "Bhubaneswar",
        price: 799,
        image: "images/cricket.jpg",
        description: "Witness thrilling cricket action featuring top teams competing for the championship trophy."
    },
    {
        id: 6,
        name: "Food Festival 2026",
        category: "Festival",
        date: "2026-07-15",
        location: "Puri",
        price: 399,
        image: "images/food-festival.jpg",
        description: "Taste delicious cuisines from various regions, enjoy live cooking demonstrations and food competitions."
    }
];

// Function to render events on events.html with skeleton loading
const container = document.getElementById("eventContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");

function showSkeletonLoader() {
    if (!container) return;
    container.innerHTML = `
        <div class="skeleton-card">
            <div class="skeleton-image skeleton"></div>
            <div class="skeleton-title skeleton"></div>
            <div class="skeleton-text skeleton"></div>
            <div class="skeleton-price skeleton"></div>
            <div class="skeleton-button skeleton"></div>
        </div>
        <div class="skeleton-card">
            <div class="skeleton-image skeleton"></div>
            <div class="skeleton-title skeleton"></div>
            <div class="skeleton-text skeleton"></div>
            <div class="skeleton-price skeleton"></div>
            <div class="skeleton-button skeleton"></div>
        </div>
        <div class="skeleton-card">
            <div class="skeleton-image skeleton"></div>
            <div class="skeleton-title skeleton"></div>
            <div class="skeleton-text skeleton"></div>
            <div class="skeleton-price skeleton"></div>
            <div class="skeleton-button skeleton"></div>
        </div>
    `;
}

function renderEvents(filteredEvents) {
    if (!container) return;
    
    if (filteredEvents.length === 0) {
        container.innerHTML = `<div class="no-results">No events found. Try different search criteria!</div>`;
        return;
    }
    
    container.innerHTML = "";
    filteredEvents.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.className = "event-card";
        eventCard.innerHTML = `
            <img src="${event.image}" alt="${event.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Event+Image'">
            <h3>${event.name}</h3>
            <p>📅 ${new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p>📍 ${event.location}</p>
            <p>🏷️ ${event.category}</p>
            <p class="price">₹${event.price}</p>
            <a href="event-details.html?id=${event.id}">
                <button>View Details</button>
            </a>
        `;
        container.appendChild(eventCard);
    });
}

function filterAndSortEvents() {
    let filtered = [...events];
    
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
    if (searchTerm) {
        filtered = filtered.filter(event => 
            event.name.toLowerCase().includes(searchTerm) || 
            event.location.toLowerCase().includes(searchTerm) ||
            event.category.toLowerCase().includes(searchTerm)
        );
    }
    
    const category = categoryFilter ? categoryFilter.value : "all";
    if (category !== "all") {
        filtered = filtered.filter(event => event.category === category);
    }
    
    const sort = sortFilter ? sortFilter.value : "default";
    if (sort === "priceLow") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "priceHigh") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "date") {
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    
    renderEvents(filtered);
}

// Event Details Page
const eventDetails = document.getElementById("eventDetails");
if (eventDetails) {
    // Show skeleton first
    eventDetails.innerHTML = `
        <div class="details-card details-skeleton">
            <div class="skeleton-image skeleton"></div>
            <div class="skeleton-title skeleton"></div>
            <div class="skeleton-text skeleton"></div>
            <div class="skeleton-text skeleton" style="width: 70%"></div>
            <div class="skeleton-price skeleton"></div>
        </div>
    `;
    
    setTimeout(() => {
        const params = new URLSearchParams(window.location.search);
        const eventId = parseInt(params.get("id"));
        const selectedEvent = events.find(event => event.id === eventId);
        
        if (selectedEvent) {
            eventDetails.innerHTML = `
                <div class="details-card">
                    <img src="${selectedEvent.image}" alt="${selectedEvent.name}" onerror="this.src='https://via.placeholder.com/800x400?text=Event+Image'">
                    <h1>${selectedEvent.name}</h1>
                    <p>${selectedEvent.description}</p>
                    <h3>📅 Date: ${new Date(selectedEvent.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</h3>
                    <h3>📍 Venue: ${selectedEvent.location}</h3>
                    <h3>🏷️ Category: ${selectedEvent.category}</h3>
                    <h2>₹${selectedEvent.price}</h2>
                    <div style="display: flex; gap: 15px; flex-wrap: wrap; margin: 20px 30px 40px;">
                        <a href="booking.html?id=${selectedEvent.id}">
                            <button class="btn btn-primary"><i class="fas fa-ticket-alt"></i> Book Now</button>
                        </a>
                        <button class="btn btn-outline" onclick="shareOnWhatsAppEvent()">
                            <i class="fab fa-whatsapp"></i> Share
                        </button>
                        <button class="btn btn-outline" onclick="addToCalendarEvent()">
                            <i class="fas fa-calendar-plus"></i> Add to Calendar
                        </button>
                    </div>
                </div>
            `;
            
            // Store event data for sharing functions
            window.currentEvent = selectedEvent;
        } else {
            eventDetails.innerHTML = `<div class="error">Event not found!</div>`;
        }
    }, 800);
}

// Share functions for event details page
function shareOnWhatsAppEvent() {
    if (window.currentEvent) {
        shareOnWhatsApp(window.currentEvent);
        if (window.toast) toast.success('Opening WhatsApp...', 'Share Event');
    }
}

function addToCalendarEvent() {
    if (window.currentEvent) {
        addToGoogleCalendar(window.currentEvent);
        if (window.toast) toast.success('Opening Google Calendar...', 'Add to Calendar');
    }
}

// Add event listeners for filters with debounce
let filterTimeout;
if (searchInput) {
    searchInput.addEventListener("input", () => {
        clearTimeout(filterTimeout);
        filterTimeout = setTimeout(filterAndSortEvents, 300);
    });
}
if (categoryFilter) categoryFilter.addEventListener("change", filterAndSortEvents);
if (sortFilter) sortFilter.addEventListener("change", filterAndSortEvents);

// Initial render with skeleton then load
if (container) {
    showSkeletonLoader();
    setTimeout(() => {
        filterAndSortEvents();
        if (window.toast) toast.info('Events loaded successfully!', '🎉 Ready to Explore');
    }, 1000);
}

// Dark mode init
function initDarkModeEvents() {
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

initDarkModeEvents();