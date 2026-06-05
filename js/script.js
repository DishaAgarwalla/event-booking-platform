// Dark Mode Toggle
function initDarkMode() {
    const toggleBtn = document.getElementById('darkModeToggle');
    if (!toggleBtn) return;
    
    // Check localStorage for saved preference
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
        toast.success(isDarkNow ? 'Dark mode enabled 🌙' : 'Light mode enabled ☀️');
    });
}

// Mobile menu toggle (optional)
console.log("EventHub Platform Loaded Successfully");

// Featured events on homepage
const featuredEvents = [
    {
        id: 1,
        name: "AI & Machine Learning Workshop",
        category: "Tech",
        date: "20 June 2026",
        location: "Bhubaneswar",
        price: 499,
        image: "images/ai-workshop.jpg"
    },
    {
        id: 2,
        name: "Live Music Concert",
        category: "Music",
        date: "5 July 2026",
        location: "Puri",
        price: 999,
        image: "images/concert.jpg"
    },
    {
        id: 4,
        name: "Startup Networking Meetup",
        category: "Business",
        date: "30 June 2026",
        location: "Bhubaneswar",
        price: 299,
        image: "images/startup.jpg"
    }
];

const featuredContainer = document.getElementById("featuredContainer");
if (featuredContainer) {
    featuredEvents.forEach(event => {
        featuredContainer.innerHTML += `
            <div class="event-card">
                <img src="${event.image}" alt="${event.name}" onerror="this.src='https://via.placeholder.com/300x200?text=Event+Image'">
                <h3>${event.name}</h3>
                <p>📅 ${event.date}</p>
                <p>📍 ${event.location}</p>
                <p class="price">₹${event.price}</p>
                <a href="event-details.html?id=${event.id}">
                    <button>View Details</button>
                </a>
            </div>
        `;
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== "#" && href !== "#") {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Initialize dark mode
initDarkMode();

// Show welcome toast
if (window.toast) {
    setTimeout(() => {
        toast.success('Welcome to EventHub! 🎉', 'Hello There!');
    }, 500);
}