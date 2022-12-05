const express = require('express');
const app = express();
const Contenedor = require("./ClaseContenedor");
const ContenedorProducto = new Contenedor('./productos.txt');

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// *********************************************************************

const { Router } = express
const routerProductos = Router();
app.use('/api/productos', routerProductos);


routerProductos.get('/', (req, res) => {
    try {
        ContenedorProducto.getAll()
        .then((results)=> {
            res.json(results);
        }).catch((error)=> error);
        // res.send({ resultado });


    } catch (error) {
        console.log(error)
    }
});

routerProductos.get('/:id', (req, res) => {
    const { id } = req.params
    try {
        ContenedorProducto.getById(parseInt(id))
        .then((results)=> {
            res.json(results);
        }).catch((error)=> error);

    } catch (error) {
        console.log(error)
    }
});

routerProductos.post('/', (req, res) => {
    const objProducto = req.body
    ContenedorProducto.save(objProducto)
    res.json({
        objProducto
    })

});
routerProductos.put('/:id', (req, res) => {
    const { id } = req.params
    // console.log(objProducto)
    ContenedorProducto.updateByID({ id: parseInt(id), ...objProducto })
})

routerProductos.delete('/:id', (req, res) => {
        const { id } = req.params
        res.send(ContenedorProducto.deleteById(parseInt(id)))
});


// ********************************************************************




app.listen(8080, err => {
    if (err) throw err
    console.log('Server running on port 8080')
});

