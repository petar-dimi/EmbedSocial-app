
import { Post } from './post-element.mjs';

export class PostGrid extends HTMLElement {
  constructor() {
    super();
    this.itemsToLoad = parseInt(this.getAttribute('itemsToLoad')) || 4;
    this.loadedItems = 0;
    this.data = [];
    this.filteredData = [];
    this.cardBackgroundColor = '#ffffff';
    this.cardSpaceBetween = '10px';
    this.theme = 'lightTheme';
    this.filterBySource = 'all';

    
    const container = document.createElement('div');
    container.classList.add('post-grid');
    this.appendChild(container);

    
    const loadMoreButton = document.createElement('button');
    loadMoreButton.classList.add('load-more');
    loadMoreButton.textContent = 'Load More';
    loadMoreButton.addEventListener('click', () => {
      this.loadMore();
    });
    this.appendChild(loadMoreButton);

   
    fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.data = data;
        this.filterData();
        this.render();
      })
      .catch(error => console.error('Error fetching post data:', error));
  }

  loadMore() {
    this.loadedItems += this.itemsToLoad;
    this.filterData();
    this.render();
  }

  filterData() {
    this.filteredData = this.data.filter(item => {
      if (this.filterBySource !== 'all' && item.source_type !== this.filterBySource) {
        return false;
      }
      return true;
    });
  }

  render() {
    const container = this.querySelector('.post-grid');
    container.innerHTML = '';

    const itemsToRender = this.filteredData.slice(0, this.loadedItems + this.itemsToLoad);

    itemsToRender.forEach(item => {
      const post = new Post(item);
      post.style.backgroundColor = this.cardBackgroundColor;
      post.style.marginBottom = this.cardSpaceBetween;
      post.classList.add(this.theme);

      
      const heartButton = post.querySelector('.fa-heart');
      heartButton.classList.replace('fa-heart', 'fa-heartbeat');
      heartButton.style.color = 'white';
      heartButton.style.cursor = 'pointer';
      heartButton.addEventListener('click', () => {
        const likeCount = post.querySelector('.react-detail');
        const currentLikes = parseInt(likeCount.textContent);
        if (heartButton.classList.contains('far')) {
          heartButton.classList.replace('far', 'fas');
          heartButton.classList.replace('fa-heartbeat', 'fa-heart');
          heartButton.style.color = 'red';
          likeCount.textContent = `${currentLikes + 1} likes`;
        } else {
          heartButton.classList.replace('fas', 'far');
          heartButton.style.color = 'white';
          likeCount.textContent = `${currentLikes - 1} likes`;
        }
      });

      container.appendChild(post);
    });

    const loadMoreButton = this.querySelector('.load-more');
    if (this.loadedItems + this.itemsToLoad >= this.filteredData.length) {
      loadMoreButton.style.display = 'none';
    } else {
      loadMoreButton.style.display = 'block';
    }
  }
}


customElements.define('post-grid', PostGrid);