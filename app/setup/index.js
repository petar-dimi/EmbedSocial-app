
const colorInput = document.getElementById("color-input");
colorInput.addEventListener("input", function () {
  const newColor = colorInput.value;
  const postElements = document.querySelectorAll(".post");
  postElements.forEach(function (postElement) {
    postElement.style.backgroundColor = newColor;
  });
});



var checkbox = document.getElementById("dark-mode-checkbox");
checkbox.addEventListener("change", function () {
  var posts = document.querySelectorAll(".post");
  if (checkbox.checked) {
    for (var i = 0; i < posts.length; i++) {
      posts[i].style.backgroundColor = "black";
      posts[i].style.color = "white";
    }
  } else {
    for (var i = 0; i < posts.length; i++) {
      posts[i].style.backgroundColor = "";
      posts[i].style.color = "";
    }
  }
});

// Get the dropdown element and listen for changes
const dropdown = document.querySelector('#column-select');
dropdown.addEventListener('change', handleDropdownChange);

// Initialize the number of columns based on screen size
let screenWidth = window.innerWidth;
let numColumns = screenWidth >= 768 ? 2 : 1;

// Calculate the width of each column
const postElement = document.querySelector('.post-element');
const columnWidth = `${100 / numColumns}%`;

// Set the initial width of each post
const posts = document.querySelectorAll('.post');
posts.forEach(post => {
  post.style.width = columnWidth;
});

// Apply CSS styles to container
postElement.style.display = 'flex';
postElement.style.flexWrap = 'wrap';

// Handle dropdown change event
function handleDropdownChange() {
  numColumns = parseInt(dropdown.value);

  // Recalculate column width
  const columnWidth = `${100 / numColumns}%`;

  // Update post width
  posts.forEach(post => {
    post.style.width = columnWidth;
  });
}

