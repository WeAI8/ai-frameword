/**
 * ==========================================================================
 * CHRONOTASK İŞ MANTIĞI VE ZAMAN MOTORU (app.js)
 * ==========================================================================
 */

// Durum (State) Yönetimi
let todos = [];

// DOM Elemanları
const todoForm = document.getElementById('todo-form');
const taskNameInput = document.getElementById('task-name');
const taskDateInput = document.getElementById('task-date');
const taskStartTimeInput = document.getElementById('task-start-time');
const taskEndTimeInput = document.getElementById('task-end-time');
const tasksGrid = document.getElementById('tasks-grid');
const emptyState = document.getElementById('empty-state');

// Sayaç Elemanları
const countOverdueEl = document.getElementById('count-overdue');
const countActiveEl = document.getElementById('count-active');
const countCompletedEl = document.getElementById('count-completed');

/**
 * Sayfa Yüklendiğinde Başlat
 */
document.addEventListener('DOMContentLoaded', () => {
    // Formdaki tarih alanına bugünün tarihini varsayılan olarak ata
    const today = new Date().toISOString().split('T')[0];
    taskDateInput.value = today;

    // Yerel Depolamadan (localStorage) Verileri Yükle
    loadTodos();

    // Zamanlayıcıyı Başlat (Her 30 saniyede bir durum renklerini güncelle)
    setInterval(updateTaskStatuses, 30000);
});

/**
 * Görevleri Yükle ve Render Et
 */
function loadTodos() {
    const storedTodos = localStorage.getItem('chrono_todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    } else {
        todos = [];
    }
    renderTodos();
}

/**
 * Görevleri Yerel Depolamaya Kaydet
 */
function saveTodos() {
    localStorage.setItem('chrono_todos', JSON.stringify(todos));
}

/**
 * Görevlerin Zaman Durumunu Dinamik Olarak Hesapla
 * @param {Object} todo 
 * @returns {String} 'completed' | 'overdue' | 'active'
 */
function calculateTaskStatus(todo) {
    if (todo.completed) {
        return 'completed';
    }

    // Tarih ve saat nesnelerini birleştirerek bitiş zamanı oluştur
    const endDateTime = new Date(`${todo.date}T${todo.endTime}`);
    const now = new Date();

    if (now > endDateTime) {
        return 'overdue';
    } else {
        return 'active';
    }
}

/**
 * Listeyi Ekrana Çiz (Render)
 */
function renderTodos() {
    tasksGrid.innerHTML = '';
    
    if (todos.length === 0) {
        emptyState.style.display = 'flex';
        tasksGrid.style.display = 'none';
        updateCounters(0, 0, 0);
        return;
    }

    emptyState.style.display = 'none';
    tasksGrid.style.display = 'grid';

    let overdueCount = 0;
    let activeCount = 0;
    let completedCount = 0;

    // Görevleri tarihe ve saate göre sıralayarak listele (yakın tarih üstte)
    todos.sort((a, b) => new Date(`${a.date}T${a.startTime}`) - new Date(`${b.date}T${b.startTime}`));

    todos.forEach(todo => {
        const status = calculateTaskStatus(todo);
        
        // Sayaçları güncelle
        if (status === 'completed') completedCount++;
        else if (status === 'overdue') overdueCount++;
        else activeCount++;

        // Durum etiketini belirle
        let statusText = 'Vakti Gelmedi';
        if (status === 'completed') statusText = 'Tamamlandı';
        else if (status === 'overdue') statusText = 'Süresi Geçti';

        // Tarih formatını Türkçeye çevir
        const formattedDate = new Date(todo.date).toLocaleDateString('tr-TR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Kart HTML'ini oluştur
        const card = document.createElement('div');
        card.className = `task-card ${status}`;
        card.id = `task-card-${todo.id}`;
        card.innerHTML = `
            <div>
                <div class="task-title">${escapeHTML(todo.title)}</div>
                <div class="task-meta" style="margin-top: 10px;">
                    <div class="task-meta-item">
                        <span>📅</span>
                        <span>${formattedDate}</span>
                    </div>
                    <div class="task-meta-item">
                        <span>⏰</span>
                        <span>${todo.startTime} - ${todo.endTime}</span>
                    </div>
                    <span class="status-badge" style="margin-top: 5px;">${statusText}</span>
                </div>
            </div>
            <div class="task-actions">
                ${!todo.completed ? `
                    <button class="action-btn btn-complete" onclick="completeTask(${todo.id})">
                        <span>✓</span> Tamamla
                    </button>
                ` : ''}
                <button class="action-btn btn-delete" onclick="deleteTask(${todo.id})">
                    <span>🗑</span> Sil
                </button>
            </div>
        `;
        
        tasksGrid.appendChild(card);
    });

    updateCounters(overdueCount, activeCount, completedCount);
}

/**
 * Sayacı Güncelle
 */
function updateCounters(overdue, active, completed) {
    countOverdueEl.textContent = overdue;
    countActiveEl.textContent = active;
    countCompletedEl.textContent = completed;
}

/**
 * Görev Ekleme Formu Dinleyicisi
 */
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = taskNameInput.value.trim();
    const date = taskDateInput.value;
    const startTime = taskStartTimeInput.value;
    const endTime = taskEndTimeInput.value;

    // Basit Validasyon: Bitiş saati başlangıç saatinden büyük olmalı
    if (startTime >= endTime) {
        alert("HATA: Bitiş saati başlangıç saatinden daha sonra olmalıdır!");
        return;
    }

    const newTodo = {
        id: Date.now(),
        title,
        date,
        startTime,
        endTime,
        completed: false
    };

    todos.push(newTodo);
    saveTodos();
    renderTodos();

    // Formu sıfırla (tarih hariç)
    taskNameInput.value = '';
    taskStartTimeInput.value = '';
    taskEndTimeInput.value = '';
    taskNameInput.focus();
});

/**
 * Görevi Tamamlandı Olarak İşaretle
 */
window.completeTask = function(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: true };
        }
        return todo;
    });
    saveTodos();
    renderTodos();
};

/**
 * Görevi Sil
 */
window.deleteTask = function(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
};

/**
 * Canlı Güncelleme Motoru (Sayfa açıkken renkleri günceller)
 */
function updateTaskStatuses() {
    let statusChanged = false;
    
    todos.forEach(todo => {
        if (!todo.completed) {
            const currentCalculated = calculateTaskStatus(todo);
            // Kartın mevcut DOM sınıfını bul ve karşılaştır
            const cardEl = document.getElementById(`task-card-${todo.id}`);
            if (cardEl && !cardEl.classList.contains(currentCalculated)) {
                statusChanged = true;
            }
        }
    });

    // Eğer bir durum değiştiyse tüm listeyi yeniden çiz
    if (statusChanged) {
        renderTodos();
    }
}

/**
 * XSS Saldırılarını Önlemek İçin HTML Escape Fonksiyonu
 */
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}
