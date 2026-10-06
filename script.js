// State array
let notes = [];

// DOM Elements
const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');
const clearAllBtn = document.querySelector('#clear-all-btn');

// Load stored notes on launch
function loadNotes() {
  const saved = localStorage.getItem('quicknotes_data');
  if (saved) {
    try {
      notes = JSON.parse(saved);
    } catch (e) {
      notes = [];
    }
  }
}

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem('quicknotes_data', JSON.stringify(notes));
}

// Render count text
function updateCountText(filteredCount) {
  const count = filteredCount !== undefined ? filteredCount : notes.length;
  if (notes.length === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (count === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = `You have ${count} notes.`;
  }
}

// Render Function (safe text rendering using createElement & textContent)
function render() {
  notesList.innerHTML = ''; // Clear list container safely
  const query = searchInput.value.trim().toLowerCase();

  const filteredNotes = notes.filter(note =>
    note.text.toLowerCase().includes(query)
  );

  updateCountText(filteredNotes.length);

  if (filteredNotes.length === 0 && notes.length > 0) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'no-notes';
    emptyItem.textContent = 'No notes match your search.';
    notesList.appendChild(emptyItem);
    return;
  }

  filteredNotes.forEach(note => {
    const li = document.createElement('li');
    li.className = `note-card category-${note.category.toLowerCase()}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'note-content';

    const textP = document.createElement('p');
    textP.className = 'note-text';
    textP.textContent = note.text;

    const metaDiv = document.createElement('div');
    metaDiv.className = 'note-meta';

    const categorySpan = document.createElement('span');
    categorySpan.className = 'category-badge';
    categorySpan.textContent = note.category;

    const dateSpan = document.createElement('span');
    dateSpan.textContent = note.createdAt;

    metaDiv.appendChild(categorySpan);
    metaDiv.appendChild(dateSpan);

    contentDiv.appendChild(textP);
    contentDiv.appendChild(metaDiv);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteNote(note.id));

    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);

    notesList.appendChild(li);
  });
}

// Add Note Handler
function addNote(e) {
  e.preventDefault();
  const text = noteInput.value.trim();

  // Validation
  if (text === '') {
    errorMessage.textContent = 'Please type a note first.';
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = 'Notes must be 200 characters or fewer.';
    return;
  }

  errorMessage.textContent = '';

  const newNote = {
    id: Date.now(),
    text: text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString()
  };

  notes.unshift(newNote); // Add to beginning of array
  saveNotes();
  render();

  noteInput.value = '';
}

// Delete Note Handler
function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveNotes();
  render();
}

// Clear All Handler (Bonus)
if (clearAllBtn) {
  clearAllBtn.addEventListener('click', () => {
    if (notes.length === 0) return;
    if (confirm('Delete all notes?')) {
      notes = [];
      saveNotes();
      render();
    }
  });
}

// Event Listeners
noteForm.addEventListener('submit', addNote);
searchInput.addEventListener('input', render);

// Initialize
loadNotes();
render();