export class Post extends HTMLElement {
  constructor(post) {
    super();
    const postHTML = `
<div class="post">
  <div class="head">
    <div class="profile-detail">
      <div class="p-img">
        <img src="${post.profile_image}" alt="">
      </div>
      <div class="row">
        <div class="name">${post.name}</div>
        <div class="date">${post.date}</div>
      </div>
    </div>
    <div class="more">
      <i class="fas fa-ellipsis-h"></i>
    </div>
  </div>
  <div class="post-img">
    <img src="${post.image}" alt="">
    <i id="heart-icon" class="far fa-heart"></i>
  </div>
  <div class="reactions head">
    <div class="react-links">
      <button id="heart-button">
        <i id="heart" class="far fa-heart"></i>
      </button>
      <i class="far fa-comment"></i>
      <i class="far fa-paper-plane"></i>
    </div>
    <div class="save">
      <i class="far fa-bookmark"></i>
    </div>
  </div>
  <div class="react-detail"><span id="like-count">${post.likes}</span> likes</div>
  <div class="caption">
    <div class="profile-name">${post.name}</div>
    <div class="post-cap">${post.caption}</div>
  </div>
</div>
`;
    this.innerHTML = postHTML;

   
    const heartButton = this.querySelector('#heart-button');
    const heartIcon = this.querySelector('#heart-icon');
    const likeCount = this.querySelector('#like-count');


    let likes = post.likes || 0;
    likeCount.textContent = likes;

    
    heartButton.addEventListener('click', () => {
      if (heartIcon.classList.contains('far')) {
        
        likes--;
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas', 'animate-like');
        likeCount.textContent = likes;
      } else {
        
        likes++;
        heartIcon.classList.remove('fas', 'animate-like');
        heartIcon.classList.add('far');
        likeCount.textContent = likes;
      }
    });
  }
}


customElements.define('post-element', Post);
