const ProductManager = require('./ProductManager')


const manager = new ProductManager();



//Verificación de los metodos creados 
const produ =
{
    title: "Shampoo neutro",
    description: "description product 1",
    price: 80, img: "./img/product1.jpg",
    code: "xjf203",
    stock: 5
}
//Utilizamos el metodo para agregar el producto a nuestro archivo
manager.addProduct(produ)
//Instanciamos mas productos para corroborar los metodos creados
const produ2 = { title: "Acondicionador", description: "description product 2", price: 120, img: "./img/product2.jpg", code: "123abc", stock: 10 }
const produ3 = { title: "Limpia Cristales", description: "description product 3", price: 160, img: "./img/product3.jpg", code: "jxp101", stock: 15 }
const produ4 = { title: "product4", description: "description product 4", price: 90, img: "./img/product4.jpg", code: "xyz456", stock: 8 }
const produ5 = { title: "product5", description: "description product 5", price: 80, img: "./img/product5.jpg", code: "xyz666", stock: 9 }
manager.addProduct(produ2)
manager.addProduct(produ3)
manager.addProduct(produ4)
//Metodo para capturar el producto por ID

manager.getProductById(4)

//Verificación del metodo para elimnar productos
manager.deleteProduct(3)

//Verificación del metodo para modificar productos
async function actualizarProdu(id) {
    await manager.upDateProduct(id, produ5)
    console.log(produ5)
}
actualizarProdu(2)
