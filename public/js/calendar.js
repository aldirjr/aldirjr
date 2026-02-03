// public/js/calendar.js

class PetCalendar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentDate = new Date();
        this.availability = {};
        this.init();
    }

    async init() {
        await this.loadAvailability();
        this.render();
    }

    async loadAvailability() {
        try {
            const year = this.currentDate.getFullYear();
            const month = this.currentDate.getMonth() + 1;
            
            const response = await fetch(`/api/petsitting/calendar?month=${month}&year=${year}`);
            const data = await response.json();
            
            // Convert array to object for easy lookup
            data.forEach(item => {
                this.availability[item.date] = item.available;
            });
        } catch (error) {
            console.error('Error loading calendar:', error);
        }
    }

    render() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        
        // Calendar HTML structure
        this.container.innerHTML = `
            <div class="calendar-widget">
                <div class="calendar-header">
                    <button class="calendar-nav" onclick="petCalendar.previousMonth()">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <h3 class="calendar-title">${monthNames[month]} ${year}</h3>
                    <button class="calendar-nav" onclick="petCalendar.nextMonth()">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                <div class="calendar-grid">
                    ${this.renderDayHeaders()}
                    ${this.renderDays()}
                </div>
                <div class="calendar-legend">
                    <div class="legend-item">
                        <div class="legend-box available"></div>
                        <span data-i18n="petsitting.available">Available</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-box booked"></div>
                        <span data-i18n="petsitting.booked">Booked</span>
                    </div>
                    <div class="legend-item">
                        <div class="legend-box today"></div>
                        <span>Today</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderDayHeaders() {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days.map(day => 
            `<div class="calendar-day-header">${day}</div>`
        ).join('');
    }

    renderDays() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Get first day of month (0 = Sunday, 1 = Monday, etc.)
        const firstDay = new Date(year, month, 1).getDay();
        
        // Get number of days in month
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Get today's date for comparison
        const today = new Date();
        const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
        const todayDate = today.getDate();
        
        let html = '';
        
        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            html += '<div class="calendar-day empty"></div>';
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isAvailable = this.availability[dateStr];
            const isToday = isCurrentMonth && day === todayDate;
            
            let classes = ['calendar-day'];
            if (isToday) classes.push('today');
            if (isAvailable === true) classes.push('available');
            if (isAvailable === false) classes.push('booked');
            
            html += `
                <div class="${classes.join(' ')}" data-date="${dateStr}">
                    ${day}
                </div>
            `;
        }
        
        return html;
    }

    previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.init();
    }

    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.init();
    }
}

// Initialize calendar when page loads
let petCalendar;
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('calendar-container')) {
        petCalendar = new PetCalendar('calendar-container');
    }
});

// CSS for calendar (add to main.css or inline)
const calendarStyles = `
<style>
.calendar-widget {
    background: white;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

.calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.calendar-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
}

.calendar-nav {
    background: var(--secondary, #27ae60);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.calendar-nav:hover {
    background: #229954;
    transform: scale(1.1);
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
}

.calendar-day-header {
    text-align: center;
    font-weight: 700;
    padding: 1rem 0.5rem;
    color: var(--primary, #2c3e50);
    font-size: 0.9rem;
}

.calendar-day {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    position: relative;
}

.calendar-day.empty {
    cursor: default;
}

.calendar-day:not(.empty):hover {
    background: var(--light, #ecf0f1);
    transform: scale(1.05);
}

.calendar-day.available {
    background: #e8f5e9;
    color: #27ae60;
    font-weight: 600;
}

.calendar-day.booked {
    background: #ffebee;
    color: #e74c3c;
    cursor: not-allowed;
}

.calendar-day.booked:hover {
    transform: none;
}

.calendar-day.today {
    border: 2px solid var(--secondary, #27ae60);
    font-weight: 700;
}

.calendar-legend {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
    flex-wrap: wrap;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.legend-box {
    width: 20px;
    height: 20px;
    border-radius: 5px;
}

.legend-box.available {
    background: #e8f5e9;
}

.legend-box.booked {
    background: #ffebee;
}

.legend-box.today {
    border: 2px solid #27ae60;
}

@media (max-width: 768px) {
    .calendar-grid {
        gap: 0.2rem;
    }
    
    .calendar-day-header {
        padding: 0.5rem 0.2rem;
        font-size: 0.75rem;
    }
    
    .calendar-day {
        font-size: 0.85rem;
    }
    
    .calendar-legend {
        gap: 1rem;
        font-size: 0.85rem;
    }
}
</style>
`;
