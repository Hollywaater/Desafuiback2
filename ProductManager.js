const fs = require('fs').promises
const path = require('path').promises

//Declaramos la clase y su constructor
class ProductManager {
// Incializamos la variable ID de forma Estatica
        static id = 0
        constructor() {
        this.products = []
        this.path = "productos.json"
    }
    //Declaramos el metodo AddProduct y los parametros que debe recibir con su respectiva validación
    async addProduct(newProduct) {
        let { title, description, price, img, code, stock } = newProduct
        if (!title && !description && !price && !img && !code && !stock) {
            console.log("Error: Todos los campos son obligatorios.")
            return;
        }
        //Utilizo el metodo Some para verificar si al menos un elemento de array cumple con dicha condición        
        if (this.products.some(product => product.code === code)) {
            console.log("Error: el codigo ya se encuentra en uso.");
        } 
        const nuevoProducto = {
            id: ++ProductManager.id,
            title,
            price,
            img,
            code,
            stock
        }
        this.products.push(nuevoProducto)
        await this.guardarProducto(this.products)
        console.log("Se agrego el producto con exito")
    }
    //Metodo getProducts que retorna el arreglo
    getProducts() {

        return this.products;
    }
    //Metodo para buscar por ID
    async getProductById(id) {
        try {
            const productos = await this.leerArchivo()
            const rest = productos.find(produ => produ.id === id)
            if(!rest){
                console.log("El producto con ese ID no fue encontrado")
            } else{
                return rest
            }
        }
        catch {
            console.log("Error al leer el archvio")
        }
    }

// Metodo para leer el archivo
    async leerArchivo() {
        try {
            const leer = await fs.readFile(this.path, 'utf-8')
            const productos = JSON.parse(leer)
            return productos
        } catch {
            console.log("Error: no se pudo leer el archivo")
        }
    }
// Metodo para guardar el producto en el archivo
async guardarProducto(productos){
    try{
        await fs.writeFile(this.path, JSON.stringify(productos, null, 2))
    }catch{
        console.log("Error al guardar el producto en el archivo")
    }
}
//Metodo para modificar un producto buscando a traves de su ID
async upDateProduct(id,produModi){
    try{
const productos = await this.leerArchivo()

const indice = productos.find(produ => produ.id === id)
if(indice !== -1){
    productos.splice(indice, 1, produModi)
    await this.guardarProducto(productos)
    console.log("Se modifico el producto con exito")
}else{
    console.log("No se pudo encontrar el producto que desea modificar")
}
    }catch{
        console.log("Error: no se pudo actulizar el producto")
    }
}
//Metodo para eliminar el producto
async deleteProduct(id){
    try{ 
        const productos = await this.leerArchivo()
        const eliminar = productos.filter(produ => produ.id !== id)
        await this.guardarProducto(eliminar)
        console.log(`Se elimino el producto con exito`)
    }catch{
        console.log("No fue posible eliminar el producto")

    }
}

}


module.exports = ProductManager

























