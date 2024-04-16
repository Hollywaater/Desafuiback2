const { log, error } = require("console");
const express = require("express")
const ProductManager = require('./ProductManager.js')
const PORT = 8080
const app = express()
app.use(express.urlencoded({ extended: true }));

const manager = new ProductManager()



app.get('/products', async(req, res)=>{
    try {
        const arrayProducts = await manager.leerArchivo()
        let limit = parseInt(req.query.limit)
        if(limit){
            const arrayConsul = arrayProducts.slice(0, limit)
            return res.send(arrayConsul)
        }else{
            return res.send(arrayProducts)
        }
    } catch (error) {
        console.log(error)
        return res.send('Error al procesar el pedido')
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        let id = parseInt(req.params.bus)
        let allProducts = await manager.getProductById(id)
        if (allProducts) {
            return res.send(allProducts)
        } else {
            
            return res.send("No se pudo encontrar el producto")
        }
    } catch (error) { 

        return res.send("Error al buscar por ID")
    }
});
app.listen(PORT, ()=>{
    console.log(`Server runing on port ${PORT}`);
})