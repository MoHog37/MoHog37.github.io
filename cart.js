// cart.js
let cart = JSON.parse(localStorage.getItem('iHavePhaiCart')) || [];

function saveCart() {
    localStorage.setItem('iHavePhaiCart', JSON.stringify(cart));
    updateCartUI(); // อัปเดตตัวเลขและรายการในทุกหน้าที่มีไฟล์นี้
}

function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveCart();
    // ถ้าอยากให้กดแล้วเปิดตะกร้าทันที
    if(typeof toggleCart === "function") toggleCart(); 
}

// ฟังก์ชันอัปเดต UI ที่ทุกหน้าต้องมีเหมือนกัน
function updateCartUI() {
    const badge = document.getElementById('cart-badge');
    if(badge) {
        const count = cart.reduce((sum, i) => sum + i.qty, 0);
        badge.innerText = count;
        badge.classList.toggle('opacity-0', count === 0);
    }
    // ... โค้ดสำหรับแสดงรายการในแถบด้านข้าง (ถ้ามี) ...
}
