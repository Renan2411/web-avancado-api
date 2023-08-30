let users: any = []

function validarDados({ nome, email, telefone }: any) {
    if (!nome || !email || !telefone) {
        return false
    }

    return true
}

function createUser({ nome, email, telefone }: any) {
    users.push({ id: users.length + 1, nome, email, telefone })
}

function getUser(id: number) {
    return users.find((user: any) => user.id === id)
}

function editarUsuario(){
    
}

module.exports = (app: any) => {
    app.get('/user', (resquest: any, response: any) => {
        response.status(201).json({
            users
        })
    })

    app.get('/user/:id', (request: any, response: any) => {
        const { id } = request.params

        const user = getUser(Number(id))

        if (!user) {
            response.status(404).json({
                message: "Usuário não encontradado"
            })
        }

        response.status(200).json({
            user
        })

    })

    app.post('/user', (request: any, response: any) => {
        const { nome, email, telefone }: any = request.body

        if (!validarDados({ nome, email, telefone })) {
            return response.status(400).json({
                message: "Necessário informar todos os dados para o cadastro!"
            })
        }

        createUser({ nome, email, telefone })

        return response.status(201).json({
            message: "Usuàrio cadstrado com sucesso!!"
        })
    })

    app.put('/user/:id', (request: any, response: any) => {
        const { id } = request.params

        if (!getUser(Number(id))) {
            response.status(404).json({
                message: "Usuário não encontradado"
            })
        }

        const { nome, email, telefone } = request.body



    })

}