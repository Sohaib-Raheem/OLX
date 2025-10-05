// ----------------- Product Class -----------------
class Product {
  constructor(product_title, product_description, product_category, product_price, product_location, product_images) {
    this.product_title = product_title;
    this.product_description = product_description;
    this.product_category = product_category;
    this.product_price = product_price;
    this.product_location = product_location;
    this.product_images = product_images; // Base64 string
    this.postedBy = localStorage.getItem("currentUser") || "Guest";
    this.postedAt = new Date().toLocaleString();
  }
}

// ----------------- Load Saved Ads -----------------
let productList = JSON.parse(localStorage.getItem("prod")) || [];

// ----------------- Save Function -----------------
function saveToLocalStorage() {
  localStorage.setItem("prod", JSON.stringify(productList));
  console.log("✅ Saved to localStorage:", JSON.parse(localStorage.getItem("prod")));
}

// ----------------- Ad Post Function -----------------
function adInfo(event) {
  event.preventDefault();

  let product_title = document.getElementById("title").value.trim();
  let product_description = document.getElementById("desc").value.trim();
  let product_category = document.getElementById("category").value.trim();
  let product_price = document.getElementById("price").value.trim();
  let product_location = document.getElementById("location").value.trim();
  let product_images_file = document.getElementById("images").files[0]; 

  if (!product_images_file) {
    alert("⚠️ Please select an image before posting.");
    return;
  }

  let reader = new FileReader();
  reader.onload = function (e) {
    let product_images = e.target.result; // Base64 image string

    let product = new Product(
      product_title,
      product_description,
      product_category,
      product_price,
      product_location,
      product_images
    );

    productList.push(product);
    saveToLocalStorage();

    alert("✅ Ad Posted Successfully!");
    document.getElementById("adForm").reset();
    window.location.href = "index.html";
  };

  reader.readAsDataURL(product_images_file); // convert file → Base64
}

// ----------------- Check User Before Posting -----------------
function checkUser() {
  let currentUser = localStorage.getItem("currentUser");

  if (currentUser) {
    window.location.href = "ad.html";
  } else {
    alert("⚠️ Please login/signup before posting an Ad.");
    window.location.href = "login.html";
  }
}

// ----------------- Sell Button Event -----------------
let sellBtn = document.getElementById("sell-Btn");
if (sellBtn) {
  sellBtn.addEventListener("click", function () {
    let currentUser = localStorage.getItem("currentUser");

    if (currentUser) {
      window.location.href = "ad.html";
    } else {
      alert("⚠️ Please login/signup before posting an Ad.");
      window.location.href = "login.html";
    }
  });
}
