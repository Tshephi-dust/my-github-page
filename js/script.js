// Dark mode toggle
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const btn = document.querySelector('.theme-toggle');
  btn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

// Notes functionality
function addNote() {
  const input = document.getElementById('noteInput');
  const text = input.value.trim();
  if (!text) return;
  const notes = JSON.parse(localStorage.getItem('loveNotes') || '[]');
  notes.push(text);
  localStorage.setItem('loveNotes', JSON.stringify(notes));
  input.value = '';
  renderNotes();
}

function renderNotes() {
  const notes = JSON.parse(localStorage.getItem('loveNotes') || '[]');
  const ul = document.getElementById('notesList');
  ul.innerHTML = '';
  notes.forEach(note => {
    const li = document.createElement('li');
    li.textContent = note;
    ul.appendChild(li);
  });
}

// Memories functionality
let memories = JSON.parse(localStorage.getItem('memories') || '[]');

function renderMemories() {
  const photosDiv = document.querySelector('.photos');
  photosDiv.innerHTML = '';
  memories.forEach((mem, index) => {
    const div = document.createElement('div');
    div.classList.add('photo-card');
    if(mem.liked) div.classList.add('liked');
    div.innerHTML = `
      <img src="${mem.image}" alt="${mem.title}">
      <p>${mem.title}</p>
      <span class="heart">❤️</span>
    `;
    div.addEventListener('click', () => toggleLike(index));
    photosDiv.appendChild(div);
  });
}

function toggleLike(index) {
  memories[index].liked = !memories[index].liked;
  localStorage.setItem('memories', JSON.stringify(memories));
  renderMemories();
}

// Modal
const modal = document.getElementById('memoryModal');
document.getElementById('addMemoryBtn').onclick = () => modal.style.display = 'flex';
function closeModal() { modal.style.display = 'none'; }

function saveMemory() {
  const title = document.getElementById('memoryTitle').value.trim();
  const image = document.getElementById('memoryImage').value.trim();
  if (!title || !image) return alert("Please fill all fields!");
  const desc = document.getElementById('memoryDesc').value.trim();
  memories.push({title,image,desc,liked:false});
  localStorage.setItem('memories', JSON.stringify(memories));
  document.getElementById('memoryTitle').value = '';
  document.getElementById('memoryImage').value = '';
  document.getElementById('memoryDesc').value = '';
  closeModal();
  renderMemories();
}

// Initialize
renderNotes();
renderMemories();
