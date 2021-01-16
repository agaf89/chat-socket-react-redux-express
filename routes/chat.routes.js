const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const Message = require('../models/Message')
const User = require('../models/User')
const config = require('config')
const PrivateChat = require('../models/PrivateChat')



router.get('/ID/:id', auth, async (req,res)=> {
    try {
        const data = await User.findById({_id:req.params.id})
        const private = await PrivateChat.find({senders: {$all: [req.params.id, req.user.userId]}})
       
        return res.status(200).json({data, private})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
    
})
router.get('/posts', auth, async (req, res)=> {
    try {
        const a = await Message.find().populate('owner')
        
        return res.status(200).json(a)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})
router.get('/chat', auth, async (req, res)=> {
    try {
        const data = await PrivateChat.find({senders: {$all: [req.user.userId]}})
        return res.status(200).json(data)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})
router.post('/remove', async (req, res)=> {
    try {
        const data = await PrivateChat.deleteMany({senders: {$all: [req.body.to,req.body.from ]}})
        
        return res.status(200).json({message: 'Успех'})
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router