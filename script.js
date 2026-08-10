let cart = JSON.parse(localStorage.getItem('cart_panchita')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
});

function toggleCart() {
    document.getElementById('cart-drawer').classList.toggle('open');
    document.getElementById('cart-backdrop').classList.toggle('open');
}

function addToCart(name, price) {
    cart.push({ name, price });
    saveCart();
    updateCartUI();
    showToast(`${name} agregado`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('cart_panchita', JSON.stringify(cart));
}

function updateCartUI() {
    const cartCountEl = document.getElementById('cart-count');
    const container = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');

    if (cartCountEl) cartCountEl.textContent = cart.length;
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart">El canasto está vacío</p>';
        if (cartTotalEl) cartTotalEl.textContent = '$0';
        return;
    }

    let html = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        html += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <div class="cart-item-price">$${item.price}</div>
                </div>
                <button class="btn-remove" onclick="removeFromCart(${index})">Quitar</button>
            </div>
        `;
    });

    container.innerHTML = html;
    if (cartTotalEl) cartTotalEl.textContent = `$${total}`;
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 2000);
}

function checkoutWhatsApp() {
    if (cart.length === 0) return alert('El canasto está vacío');
    
    const phone = '5492611234567'; // Cambiar por tu teléfono
    let message = "Hola La Panchita! Quisiera encargar los siguientes productos:\n\n";
    let total = 0;

    cart.forEach(item => {
        message += `• ${item.name} - $${item.price}\n`;
        total += item.price;
    });

    message += `\nTotal estimado: $${total}\n\nQuedo a la espera para realizar la seña del 50%. ¡Muchas gracias!`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}