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
            <strong>Producto: </strong>${product.name}
            <strong>Precio:</strong> ${product.price} €
            <strong>Año: </strong>${product.year}
            <a name="delete" href="#" class="btn btn-danger m-2">Eliminar</a>
        </div>
       </div>
       `
   productList.appendChild(element)
    }
    resetForm() {
        document.querySelector('#product-form').reset()
    }
    deleteProduct(element) {
        this.delete = window.confirm("¿Seguro que quieres eliminar el producto?")
        if (element.name=='delete' && this.delete){
            element.parentElement.parentElement.parentElement.remove()
            this.showMessage('Producto eliminado', 'warning')
            if(document.querySelector('#product-list').childNodes.length == 3){
                document.querySelector("#list-header").innerHTML="No hay ningún producto para mostrar. Guarda algún producto para que se muestre aquí."
            }
        }
    
    }
    showMessage(message, cssClass) {
        const div = document.createElement('div')
        div.className= `alert alert-${cssClass} mt-2 col-md-4`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const app = document.querySelector('#App')
        container.appendChild(div)
        const listHeader = document.querySelector('#list-header')
        listHeader.innerHTML="Products List"
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
     return ui.showMessage('Por favor completa los campos', 'danger')
    }    
    ui.addProduct(product)
    ui.resetForm()
    ui.showMessage('Producto guardado', 'success')


    e.preventDefault()
})

document.querySelector('#product-list').addEventListener('click', function(e){
    const ui = new UI()
    ui.deleteProduct(e.target)
    ui.editProduct(e.target)
})