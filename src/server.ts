import express from 'express';

const app = express();
app.use(express.json())

require('./routes/users/user-routes')(app)

const PORT = 3000;

let data: any = []

app.get('/', (req, res) => {
    res.send('Olá, Mundo!');
});

app.post('/cadastrar', (req, res) => {
    data.push(req.body)

    res.status(200).json({
        message: "Cadastrado com !"
    })
})

app.get("/listar", (req, res) => {
    res.status(200).json({
        data: data
    })
})

app.get('/listar/:id', (req, res) => {
    const { id } = req.params

    const user: any = acharUsuario(parseInt(id))

    if (user) {
        return res.status(200).json({
            user
        })
    }

    return res.status(400).json({
        message: "Usuário não encontrado"
    })

})

app.put('/editar/:id', (req, res) => {
    const { id } = req.params
    const { nome, email, telefone } = req.body

    const idUsuario = Number(id) 

    data = data.map((user: any) => {
        if (user.id === idUsuario) {
            console.log("encontrou")
            return { id: idUsuario, nome, email, telefone }
        }

        return user
    })

    console.log(data) 


    res.status(200).json({
        message: 'Editado com sucesso!'
    })
})

function acharUsuario(id: Number) {
    return data.find((user: any) => user.id === id)
}

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});