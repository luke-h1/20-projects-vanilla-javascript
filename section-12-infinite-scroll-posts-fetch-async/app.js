const postsContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5; // pagination limit
let page = 1;

// Fetch data from API
async function getPosts() {
  const API_URL = `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`;
  const res = await fetch(API_URL);
  const json = await res.json();
  return json;
}

// Show posts in DOM
async function showPosts() {
  const posts = await getPosts();
  posts.forEach((post) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
    <h2 class="post-title">${post.title}</h2>
    </div>
    <p class="post-body">${post.body}</p>
    `;
    postsContainer.appendChild(postEl);
  });
}
showPosts();

// show loader & fetch more posts
function showLoading() {
  loading.classList.add('show');
  setTimeout(() => {
    setTimeout(() => {
      page++;
      showPosts();
    }, 300);

    loading.classList.remove('show');
  }, 1000);
}

// filter posts by input
function filterPosts(e) {
  /*console.log(e.target.value)*/ // get input val
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');
  console.log(posts);
  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

filter.addEventListener('input', filterPosts);

window.addEventListener('scroll', () => {
  // console.log(document.documentElement.scrollTop)
  console.log(document.documentElement.scrollHeight);
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});
