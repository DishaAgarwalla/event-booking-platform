// Toast Notification System
class Toast {
    constructor() {
        this.container = null;
        this.init();
    }
    
    init() {
        // Create container if it doesn't exist
        if (!document.querySelector('.toast-container')) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        } else {
            this.container = document.querySelector('.toast-container');
        }
    }
    
    show(message, type = 'info', title = '') {
        const titles = {
            success: '✅ Success',
            error: '❌ Error',
            info: 'ℹ️ Info',
            warning: '⚠️ Warning'
        };
        
        const displayTitle = title || titles[type] || titles.info;
        const iconMap = {
            success: 'fas fa-check-circle',
            error: 'fas fa-times-circle',
            info: 'fas fa-info-circle',
            warning: 'fas fa-exclamation-triangle'
        };
        const icon = iconMap[type] || iconMap.info;
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${displayTitle}</div>
                <div class="toast-message">${message}</div>
            </div>
            <div class="toast-progress"></div>
        `;
        
        this.container.appendChild(toast);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }, 3000);
    }
    
    success(message, title = '') {
        this.show(message, 'success', title);
    }
    
    error(message, title = '') {
        this.show(message, 'error', title);
    }
    
    info(message, title = '') {
        this.show(message, 'info', title);
    }
    
    warning(message, title = '') {
        this.show(message, 'warning', title);
    }
}

// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create global toast instance
window.toast = new Toast();