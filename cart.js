
// FreshFit Shopping Basket

let basket = JSON.parse(localStorage.getItem("freshfitBasket")) || [];

const whatsappNumber = "27XXXXXXXXX"; 
// Replace with your business WhatsApp number.

function saveBasket() {
    localStorage.setItem("freshfitBasket", JSON.stringify(basket));
}

function getPrice(card) {
    const priceText = card.querySelector(".price").textContent;
    return parseFloat(priceText.replace(/[^\d.]/g, ""));
}

// Add products to basket
document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", function () {

        const card = button.closest(".product-card");
        const name = card.querySelector("h2").textContent;
        const price = getPrice(card);

        const existingProduct = basket.find(item => item.name === name);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            basket.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        saveBasket();
        displayBasket();

        alert(name + " added to your basket!");
    });
});

// Create shopping basket on the page
const basketSection = document.createElement("section");
basketSection.id = "shopping-basket";

document.body.appendChild(basketSection);

function displayBasket() {

    let total = 0;

    let basketHTML = `
        <h2>Your Shopping Basket</h2>
    `;

    if (basket.length === 0) {
        basketHTML += "<p>Your basket is empty.</p>";
    }

    basket.forEach((item, index) => {

        const subtotal = item.price * item.quantity;
        total += subtotal;

        basketHTML += `
            <div class="basket-item">
                <p><strong>${item.name}</strong></p>
                <p>Price: R${item.price.toFixed(2)}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Subtotal: R${subtotal.toFixed(2)}</p>
                <button onclick="removeProduct(${index})">
                    Remove
                </button>
            </div>
            <hr>
        `;
    });

    basketHTML += `
        <h3>Total: R${total.toFixed(2)}</h3>
        <button onclick="placeOrder()" class="checkout-button">
            Place Order
        </button>
    `;

    basketSection.innerHTML = basketHTML;
}

// Remove products
function removeProduct(index) {
    basket.splice(index, 1);
    saveBasket();
    displayBasket();
}

// Place an order through WhatsApp
function placeOrder() {

    if (basket.length === 0) {
        alert("Your basket is empty!");
        return;
    }

    const customerName = prompt("Please enter your full name:");
    if (!customerName || !customerName.trim()) return;

    const customerAddress = prompt("Please enter your delivery address:");
    if (!customerAddress || !customerAddress.trim()) return;

    let total = 0;

    let message = "Hello FreshFit! I would like to place an order.\n\n";
    message += "Customer: " + customerName + "\n";
    message += "Delivery Address: " + customerAddress + "\n\n";
    message += "ORDER DETAILS:\n";

    basket.forEach(item => {

        const subtotal = item.price * item.quantity;
        total += subtotal;

        message += item.name + " x " + item.quantity +
            " = R" + subtotal.toFixed(2) + "\n";
    });

    message += "\nTOTAL: R" + total.toFixed(2);
    message += "\n\nPlease confirm my order. Thank you!";

    const whatsappURL =
        "https://wa.me/" + whatsappNumber +
        "?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
}

// Display saved basket when page opens
displayBasket();
