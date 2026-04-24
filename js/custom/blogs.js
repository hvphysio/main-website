document.addEventListener("DOMContentLoaded", () => {
  const blogContainer = document.getElementById("blog-container");
  const paginationContainer = document.getElementById("pagination-container");
  const apiUrl = "https://blogbee.vercel.app/api/blog/posts"; // Adjust the endpoint as needed
//   const apiUrl = "http://localhost:3000/api/blog/posts"; // Adjust the endpoint as needed
  let currentPage = 1;

  const fetchBlogs = (page = 1) => {
    fetch(`${apiUrl}?page=${page}`)
      .then((response) => response.json())
      .then((res) => {
        renderBlogs(res.data);
        renderPagination({
          currentPage: res?.pagination?.currentPage,
          totalPages: res?.pagination?.totalPages
        });
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  };

  const renderBlogs = (blogs) => {
    blogContainer.innerHTML = blogs
      .map(
        (blog, index) => `
                <div class="col-lg-4 col-md-6">
                    <div class="blog-item wow fadeInUp" data-wow-delay="${index * 0.2}s">
                        <div class="post-featured-image" data-cursor-text="View">
                            <figure>
                                <a href="/blog-details?b=${blog.slug_url}" class="image-anime">
                                  <img loading="lazy" src="https://blogbee.vercel.app${blog.cover_image_data}" alt="${blog.title} - Health Vision Physiotherapy Jayanagar Bangalore">
                                </a>
                            </figure>
                        </div>
                        <div class="post-item-content">
                            <div class="post-item-body">
                                <h2><a href="/blog-details?b=${blog.slug_url}">${blog.title}</a></h2>
                            </div>
                            <div class="post-item-footer">
                                <a href="/blog-details?b=${blog.slug_url}" class="readmore-btn">read more</a>
                            </div>
                        </div>
                    </div>
                </div>
            `
      )
      .join("");
  };

  const renderPagination = (pagination) => {
    const { currentPage, totalPages } = pagination;
    const paginationHTML = `
            <ul class="pagination">
                <li ${currentPage === 1 ? 'class="disabled"' : ""}>
                    <a href="#" data-page="${currentPage - 1}">
                        <i class="fa-solid fa-arrow-left-long"></i>
                    </a>
                </li>
                ${Array.from({ length: totalPages }, (_, i) => {
                  const page = i + 1;
                  return `
                        <li ${page === currentPage ? 'class="active"' : ""}>
                            <a href="#" data-page="${page}">${page}</a>
                        </li>
                    `;
                }).join("")}
                <li ${currentPage === totalPages ? 'class="disabled"' : ""}>
                    <a href="#" data-page="${currentPage + 1}">
                        <i class="fa-solid fa-arrow-right-long"></i>
                    </a>
                </li>
            </ul>
        `;
    paginationContainer.innerHTML = paginationHTML;

    // Add event listeners for pagination links
    paginationContainer.querySelectorAll("a[data-page]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = parseInt(link.getAttribute("data-page"), 10);
        if (!isNaN(page)) {
          fetchBlogs(page);
        }
      });
    });
  };

  // Fetch initial blogs
  fetchBlogs(currentPage);
});
