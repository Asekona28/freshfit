
document.addEventListener("DOMContentLoaded", function () {
  // Display the current year in the footer.
  document.querySelectorAll(".year").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  // Newsletter form demonstration.
  document.querySelectorAll(".newsletter-form").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = form.querySelector('input[type="email"]').value.trim();
      const message = form.parentElement.querySelector(".form-message");

      if (email) {
        message.textContent =
          "Thank you for subscribing! This is a demo signup.";
        form.reset();
      }
    });
  });

  // Product basket demonstration.
  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");
  const clearCart = document.getElementById("clear-cart");
  const cartMessage = document.getElementById("cart-message");

  let basket = [];

  function renderBasket() {
    if (!cartCount || !cartItems) return;

    cartCount.textContent = basket.length;
    cartItems.replaceChildren();

    basket.forEach(function (product) {
      const item = document.createElement("li");
      item.textContent = product;
      cartItems.appendChild(item);
    });
  }

  document.querySelectorAll(".add-cart").forEach(function (button) {
    button.addEventListener("click", function () {
      basket.push(button.dataset.product);
      renderBasket();

      if (cartMessage) {
        cartMessage.textContent = "Product added to your demo basket.";
      }
    });
  });

  if (clearCart) {
    clearCart.addEventListener("click", function () {
      basket = [];
      renderBasket();

      if (cartMessage) {
        cartMessage.textContent = "Your basket has been cleared.";
      }
    });
  }

  // Contact form demonstration.
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const message = contactForm.querySelector(".form-message");
      message.textContent =
        "Thank you! Your message has been recorded for this demonstration.";
      contactForm.reset();
    });
  }

  // Review form demonstration.
  const reviewForm = document.getElementById("review-form");

  if (reviewForm) {
    reviewForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const message = reviewForm.querySelector(".form-message");
      message.textContent =
        "Thank you for your feedback! It has not been published online.";
      reviewForm.reset();
    });
  }
});
