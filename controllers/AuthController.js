const User = require('../models/User')

module.exports = class AuthController {
    static async register(req, res){
        return res.render('register')
    }
    static async registerPost(req, res){
        const { name, email, password } = req.body

        const checkIfUserExists = await User.findOne({where: { email: email }})
        
        if(checkIfUserExists){
            req.flash('message', "O email está em uso!")
            res.redirect('/')
            return
        }

        const user = {
            name,
            email,
            password
        }

        try {
            const createdUser =  await User.create(user)

            req.session.userId = createdUser.id

            req.flash('message', "Usuário cadastrado com sucesso")

            req.session.save(() => {
                res.redirect('/')
            })
        } catch (error) {
            console.log(error)
        }
    }
    static async login(req, res){
        return res.render('login')
    }
    static async loginPost(req, res){
        const { email, password } = req.body
        const user = await User.findOne({ where: { email: email } })

        if(user.password != password){
            req.flash('message', 'Senha incorreta')
            res.redirect('/')
            return
        }

        try {
            req.session.userId = user.id

            req.flash('message', 'Login realizado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })
        } catch (error) {
            console.log(error)
        }
    }
    static async logout(req, res){
        req.session.destroy()
        res.redirect('/')
    }
}
