const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()
const nodemailer = require('nodemailer')
const regEmail = require('../emails/regiser')
const sendgrid = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(sendgrid({
    auth: {api_key: config.get('api_sendgrid')}
}))


router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 5 символов').isLength({min: 5}),
        check('nameUser', 'Минимальная длина имени 3 символа').isLength({min: 3})
            
    ], 
    async (req, res)=> {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            console.log(errors.errors)
            return res.status(400).json({
                errors: errors.array(),
                message: errors.errors[0].msg
            })
        }
        
        const {email, nameUser, password } = req.body
        console.log(email, nameUser, password)
        const candidate = await User.findOne({email})
        if (candidate){
            return res.status(400).json({message: 'Такой пользователь уже существует. Авторизуйтесь'})
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword, nameUser})
        await user.save()
        res.status(201).json({message: `Пользователь создан. ${nameUser}`})
        console.log(regEmail(email))
        await transporter.sendMail(regEmail(email)).then(e => console.log(e)).catch(e => console.log(e))

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})


router.post('/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ], 
    async (req, res)=> {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty){
                return res.status(400).json({
                    errors: errors.array(),
                    message: errors.errors[0].msg
                })
            }
            const {email, password } = req.body
            const user = await User.findOne({email})
            if (!user){
                return res.status(400).json({message: 'Пользователь не найден'})
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({message: 'Неверный пароль, попробуйте снова'})
            }
            const token = jwt.sign(
                {userId: user.id, nameUser: user.nameUser},
                config.get('jwtSecret'),
                {expiresIn: '5h'}
            )
            res.json({ token, userId: user.id, message: 'Вы успешно авторизовались' })

    
        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
})


module.exports = router