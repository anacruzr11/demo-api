// npm i dotnev para datos confidenciales como contraseñas, claves, etc.
require("dotenv").config();
// 1. IMPORTACIONES
const express = require("express");
const app = express();
const PORT = 4000;
// const PORT = process.env.PORT || 4000;
const { users } = require("./database/db");
const { v4:uuid } = require("uuid");

// 2. MIDDLEWARES
app.use(express.json());

// 3. RUTAS
app.get("/", (req, res) => {
    return res.json({
        msg: "Bienvenidos al API",
        // author: process.env.AUTHOR,
    });
});

app.get("/users", (req, res) => {
    return res.json({
        ok: true,
        msg: "Usuarios obtenidos",
        data: users,
    });
});

app.post("/users", (req, res) => {

    const {user_name, password} = req.body;
    
    const user = {
        id: uuid(),
        user_name: user_name,
        password,
    };

    users.push(user);

    return res.json({
        ok: true,
        msg: "Usuario creado",
        data: user,
    });
});

app.put("/users/:id", (req, res) => {

    const { id } = req.params;
    const { user_name, password } = req.body;
    
    const user = users.find((user) => user.id === id)

    user.user_name = user_name;
    user.password = password;
   
    return res.json({
        ok: true,
        msg: "Usuario actualizado",
        data: {},
    });
});

app.delete("/users/:id", (req, res) => {
    const {id} = req.params;

    const user = users.find((user) => user.id === id)
    const index = users.indexOf(user)
    users.splice(index, 1)

    return res.json({
        ok: true,
        msg: "Usuario eliminado",
        data: {},
    })
})

// 4. SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor en línea en el puerto ${PORT}`);
});