function truncateTextByChar(text, charLimit) {
  if (text.length <= charLimit) {
    return { text: text, isTruncated: false };
  }
  const truncatedText = text.slice(0, charLimit) + "...";
  return { text: truncatedText, isTruncated: true };
}
function transformReviewData(inputJson, charLimit = 200) {
  // Truncate content to the specified word limit
  const truncatedContent = truncateTextByChar(inputJson.snippet, charLimit);

  return {
    id: inputJson.review_id,
    rating: inputJson.rating,
    content: truncatedContent.text,
    image: inputJson.images && inputJson.images[0], // Assuming the first image is the one to be used
    name: inputJson.user.name,
    thumbnail: inputJson.user.thumbnail,
    date: inputJson.date, // Format the date
    reviewLink: inputJson.link,
    fullContent: inputJson.snippet, // Full content for "Read More"
    isTruncated: truncatedContent.isTruncated // Whether the text is truncated
  };
}
try {
  fetch("https://api.hvphysiotherapy.com/reviews")
    .then((response) => response.json())
    .then((res) => {
      console.log("res---- reviees", res);

      //  .then(response => response.json())
      //  .then(res => {
      const reviews = res?.data;

      const formattedReviews = reviews?.map((review) => transformReviewData(review));
      console.log("reviews -----", formattedReviews);
      const testimonialContainer = document.getElementById("testimonial-container");
      formattedReviews.forEach((testimonial) => {
        const testimonialDiv = document.createElement("div");
        testimonialDiv.classList.add("swiper-slide");

        testimonialDiv.innerHTML = `
  <div class="testimonial-item">
    <div class="testimonial-header">
      <div class="testimonial-rating">
        ${[...Array(testimonial.rating)].map(() => '<i class="fa-solid fa-star"></i>').join("")}
      </div>
      <div class="testimonial-content">
        <p>${testimonial.content}</p>
         <a href="${testimonial.reviewLink}" target="_blank" style="${testimonial?.isTruncated ? `word-break:anywhere;color:#619e90` : `word-break:anywhere;display:none;color:#619e90;`}">Read More..</a>
      </div>
    </div>
    <div class="testimonial-body">
      <div class="author-image">
        <figure class="image-anime">
          <img src="${testimonial.thumbnail}" alt="" />
        </figure>
      </div>
      <div class="author-content">
        <h3>${testimonial.name}</h3>
        <p>${testimonial.date}</p>
      </div>
    </div>
  </div>
`;

        testimonialContainer.appendChild(testimonialDiv);
      });
    });
} catch (error) {
  console.log("Error ---", error);
}