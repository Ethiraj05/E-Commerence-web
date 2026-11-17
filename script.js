// Product Data

let products = [
    {
        id: 1,
        name: "Smart Watch",
        category: "Electronics",
        price: 1999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        id: 2,
        name: "Headphones",
        category: "Electronics",
        price: 1499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 3,
        name: "Running Shoes",
        category: "Shoes",
        price: 2499,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        id: 4,
        name: "T-Shirt",
        category: "Fashion",
        price: 599,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },
    {
        id: 5,
        name: "Camera",
        category: "Electronics",
        price: 15999,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500"
    },
    {
        id: 6,
        name: "Jacket",
        category: "Fashion",
        price: 1999,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
    },
    {
        id: 7,
        name: "Sneakers",
        category: "Shoes",
        price: 2999,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"
    },
    {
        id: 8,
        name: "Keyboard",
        category: "Electronics",
        price: 999,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500"
    }
];


// Cart Array

let cart = [];


// Display Products

function displayProducts(productList) {

    let container = document.getElementById("product-container");

    container.innerHTML = "";

    if (productList.length === 0) {
        container.innerHTML = "<p>No products found!</p>";
        return;
    }

    productList.forEach(function(product) {

        let card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>${product.category}</p>

            <h4>₹${product.price}</h4>

            <button class="add-btn"
                onclick="addToCart(${product.id})">
                Add To Cart
            </button>
        `;

        container.appendChild(card);

    });

}


// Add To Cart

function addToCart(id) {

    let product = products.find(function(item) {
        return item.id === id;
    });

    let existingProduct = cart.find(function(item) {
        return item.id === id;
    });

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();

    alert(product.name + " added to cart!");

}


// Update Cart

function updateCart() {

    let cartItems = document.getElementById("cart-items");

    let totalPrice = document.getElementById("total-price");

    let cartCount = document.getElementById("cart-count");

    cartItems.innerHTML = "";

    let total = 0;

    let count = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty!</p>";

    }

    cart.forEach(function(item) {

        total += item.price * item.quantity;

        count += item.quantity;

        let div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>

                <div class="quantity">

                    <button onclick="changeQuantity(${item.id}, -1)">-</button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${item.id}, 1)">+</button>

                </div>
            </div>

            <button class="remove-btn"
                onclick="removeItem(${item.id})">
                Remove
            </button>
        `;

        cartItems.appendChild(div);

    });

    totalPrice.innerText = total;

    cartCount.innerText = count;

}


// Increase / Decrease Quantity

function changeQuantity(id, value) {

    let product = cart.find(function(item) {
        return item.id === id;
    });

    if (!product) return;

    product.quantity += value;

    if (product.quantity <= 0) {

        cart = cart.filter(function(item) {
            return item.id !== id;
        });

    }

    updateCart();

}


// Remove Product

function removeItem(id) {

    cart = cart.filter(function(item) {
        return item.id !== id;
    });

    updateCart();

}


// Open / Close Cart

function toggleCart() {

    let cartSection = document.getElementById("cart-section");

    cartSection.classList.toggle("active");

}


// Search Products

let searchInput = document.getElementById("search");

searchInput.addEventListener("input", function() {

    let searchValue = searchInput.value.toLowerCase();

    let filteredProducts = products.filter(function(product) {

        return product.name.toLowerCase().includes(searchValue);

    });

    displayProducts(filteredProducts);

});


// Filter Products By Category

function filterProducts(category) {

    if (category === "All") {

        displayProducts(products);

    } else {

        let filteredProducts = products.filter(function(product) {

            return product.category === category;

        });

        displayProducts(filteredProducts);

    }

}


// Checkout

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    let total = cart.reduce(function(sum, item) {

        return sum + item.price * item.quantity;

    }, 0);

    alert("Order placed successfully! Total amount: ₹" + total);

    cart = [];

    updateCart();

    toggleCart();

}


// Initial Display

displayProducts(products);

updateCart();