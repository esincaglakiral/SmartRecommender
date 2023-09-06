document.addEventListener("DOMContentLoaded", function () {
  // API'den veri çekme ve HTML yapısını oluşturma işlemlerini burada yaptım
  fetch("https://opt-interview-projects.onrender.com/smart-recommender")
    .then((response) => response.json())
    .then((data) => {
      var smartRecommender = createSmartRecommender(data);
      document
        .querySelector(".smart-recommender .product-carousel")
        .appendChild(smartRecommender);
    })
    .catch((error) => {
      console.error("API isteği başarısız oldu: " + error);
    });
});

// Verileri kullanarak carousel yapısını oluşturan fonksiyonu oluşturdum
function createSmartRecommender(data) {
  var currentIndex = 0;
  var productsPerPage = 5;

  var smartRecommender = document.createElement("div");
  smartRecommender.className = "smart-recommender";
  smartRecommender.innerHTML = `
      <h2 class="recommender-title">Muhtemelen Beğeneceğiniz Ürünler</h2>
      <button class="navigation-button left-button">&lt;</button>
      <div class="product-carousel">
        <!-- Ürünler burada görünecek -->
      </div>
      <button class="navigation-button right-button">&gt;</button>
    `;

  var productCarousel = smartRecommender.querySelector(".product-carousel");
  var totalProducts = data.length;

  function updateCarousel() {
    var startIndex = currentIndex;
    var endIndex = currentIndex + productsPerPage;

    var productHTML = "";
    for (var i = startIndex; i < endIndex; i++) {
      var product = data[i % totalProducts];
      if (product) {
        productHTML += `
            <div class="product">
              <div class="product-card">
                <a href="${product.url}" target="_blank">
                  <img src="${product.img}" alt="${product.name}" class="product-image">
                  <h3 class="product-name">${product.name}</h3>
                  <p class="product-price">${product.price} TL</p>
                </a>
              </div>
            </div>
          `;
      }
    }

    productCarousel.innerHTML = productHTML;
  }

  var leftButton = smartRecommender.querySelector(".left-button");
  leftButton.addEventListener("click", function () {
    currentIndex =
      (currentIndex - productsPerPage + totalProducts) % totalProducts;
    updateCarousel();
  });

  var rightButton = smartRecommender.querySelector(".right-button");
  rightButton.addEventListener("click", function () {
    currentIndex = (currentIndex + productsPerPage) % totalProducts;
    updateCarousel();
  });

  updateCarousel();
  return smartRecommender;
}
