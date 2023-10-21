function addEventListeners() {
  const quantities = document.querySelectorAll('input.quantity');
  quantities.forEach((input) => {
    input.addEventListener('change', calculateTotal);
  });

  const prices = document.querySelectorAll('input.price');
  prices.forEach((input) => {
    input.addEventListener('change', calculateTotal);
  });

  const discountInput = document.getElementById('discount');
  discountInput.addEventListener('change', calculateTotal);
}

function cancelOrder() {
  const quantities = document.querySelectorAll('input.quantity');
  quantities.forEach((input) => {
    input.value = 0;
  });

  const discountInput = document.getElementById('discount');
  discountInput.value = 0;

  calculateTotal();
  calculateChange(); // Panggil fungsi calculateChange untuk mengupdate kembali kembalian
  resetFields(); // Panggil fungsi resetFields untuk mereset nama, tanggal, saldo awal, dan kembalian
}

function resetFields() {
  const customerNameInput = document.getElementById('customerName');
  const purchaseDateInput = document.getElementById('purchaseDate');
  const initialBalanceInput = document.getElementById('initialBalance');
  const changeElement = document.getElementById('change');

  customerNameInput.value = '';
  purchaseDateInput.value = '';
  initialBalanceInput.value = 0;
  changeElement.value = 0;
}

function calculateTotal() {
  const quantities = document.querySelectorAll('input.quantity');
  const prices = document.querySelectorAll('input.price');
  let total = 0;
  let totalQuantity = 0;

  for (let i = 0; i < quantities.length; i++) {
    const price = parseInt(prices[i].value);
    const quantity = parseInt(quantities[i].value);
    const subtotal = price * quantity;
    total += subtotal;
    totalQuantity += quantity;
    quantities[i].parentElement.nextElementSibling.textContent = subtotal;
  }

  const totalElement = document.getElementById('total');
  totalElement.textContent = total;

  const discountThreshold = 50000;
  let discount = 0;
  if (total > discountThreshold) {
    discount = total * 0.05;
  }

  const discountInput = document.getElementById('discount');
  discountInput.value = discount;

  const totalPayment = total - discount;

  const totalQuantityElement = document.getElementById('totalQuantity');
  totalQuantityElement.textContent = totalQuantity;

  const totalPaymentElement = document.getElementById('totalPayment');
  totalPaymentElement.textContent = totalPayment;
}

function calculateChange() {
  const totalPayment = parseFloat(document.getElementById('totalPayment').textContent.replace(',', ''));
  const initialBalance = parseFloat(document.getElementById('initialBalance').value);
  const changeElement = document.getElementById('change');

  let change = initialBalance - totalPayment; // Ubah perhitungan kembalian dari saldo awal dikurangi total pembayaran
  change = Math.max(change, 0);
  changeElement.value = change;
}

function calculatePayment() {
  calculateChange();
}

function credit() {
  const popupText = "Penambahan design ini dibuat oleh @ayiprmd_";
  const popupElement = document.createElement("div");
  popupElement.className = "popup";
  popupElement.textContent = popupText;

  document.body.appendChild(popupElement);

  // Hilangkan popup setelah beberapa detik
  setTimeout(() => {
    document.body.removeChild(popupElement);
  }, 2500); // Hapus popup setelah 3 detik (3000 milidetik)
}

function printReceipt() {
  const customerName = document.getElementById('customerName').value;
  const purchaseDate = document.getElementById('purchaseDate').value;
  const quantities = document.querySelectorAll('input.quantity');
  const menuItems = document.querySelectorAll('td:nth-child(2)');
  const prices = document.querySelectorAll('input.price');
  const totalHargaPesanan = document.getElementById('total').textContent;
  const diskon = document.getElementById('discount').value;
  const totalPembayaran = document.getElementById('totalPayment').textContent;
  const initialBalance = parseFloat(document.getElementById('initialBalance').value);

  let receiptText = `======= Struk Pembelian =======
Nama Pelanggan: ${customerName}
Tanggal Pembelian: ${purchaseDate}\n`;

  for (let i = 0; i < quantities.length; i++) {
    const quantity = parseInt(quantities[i].value);
    if (quantity > 0) {
      const menuItem = menuItems[i].textContent;
      const price = parseInt(prices[i].value);
      const subtotal = price * quantity;
      receiptText += `${menuItem} x ${quantity} =Rp.${subtotal}\n`;
    }
  }

  receiptText += "=============================\n";
  receiptText += `Total Harga Pesanan:Rp.${totalHargaPesanan}\n`;
  receiptText += `Diskon:Rp.${diskon}\n`;
  receiptText += `Total Pembayaran:Rp.${totalPembayaran}\n`;
  receiptText += `Saldo Awal:Rp.${initialBalance}\n`;

  const change = parseFloat(totalPembayaran) - initialBalance;
  receiptText += `Kembalian:Rp.${change >= 0 ? change : '' + Math.abs(change) + ''}\n`;
  receiptText += "=============================\n";

  console.log(receiptText);
  alert("Berikut adalah struk pembelian:\n\n" + receiptText);
}

addEventListeners();
