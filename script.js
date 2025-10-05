// ----------------- API Products -----------------
function getProducts() {
  fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((result) => showProduct(result))
    .catch((err) => console.error("Error fetching products:", err));
}

function showProduct(result) {
  const { products } = result;
  let cardElementContainer = document.getElementById("container");

  products.forEach((element) => {
    const { thumbnail, price, title, description, id } = element;

    cardElementContainer.innerHTML += `
      <a href="./product.html?id=${id}">
        <div class="card">
          <img src="${thumbnail}" alt="Product">
          <h3>${title}</h3>
          <p class="price">PKR ${price}</p>
          <p class="description">${description}</p>
        </div>
      </a>
    `;
  });
}

// ----------------- Local Ads (from ad.html form) -----------------
function showLocalAds() {
  let ads = JSON.parse(localStorage.getItem("prod")) || [];
  let adsContainer = document.getElementById("adsContainer");

  if (ads.length === 0) {
    adsContainer.innerHTML = "<p>No local ads posted yet.</p>";
    return;
  }

  ads.forEach((ad) => {
    adsContainer.innerHTML += `
      <div class="card">
        <img src="${ad.product_images}" alt="Product" width="200">
        <h3>${ad.product_title}</h3>
        <p class="price">PKR ${ad.product_price}</p>
        <p class="description">${ad.product_description}</p>
        <small>Posted by: ${ad.postedBy}</small>
      </div>
    `;
  });
}

// ----------------- Init -----------------
window.onload = function () {
  getProducts();     // API se products
  showLocalAds();    // LocalStorage se ads
};
