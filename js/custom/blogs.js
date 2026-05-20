document.addEventListener("DOMContentLoaded", () => {
  const blogContainer = document.getElementById("blog-container");
  const paginationContainer = document.getElementById("pagination-container");
  const apiUrl = "https://blogbee.vercel.app/api/blog/posts";
  const cacheTime = 30 * 60 * 1000; // 30 minutes

  if (!blogContainer || !paginationContainer) return;

  const escapeHtml = (text = "") =>
    String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const renderBlogs = (blogs = []) => {
    if (!blogs.length) {
      blogContainer.innerHTML = `<p>No blogs found.</p>`;
      return;
    }

    blogContainer.innerHTML = blogs
      .map((blog, index) => {
        const title = escapeHtml(blog.title);
        const slug = escapeHtml(blog.slug_url);
        const image = blog.cover_image_data
          ? `https://blogbee.vercel.app${blog.cover_image_data}`
          : "images/logo.png";

        return `
          <div class="col-lg-4 col-md-6">
            <div class="blog-item wow fadeInUp" data-wow-delay="${Math.min(index * 0.1, 0.3)}s">
              <div class="post-featured-image" data-cursor-text="View">
                <figure>
                  <a href="/blog-details?b=${slug}" class="image-anime">
                    <img
                      loading="lazy"
                      decoding="async"
                      src="${image}"
                      alt="${title} - Health Vision Physiotherapy Jayanagar Bangalore">
                  </a>
                </figure>
              </div>
              <div class="post-item-content">
                <div class="post-item-body">
                  <h2><a href="/blog-details?b=${slug}">${title}</a></h2>
                </div>
                <div class="post-item-footer">
                  <a href="/blog-details?b=${slug}" class="readmore-btn">read more</a>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  };

  const renderPagination = (pagination = {}) => {
    const currentPage = pagination.currentPage || 1;
    const totalPages = pagination.totalPages || 1;

    paginationContainer.innerHTML = `
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

    paginationContainer.querySelectorAll("a[data-page]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = parseInt(link.getAttribute("data-page"), 10);
        if (!isNaN(page) && page >= 1 && page <= totalPages && page !== currentPage) {
          fetchBlogs(page);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    });
  };

  const fetchBlogs = async (page = 1) => {
    const cacheKey = `hvp_blogs_page_${page}`;
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
      const saved = JSON.parse(cached);
      if (Date.now() - saved.time < cacheTime) {
        renderBlogs(saved.data.data);
        renderPagination(saved.data.pagination);
        return;
      }
    }

    blogContainer.innerHTML = `
<div class="text-center" style="padding:40px;">
  <div class="spinner-border text-primary"></div>
  <p style="margin-top:15px;">Loading blogs...</p>
</div>
`;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(`${apiUrl}?page=${page}`, {
        signal: controller.signal
      });

      clearTimeout(timeout);

      const res = await response.json();

      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({
          time: Date.now(),
          data: res
        })
      );

      renderBlogs(res.data);
      renderPagination(res.pagination);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      blogContainer.innerHTML = `<p>Blogs are taking longer to load. Please refresh once.</p>`;
    }
  };

  fetchBlogs(1);
});
