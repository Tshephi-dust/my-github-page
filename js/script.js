// PASSWORD
const galleryApp = document.getElementById('galleryApp');
const passwordModal = document.getElementById('passwordModal');
const correctPassword = "bee123";

function checkPassword() {
  const input = document.getElementById('passwordInput').value;
  if(input === correctPassword) {
    passwordModal.style.display = "none";
    galleryApp.style.display = "block";
  } else { alert("Wrong password! Try again."); }
}

// DARK MODE
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const btn = document.querySelector('.theme-toggle');
  btn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
}

// PHOTOS DATA
let photos = JSON.parse(localStorage.getItem('photos') || '[]');

function renderPhotos() {
  const photosDiv = document.querySelector('.photos');
  photosDiv.innerHTML = '';
  photos.forEach((photo,index)=>{
    const div = document.createElement('div');
    div.classList.add('photo-card');
    div.innerHTML = `
      <img src="${photo.url}" alt="${photo.title}">
      <p>${photo.title}</p>
      <button class="like-btn ${photo.liked ? 'liked' : ''}" onclick="toggleLike(${index})">❤️ ${photo.likes||0}</button>
      <div class="comment-section">
        <ul class="comment-list" id="commentList-${index}"></ul>
        <div class="comment-input">
          <input type="text" placeholder="Add a comment..." id="commentInput-${index}">
          <button onclick="addComment(${index})">Post</button>
        </div>
      </div>
    `;
    photosDiv.appendChild(div);
    renderComments(index);
  });
}

// LIKES
function toggleLike(index){
  if(!photos[index].likes) photos[index].likes = 0;
  photos[index].liked = !photos[index].liked;
  photos[index].likes += photos[index].liked ? 1 : -1;
  localStorage.setItem('photos',JSON.stringify(photos));
  renderPhotos();
}

// COMMENTS
function addComment(photoIndex){
  const input = document.getElementById(`commentInput-${photoIndex}`);
  const text = input.value.trim();
  if(!text) return;
  if(!photos[photoIndex].comments) photos[photoIndex].comments=[];
  photos[photoIndex].comments.push(text);
  localStorage.setItem('photos',JSON.stringify(photos));
  input.value='';
  renderComments(photoIndex);
  showConfetti();
}

function renderComments(photoIndex){
  const ul = document.getElementById(`commentList-${photoIndex}`);
  ul.innerHTML='';
  const comments = photos[photoIndex].comments||[];
  comments.forEach(c=>{
    const li = document.createElement('li');
    li.textContent=c;
    ul.appendChild(li);
  });
}

// MODAL FOR ADD PHOTO
const modal = document.getElementById('photoModal');
document.getElementById('addPhotoBtn').onclick = () => modal.style.display='flex';
function closeModal(){ modal.style.display='none'; }

function savePhoto(){
  const title = document.getElementById('photoTitle').value.trim();
  const url = document.getElementById('photoURL').value.trim();
  if(!title||!url) return alert("Fill both fields!");
  photos.push({title,url,likes:0,liked:false,comments:[]});
  localStorage.setItem('photos',JSON.stringify(photos));
  document.getElementById('photoTitle').value='';
  document.getElementById('photoURL').value='';
  closeModal();
  renderPhotos();
}

// CONFETTI
function showConf
