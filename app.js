class Product {
    constructor(name, price, year){
        this.name = name;
        this.price = price;
        this.year = year;

    }
}

class UI {
    addProduct(product) {
       const productList = document.querySelector('#product-list')
       const element = document.createElement('div')
       element.innerHTML = `
       <div class="card text-center mb-4"> 
        <div class="card-body">
            <strong>Product name: </strong>${product.name}
            <strong>Product price:</strong> ${product.price}
            <strong>Product year: </strong>${product.year}
            <a name="delete" href="#" class="btn btn-danger m-2">Delete</a>
        </div>
       </div>
       `
   productList.appendChild(element)
    }
    resetForm() {
        document.querySelector('#product-form').reset()
    }
    deleteProduct(element) {
        if (element.name=='delete'){
            element.parentElement.parentElement.parentElement.remove()
            this.showMessage('Product Deleted Successfully', 'warning')
        }
    }
    showMessage(message, cssClass) {
        const div = document.createElement('div')
        div.className= `alert alert-${cssClass} mt-2`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const app = document.querySelector('#App')
        container.insertBefore(div, app)
        setTimeout(function(){
            document.querySelector('.alert').remove()
        }, 3000)
    }
}

// DOM Events

document.querySelector('#product-form')
.addEventListener('submit', function(e){
    const name = document.querySelector('#name').value
    const price = document.querySelector('#price').value
    const year = document.querySelector('#year').value

    const product = new Product(name, price, year)

    const ui = new UI()
    if(name=="" || price=="" || year==""){
     return ui.showMessage('Please complete the fields', 'danger')
    }    
    ui.addProduct(product)
    ui.resetForm()
    ui.showMessage('Product added successfully', 'success')


    e.preventDefault()
})

document.querySelector('#product-list').addEventListener('click', function(e){
    const ui = new UI()
    ui.deleteProduct(e.target)
})