var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDesc = document.getElementById('productDesc');
var addButton = document.getElementById("addProduct");
var cancelButton = document.getElementById("cancel");
var productContainer = localStorage.getItem('productsList') ? JSON.parse(localStorage.getItem('productsList')) : [];
if (productContainer.length){
    console.log(productContainer);
    displayProducts()
}

function addProduct() {
    console.log(checkInputs())
    if (checkInputs()){
        var product = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            desc: productDesc.value,
        };
        productContainer.push(product)
        console.log(productContainer);
        localStorage.setItem('productsList' , JSON.stringify(productContainer));
        displayProducts();
        clearForm();
    }else{
        alert('all fields required');
    }
}

function clearForm() {
    productName.value = '';
    productPrice.value = '';
    productCategory.value = '';
    productDesc.value = '';
}

function displayProducts(searchValue = '') {
    if (searchValue.toLowerCase() != ""){
        productContainer = productContainer.filter(element => element.name.toLowerCase().includes(searchValue.toLowerCase()));
    }else {
        productContainer = localStorage.getItem('productsList') ? JSON.parse(localStorage.getItem('productsList')) : [];
    }

    var products = ``;
    for (var i = 0; i < productContainer.length; i++) {
        products += `<tr>
        <td>${i + 1}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].desc}</td>
        <td><button onclick="editProduct(${i})" class="btn btn-outline-warning">Edit</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button></td>
        </tr>`;
    }
    document.getElementById('tableBody').innerHTML = products;
}

function checkInputs() {
    return (productName.value !== '' && productPrice.value !== '' && productCategory.value !== '' && productDesc.value !== '');
}

function deleteProduct(productIndex) {
    productContainer.splice(productIndex , 1);
    localStorage.setItem('productsList' , JSON.stringify(productContainer));
    displayProducts();
}

function editProduct(productIndex){
    productName.value = productContainer[productIndex].name;
    productPrice.value = productContainer[productIndex].price;
    productCategory.value = productContainer[productIndex].category;
    productDesc.value = productContainer[productIndex].desc;
    addButton.innerHTML = 'update';
    cancelButton.style.display="inline-block";
    addButton.onclick = () => {
        updateProduct(productIndex);
    };
}

function updateProduct(productIndex){
    productContainer[productIndex].name = productName.value;
    productContainer[productIndex].price = productPrice.value;
    productContainer[productIndex].category = productCategory.value;
    productContainer[productIndex].desc = productDesc.value;
    localStorage.setItem('productsList' , JSON.stringify(productContainer));
    addButton.innerHTML = 'add Product';
    cancelButton.style.display="none";
    addButton.onclick = () => {
        addProduct();
    };
    displayProducts();
    clearForm();
}

function cancelUpdate() {
    addButton.innerHTML = 'add Product';
    cancelButton.style.display="none";
    addButton.onclick = () => {
        addProduct();
    };

    clearForm();

}



