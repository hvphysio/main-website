// Blog post data
// const blogData = {
//   id: 24,
//   title: "10 essential benefits of regular physiotherapy",
//   paragraph1:
//     '<p><span style="background-color: rgb(255, 255, 255); color: rgba(21, 60, 51, 0.7);">Health Vision Physiotherapy encompasses a range of specialized therapies and treatments aimed at restoring physical function, alleviating pain, and promoting overall wellness. It combines elements of physiotherapy, chiropractic care, and rehabilitative exercises to address musculoskeletal issues, injuries, and chronic conditions.</span></p><p><span style="background-color: rgb(255, 255, 255); color: rgba(21, 60, 51, 0.7);">Central to Health Vision Physiotherapy is the hands-on approach of physiotherapists and chiropractors who assess, diagnose, and treat patients using manual techniques such as joint mobilization, soft tissue manipulation, and corrective exercises. These professionals tailor treatment plans to individual needs, considering factors like age, medical history, and specific goals for recovery.</span></p><p><br></p>',
//   paragraph2:
//     '<p><span style="background-color: rgb(255, 255, 255); color: rgba(21, 60, 51, 0.7);">Health Vision Physiotherapy often includes modalities like ultrasound, electrical stimulation, and heat therapy to complement manual techniques and enhance healing. It focuses not only on symptom relief but also on correcting underlying issues to prevent recurrence and improve long-term function.</span></p><p><br></p><h3>We understand injuries and pain happen unexpectedly</h3><p><br></p><p><span style="background-color: rgb(255, 255, 255); color: rgba(21, 60, 51, 0.7);">Education and guidance are integral components of Health Vision Physiotherapy, empowering patients with knowledge about their conditions and teaching them self-management techniques to maintain progress between sessions.</span></p><ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><span style="background-color: rgb(255, 255, 255); color: var(--primary-color);">Health Vision Physiotherapy offers customized rehabilitation programs tailored.</span></li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><span style="background-color: rgb(255, 255, 255); color: var(--primary-color);">Highly trained and certified physiotherapists provide expert care.</span></li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><span style="background-color: rgb(255, 255, 255); color: var(--primary-color);">Physiotherapy techniques effectively manage and reduce pain without relying.</span></li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><span style="background-color: rgb(255, 255, 255); color: var(--primary-color);">Specialized programs are available to aid in quicker and safer recovery.</span></li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span><span style="background-color: rgb(255, 255, 255); color: var(--primary-color);">argeted therapy for athletes to recover from sports injuries.</span></li></ol><p><span style="background-color: rgb(255, 255, 255); color: rgba(21, 60, 51, 0.7);">This combination of benefits makes yoga a Yoga offers a wide array of benefits that encompass versatile and accessible practice, suitable for individuals of all ages and fitness levels, contributing to a healthier, more fulfilled life.In essence, Health Vision Physiotherapy is a holistic approach to health that promotes mobility, reduces pain, and enhances overall quality of life through personalized, evidence-based treatments and comprehensive patient education.</span></p><p><br></p>',
//   quotation:
//     "Health Vision Physiotherapy blends advanced therapies with personalized attention to enhance mobility, alleviate pain, and promote holistic wellness. It integrates manual techniques, modalities like ultrasound and electrical stimulation.",
//   tags: ["Health Vision Physiotherapy", "painmanage", "backpain", "wellness"],
//   cover_image: "https://blogbee.s3.eu-central-003.backblazeb2.com/uploads/1735509565461-post-first.jpg",
//   created_at: "2024-12-29T16:29:27.976Z",
//   cover_image_unique_id: "4_zd62bf2f2f8f2e3a59d3d0516_f115ac1de52466bab_d20241229_m215926_c003_v0312018_t0016_u01735509566714",
//   slug_url: "10-essential-benefits-of-regular-physiotherapy",
//   cover_image_data: "/uploads/4_zd62bf2f2f8f2e3a59d3d0516_f115ac1de52466bab_d20241229_m215926_c003_v0312018_t0016_u01735509566714.jpg"
// };

function getSlugFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("b");
}

const blog_url = getSlugFromUrl();

// Populate the DOM
document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = `https://blogbee.vercel.app/api/blog/postbySlug/${blog_url}`; // Adjust the endpoint as needed
//   const apiUrl = `http://localhost:3000/api/blog/postbySlug/${blog_url}`; // Adjust the endpoint as needed
  fetch(`${apiUrl}`)
    .then((response) => response.json())
    .then((blogData) => {
     console.log("response --- details", blogData);
console.log("paragraph1 exact:", blogData.paragraph1);
console.log("paragraph2 exact:", blogData.paragraph2);
      // Set the title
      document.querySelector(".post-title").textContent = blogData.title;

      // Set the paragraphs
      document.querySelector(".paragraph1").innerHTML = blogData.paragraph1.replace(/<span[^>]*>|<\/span>/g, '');
     document.querySelector(".paragraph2").innerHTML = blogData.paragraph2.replace(/<span[^>]*>|<\/span>/g, '');
      if(blogData.quotation){
        document.querySelector(".blockquote").style = 'display:block;';
        document.querySelector(".blockquote p").textContent = blogData.quotation;

      }
      document.querySelector('#updatedAt').innerHTML = `<i class="fa-regular fa-clock"></i> ${new Date(blogData.created_at).toDateString()}`
      // Set the quotation

      // Set the tags
    //   const tagsContainer = document.querySelector(".post-tags .tag-links");
    //   tagsContainer.innerHTML = `Tags: ${blogData.tags.map((tag) => `<a href="#">${tag}</a>`).join(" ")}`;

      // Set the cover image
      document.querySelector(".post-cover-image").src = `https://blogbee.vercel.app${blogData.cover_image_data}`;
    })
    .catch((error) => console.error("Error fetching blogs:", error));
});
