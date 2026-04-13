document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://blogbee.vercel.app/api/blog/posts"; // Adjust the endpoint as needed
  //  const apiUrl = "http://localhost:3000/api/blog/posts"; // Adjust the endpoint as needed
  // Dynamic Content Population
  const fetchBlogs = (page = 1) => {
    fetch(`${apiUrl}?page=${page}&limit=2`)
      .then((response) => response.json())
      .then((res) => {
        renderBlogIndex(res.data);
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  };
  // Lazy load images

  fetchBlogs();

  function renderBlogIndex(blogItems) {
    const lazyLoadImages = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      });
    });

    lazyLoadImages.forEach((img) => imageObserver.observe(img));

    // const blogItems = [
    //   {
    //     title: "10 essential benefits of regular physiotherapy",
    //     image: "images/post-1.jpg",
    //     link: "#"
    //   },
    //   {
    //     title: "How rehabilitation can transform your recovery",
    //     image: "images/post-2.jpg",
    //     link: "#"
    //   },
    //   {
    //     title: "Top exercises for a pain-free lifestyle",
    //     image: "images/post-3.jpg",
    //     link: "#"
    //   }
    // ];

    const blogContainer = document.querySelector(".blog-container");

    if (blogContainer) {
      blogItems.forEach((item) => {
        const link = `/blog-details?b=${item.slug_url}`
        const blogHTML = `
          <div class="col-lg-4 col-md-6">
            <article class="blog-item wow fadeInUp">
              <div class="post-featured-image" data-cursor-text="View">
                <figure>
                  <a href="${link}" class="image-anime">
                    <img loading="lazy" src="https://blogbee.vercel.app${item.cover_image_data}" alt="${item.title}" />
                  </a>
                </figure>
              </div>
              <div class="post-item-content">
                <h2 class="post-item-body">
                  <a href="${link}" class="title">${item.title}</a>
                </h2>
                <div class="post-item-footer">
                  <a href="${link}" class="readmore-btn">Read More</a>
                </div>
              </div>
            </article>
          </div>
        `;
        blogContainer.insertAdjacentHTML("beforeend", blogHTML);
      });
    }
  }
});
