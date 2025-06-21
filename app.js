class Reminder {
    constructor(text, priority) {
        this.text = text;
        this.priority = priority;
        this.id = Date.now();
    }
}

class ReminderManager {
    constructor() {
        this.reminders = [];
        this.loadReminders();
    }

    addReminder(text, priority) {
        if (!text.trim()) return;
        
        const reminder = new Reminder(text, priority);
        this.reminders.push(reminder);
        this.saveReminders();
        this.renderReminders();
    }

    deleteReminder(id) {
        this.reminders = this.reminders.filter(reminder => reminder.id !== id);
        this.saveReminders();
        this.renderReminders();
    }

    filterReminders(priority) {
        if (priority === 'all') {
            return this.reminders;
        }
        return this.reminders.filter(reminder => reminder.priority === priority);
    }

    saveReminders() {
        localStorage.setItem('reminders', JSON.stringify(this.reminders));
    }

    loadReminders() {
        const savedReminders = localStorage.getItem('reminders');
        if (savedReminders) {
            this.reminders = JSON.parse(savedReminders);
        }
    }

    renderReminders() {
        const remindersList = document.getElementById('remindersList');
        const priorityFilter = document.getElementById('priorityFilter').value;
        
        const filteredReminders = this.filterReminders(priorityFilter);
        
        remindersList.innerHTML = filteredReminders.map(reminder => `
            <div class="reminder-item ${'priority-' + reminder.priority}">
                <span class="reminder-text">${reminder.text}</span>
                <button class="delete-btn" onclick="reminderManager.deleteReminder(${reminder.id})">Eliminar</button>
            </div>
        `).join('');
    }
}

// Initialize the reminder manager
const reminderManager = new ReminderManager();

// Event listeners
document.getElementById('addReminderBtn').addEventListener('click', () => {
    const reminderInput = document.getElementById('reminderInput');
    const prioritySelect = document.getElementById('prioritySelect');
    
    reminderManager.addReminder(reminderInput.value, prioritySelect.value);
    reminderInput.value = '';
});

document.getElementById('priorityFilter').addEventListener('change', () => {
    reminderManager.renderReminders();
});