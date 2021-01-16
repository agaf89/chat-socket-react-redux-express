const {Router} = require('express')
const crypto = require('crypto')
const router = Router()
const {check, validationResult} = require('express-validator')
const nodemailer = require('nodemailer')
const resetEmail = require('../emails/reset')
const sendgrid = require('nodemailer-sendgrid-transport')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const transporter = nodemailer.createTransport(sendgrid({
    auth: {api_key: config.get('api_sendgrid')}
}))

router.post('',
[
    check('email', 'Введите корректный email').isEmail()
], 
 (req, res)=> {
    console.log(req.body)
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty){
            return res.status(400).json({
                errors: errors.array(),
                message: errors.errors[0].msg
            })
        }
        const {email} = req.body
        crypto.randomBytes(32, async(err, buffer)=>{
            if (err){
                return res.status(400).json({message: 'Что-то пошло не так повторите попытку позже'})
            }
            const token = buffer.toString('hex')
            const candidate = await User.findOne({email})
            if(candidate){
                candidate.resetToken = token
                candidate.resetTokenExp = Date.now() + 3600 * 1000 //время жизни токена
                await candidate.save()
                await transporter.sendMail(resetEmail(candidate.email, token))
                res.status(200).json({message: 'Письмо отправлено'})
            } else {
                return res.status(400).json({message: 'Такого пользователя не существует'})
            }
        })

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})
router.post('/:token',
[
    check('email', 'Введите корректный email').isEmail(),
    check('password', 'Минимальная длина пароля 5 символов').isLength({min: 5})
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
        if (!req.params.token){
            return res.status(400).json({message: 'Ваша ссылка недействительна'})
        }
        const user = await User.findOne({
            email: req.body.email,
            resetToken: req.params.token,
            resetTokenExp: {$gt: Date.now()}
        })
        if (!user){
            return res.status(400).json({message: 'Истекло время восстановления доступа. Повторите попытку'})
        } else {
            user.password = await bcrypt.hash(req.body.password, 10)
            user.resetToken = undefined
            user.resetTokenExp = undefined
            await user.save()
            const token = jwt.sign(
                {userId: user.id, nameUser: user.nameUser},
                config.get('jwtSecret'),
                {expiresIn: '5h'}
            )
            res.json({ token, userId: user.id, message: 'Вы успешно авторизовались' })
        }

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router