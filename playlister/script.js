
// Sélectionner les éléments nécessaires
const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const reminderDate = document.getElementById('reminderDate');
const reminderTime = document.getElementById('reminderTime');
const taskList = document.getElementById('taskList');
const notification = document.getElementById('notification');

// Fonction pour ajouter une tâche
function addTask() {
    const taskName = taskInput.value;
    const taskDate = reminderDate.value;
    const taskTime = reminderTime.value;

    // Si la tâche et la date sont présentes
    if (taskName !== "" && taskDate !== "") {
        // Créer un nouvel élément de tâche
        const newTask = document.createElement('li');
        newTask.innerHTML = `
            <span class="task-name">${taskName}</span>
            <span class="task-date">${taskDate} ${taskTime}</span>
            <button class="delete-btn">✖</button>
        `;
        
        // Ajouter la nouvelle tâche à la liste
        taskList.appendChild(newTask);
        
        // Afficher la notification
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);

        // Réinitialiser les champs
        taskInput.value = '';
        reminderDate.value = '';
        reminderTime.value = '';
        
        // Ajouter l'événement de suppression à la croix
        const deleteBtn = newTask.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            newTask.remove();
        });
    }
}

// Ajouter une tâche lorsqu'on clique sur le bouton "+"
addTaskBtn.addEventListener('click', addTask);

// Ajouter une tâche lorsqu'on appuie sur la touche "Entrée"
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Fonction pour vérifier si la date et l'heure sont valides
function isDateValid(taskDate, taskTime) {
    // Convertir la date et l'heure en format Date
    const taskDateTime = new Date(taskDate + 'T' + taskTime);

    // Obtenir la date et l'heure actuelles
    const currentDateTime = new Date();

    // Vérifier si la tâche est dans le futur
    return taskDateTime > currentDateTime;
}

// Fonction pour ajouter une tâche
function addTask() {
    const taskName = taskInput.value;
    const taskDate = reminderDate.value;
    const taskTime = reminderTime.value;

    // Vérifier si la date et l'heure sont valides
    if (taskName !== "" && taskDate !== "" && taskTime !== "") {
        if (isDateValid(taskDate, taskTime)) {
            // Créer un nouvel élément de tâche
            const newTask = document.createElement('li');
            newTask.innerHTML = `
                <span class="task-name">${taskName}</span>
                <span class="task-date">${taskDate} ${taskTime}</span>
                <button class="delete-btn">✖</button>
                <button class="add-to-calendar-btn">Ajouter à Google Calendar</button>
            `;
            taskList.appendChild(newTask);

            // Ajouter le bouton "Ajouter à Google Calendar"
            const addToCalendarBtn = newTask.querySelector('.add-to-calendar-btn');
            addToCalendarBtn.addEventListener('click', () => {
                addToGoogleCalendar(taskName, taskDate, taskTime);
            });

            // Ajouter la fonctionnalité de suppression
            const deleteBtn = newTask.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                newTask.remove();
            });

            // Réinitialiser les champs
            taskInput.value = '';
            reminderDate.value = '';
            reminderTime.value = '';
        } else {
            // Afficher un message d'erreur si la date est dans le passé
            alert("Erreur : La date et l'heure de la tâche doivent être correcte et futur !");
        }
    } else {
        // Afficher un message d'erreur si les champs sont vides
        alert("Erreur : Veuillez remplir tous les champs !");
    }
}

// Fonction pour ajouter un événement à Google Calendar
function addToGoogleCalendar(taskName, taskDate, taskTime) {
    const startDate = taskDate.replace(/-/g, "") + "T" + taskTime.replace(/:/g, "") + "00Z";
    const endDate = taskDate.replace(/-/g, "") + "T" + (parseInt(taskTime.split(":")[0]) + 1).toString().padStart(2, '0') + taskTime.slice(2) + "00Z"; // L'événement dure 1h par défaut
    const description = encodeURIComponent("Tâche: " + taskName);
    const location = encodeURIComponent("Lieu à ajouter");
    
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(taskName)}&dates=${startDate}/${endDate}&details=${description}&location=${location}&sf=true&output=xml`;

    window.open(googleCalendarUrl, '_blank');
}

// Sélectionner le bouton de changement de mode et le body
const modeToggleBtn = document.getElementById('modeToggleBtn');
const body = document.body;

// Fonction pour basculer entre le mode clair et sombre
function toggleMode() {
    body.classList.toggle('dark-mode');

    // Modifier le texte du bouton en fonction du mode
    if (body.classList.contains('dark-mode')) {
        modeToggleBtn.textContent = '☀️'; // Soleil pour le mode clair
    } else {
        modeToggleBtn.textContent = '🌙'; // Lune pour le mode sombre
    }
}

// Ajouter un événement au bouton pour basculer entre les modes
modeToggleBtn.addEventListener('click', toggleMode);
