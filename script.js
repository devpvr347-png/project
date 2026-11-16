
// 1. Store project data

let medicines = [];
let customers = [];
let suppliers = [];
let sales = [];


// 2. Navigation between pages

let navButtons = document.querySelectorAll(".nav-link");
let pages = document.querySelectorAll(".page");

navButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Remove active class from all buttons
        navButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        // Hide all pages
        pages.forEach(function(page) {
            page.classList.remove("active");
        });

        // Activate selected button
        button.classList.add("active");

        // Show selected page
        let pageId = button.getAttribute("data-page");
        document.getElementById(pageId).classList.add("active");

    });

});


// 3. Add Medicine

let medicineForm = document.getElementById("medicineForm");

medicineForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("medicineName").value;
    let category = document.getElementById("medicineCategory").value;
    let price = Number(document.getElementById("medicinePrice").value);
    let quantity = Number(document.getElementById("medicineQuantity").value);
    let expiry = document.getElementById("medicineExpiry").value;

    let medicine = {
        name: name,
        category: category,
        price: price,
        quantity: quantity,
        expiry: expiry
    };

    medicines.push(medicine);

    medicineForm.reset();

    displayMedicines();

    alert("Medicine added successfully!");

});


// 4. Display Medicines

function displayMedicines() {

    let medicineTable = document.getElementById("medicineTable");
    let dashboardTable = document.getElementById("dashboardMedicineTable");

    medicineTable.innerHTML = "";
    dashboardTable.innerHTML = "";

    medicines.forEach(function(medicine) {

        let row = `
            <tr>
                <td>${medicine.name}</td>
                <td>${medicine.category}</td>
                <td>₹${medicine.price}</td>
                <td>${medicine.quantity}</td>
                <td>${medicine.expiry}</td>
            </tr>
        `;

        medicineTable.innerHTML += row;

        let dashboardRow = `
            <tr>
                <td>${medicine.name}</td>
                <td>₹${medicine.price}</td>
                <td>${medicine.quantity}</td>
            </tr>
        `;

        dashboardTable.innerHTML += dashboardRow;

    });

    updateDashboard();
    displayInventory();

}


// 5. Display Inventory

function displayInventory() {

    let inventoryTable = document.getElementById("inventoryTable");

    inventoryTable.innerHTML = "";

    medicines.forEach(function(medicine) {

        let status = "Available";

        if (medicine.quantity <= 10) {
            status = "Low Stock";
        }

        let row = `
            <tr>
                <td>${medicine.name}</td>
                <td>${medicine.quantity}</td>
                <td>${status}</td>
            </tr>
        `;

        inventoryTable.innerHTML += row;

    });

}


// 6. Update Dashboard

function updateDashboard() {

    document.getElementById("totalMedicines").innerText = medicines.length;

    document.getElementById("totalCustomers").innerText = customers.length;

    let totalAmount = 0;

    sales.forEach(function(sale) {
        totalAmount = totalAmount + sale.total;
    });

    document.getElementById("totalSales").innerText = "₹" + totalAmount;

    let lowStockCount = 0;

    medicines.forEach(function(medicine) {

        if (medicine.quantity <= 10) {
            lowStockCount++;
        }

    });

    document.getElementById("lowStock").innerText = lowStockCount;

    document.getElementById("reportSales").innerText = "₹" + totalAmount;

}


// 7. Add Customer

let customerForm = document.getElementById("customerForm");

customerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("newCustomerName").value;
    let phone = document.getElementById("customerPhone").value;

    let customer = {
        name: name,
        phone: phone
    };

    customers.push(customer);

    let row = `
        <tr>
            <td>${customer.name}</td>
            <td>${customer.phone}</td>
        </tr>
    `;

    document.getElementById("customerTable").innerHTML += row;

    customerForm.reset();

    updateDashboard();

    alert("Customer added successfully!");

});


// 8. Add Supplier

let supplierForm = document.getElementById("supplierForm");

supplierForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("supplierName").value;
    let phone = document.getElementById("supplierPhone").value;

    let supplier = {
        name: name,
        phone: phone
    };

    suppliers.push(supplier);

    let row = `
        <tr>
            <td>${supplier.name}</td>
            <td>${supplier.phone}</td>
        </tr>
    `;

    document.getElementById("supplierTable").innerHTML += row;

    supplierForm.reset();

    alert("Supplier added successfully!");

});


// 9. Generate Bill

let billingForm = document.getElementById("billingForm");

billingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let customerName = document.getElementById("customerName").value;
    let medicineName = document.getElementById("billMedicine").value;
    let quantity = Number(document.getElementById("billQuantity").value);

    let foundMedicine = null;

    medicines.forEach(function(medicine) {

        if (medicine.name.toLowerCase() === medicineName.toLowerCase()) {
            foundMedicine = medicine;
        }

    });

    if (foundMedicine === null) {

        alert("Medicine not found!");
        return;

    }

    if (quantity > foundMedicine.quantity) {

        alert("Not enough stock available!");
        return;

    }

    let total = foundMedicine.price * quantity;

    foundMedicine.quantity = foundMedicine.quantity - quantity;

    let sale = {
        customer: customerName,
        medicine: medicineName,
        quantity: quantity,
        total: total
    };

    sales.push(sale);

    let row = `
        <tr>
            <td>${sale.customer}</td>
            <td>${sale.medicine}</td>
            <td>${sale.quantity}</td>
            <td>₹${sale.total}</td>
        </tr>
    `;

    document.getElementById("salesTable").innerHTML += row;

    billingForm.reset();

    displayMedicines();

    updateDashboard();

    alert("Bill generated successfully! Total: ₹" + total);

});
