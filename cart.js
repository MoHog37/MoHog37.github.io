// โหลดข้อมูลจาก LocalStorage
let cart = JSON.parse(localStorage.getItem('iHavePhaiCart')) || [];

// ฟังก์ชันบันทึกข้อมูล
function saveCartToStorage() {
    localStorage.setItem('iHavePhaiCart', JSON.stringify(cart));
    updateCartUI();
}

// ฟังก์ชันเพิ่มสินค้า (ใช้ได้ทุกหน้า)
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    saveCartToStorage();
    
    // แสดง Feedback ว่าเพิ่มแล้ว (Optional)
    const badge = document.getElementById('cart-badge');
    if(badge) {
        badge.classList.add('cart-bounce');
        setTimeout(() => badge.classList.remove('cart-bounce'), 300);
    }
}

// ฟังก์ชันอัปเดตตัวเลขบนตะกร้าและรายการสินค้า
function updateCartUI() {
    const badge = document.getElementById('cart-badge');
    const itemsDiv = document.getElementById('cart-items');
    const totalSpan = document.getElementById('cart-total');
    
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    
    if (badge) {
        badge.innerText = totalQty;
        badge.classList.toggle('opacity-0', totalQty === 0);
    }

    if (itemsDiv) {
        let total = 0;
        itemsDiv.innerHTML = cart.map(item => {
            total += item.price * item.qty;
            return `
                <div class="flex justify-between items-center border-b pb-2 mb-2">
                    <div class="text-sm">
                        <p class="font-bold">${item.name}</p>
                        <p class="text-gray-500">฿${item.price} x ${item.qty}</p>
                    </div>
                    <button onclick="removeFromCart(${item.id})" class="text-red-500 text-xs">ลบ</button>
                </div>`;
        }).join('') || '<p class="text-center text-gray-400 py-4">ตะกร้าว่างเปล่า</p>';
        
        if (totalSpan) totalSpan.innerText = total.toLocaleString();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCartToStorage();
}

// ฟังก์ชันเปิด-ปิด ตะกร้า (Drawer)
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    const panel = document.getElementById('cart-panel');
    if (!modal || !panel) return;

    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        setTimeout(() => panel.classList.remove('translate-x-full'), 10);
    } else {
        panel.classList.add('translate-x-full');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }
}

// อัปเดต UI ทันทีที่โหลดหน้าเว็ป
document.addEventListener('DOMContentLoaded', updateCartUI);
