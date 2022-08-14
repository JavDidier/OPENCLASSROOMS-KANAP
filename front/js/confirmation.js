const orderId = new URLSearchParams(window.location.search).get("orderId");
document.querySelector('#orderId').textContent = orderId;