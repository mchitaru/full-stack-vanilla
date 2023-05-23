
fetch('/posts')
.then((res) => {
  return res.json()
})
.then((posts) => {
  previews.innerHTML = posts.map(Post).join("");
})

const Post = (post) => {
  return `
  <div class="preview">
    <div>
      <h2>${post.title}</h2>
      <p>
        ${post.description}
      </p>
      <a href="./post.html?id=${post._id}">Read More...</a>
    </div>
    <img class="preview-image" src="${post.image}" />
  </div>
`;
};