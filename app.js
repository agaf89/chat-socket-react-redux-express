const express = require('express');
const config = require('config');
const path = require('path')
const mongoose = require('mongoose');
const app = express();
const Message = require ('./models/Message')
const server = require('http').Server(app);
const jwt = require ('jsonwebtoken')
const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });
const cors = require('cors');
const User = require('./models/User');
const PrivateChat = require('./models/PrivateChat');
app.use(cors({
    origin: true,
    credentials: true
}));
module.exports = io;




app.use(express.json({extended : true}))//чтобы нода могла парсить жсон с фронта
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/chat', require('./routes/chat.routes'));
app.use('/reset', require('./routes/reset.routes'));
if (process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'my-app', 'build')))
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

let Users = []
  
io.on('connection', (socket) => {
    const dataUser = JSON.parse(socket.handshake.query.auth)
    console.log('!!@@##',dataUser)
    const candidate = Users.find( user => {
        return user.socketID === socket.id
    })
    console.log(dataUser)
    if ( dataUser || !candidate){
        socket.on('usersInfo', async data => {
            
            try {
                
                if ( data ){
                    console.log(data)
                    const decoded = jwt.verify(data, config.get('jwtSecret'))
                    const user = await User.findById({_id:decoded.userId})
                    const check = Users.find( user => {
                        return user.id === decoded.userId
                    })
                    !check && Users.push({
                        user: user.nameUser,
                        email: user.email,
                        socketID: socket.id,
                        id: decoded.userId
                    })
                    Users.forEach ( item => {
                        if (item.id !== decoded.userId) {
                            io.to(`${item.socketID}`).emit('broadcast', {newUser: user.nameUser});
                        }
                    })
                    io.emit('usersInfo', {count: Users.length, Users})
                } 
            } catch (e) {
                const candidate = Users.findIndex( e => {
                    return e.socketID === socket.id
                })
                Users.splice(candidate, 1)
                socket.emit(`error', 'Отправка сообщений невозможна, пожалуйста, авторизуйтесь повторно` )
            }
        })
    }
    socket.on('postMessage', async (data)=> {
        try {
            const decoded = jwt.verify(data.token, config.get('jwtSecret'))
            const message = new Message (
                {
                    message: data.value,
                    date: new Date().toLocaleTimeString(),
                    owner: {_id:decoded.userId, userName: decoded.nameUser}
                }
            )
            message.save().then( res =>{
                io.emit('postMessage', {
                    message: res.message,
                    date: res.date,
                    id: Date.now(),
                    owner: {_id:decoded.userId, nameUser: decoded.nameUser }
                })
            }).catch (e => console.log('Ошибка авторизации токена', e))
        } catch (e) {
            const candidate = Users.findIndex( e => e.socketID === socket.id)
            Users.splice(candidate, 1)
            socket.emit('error', 'Отправка сообщений невозможна, пожалуйста авторизуйтесь повторно')
        }
    })
    socket.on('writeText', data => {
        const decoded = jwt.verify(data, config.get('jwtSecret'))
        
        socket.broadcast.emit('writeText', decoded)
    })
    socket.on('privateMessage', async (data)=> {
        try {
            const decoded = jwt.verify(data.token, config.get('jwtSecret'))
            const recipient = Users.find( e => e.id === data.privateID)
            
            const from = Users.find( e => e.id === decoded.userId)
            
            
            const newPrivatMessage = new PrivateChat ({
                senders: [decoded.userId, data.privateID],
                owner: decoded.userId,
                nameUser: from.user,
                date: new Date().toLocaleTimeString(),
                idForReact: Date.now(),
                message: data.message
            })

            await newPrivatMessage.save().then( e => {
                const responseForClient = ( socket ) => {
                    io.to(`${socket}`).emit('privateMessage', {
                        message: data.message,
                        date: new Date().toLocaleTimeString(),
                        idForReact: Date.now(),
                        owner: decoded.userId,
                        nameUser: from.user
                    })
                }
                responseForClient(recipient.socketID)
                responseForClient(from.socketID)
                console.log('!!@#$%',recipient.socketID)
            }).catch( e => console.log(e, 'privateMessage'))
                
        } catch (e) {
            const candidate = Users.findIndex( e => e.socketID === socket.id)
            Users.splice(candidate, 1)
            socket.emit('error', 'Отправка сообщений невозможна, пожалуйста авторизуйтесь повторно')
        }
    })
    
    socket.on('disconnect', e => {
        
            const candidate = Users.findIndex( e => e.socketID === socket.id)
            if(candidate !== -1){
                console.log(candidate)
                Users.splice(candidate, 1)
                io.emit('usersInfo', {count: Users.length, Users})
                console.log('user disconetced ', socket.id, e)
            }
            
        
        
    })
})
const PORT = config.get('port') || 5000;

async function start(){
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        server.listen(PORT, ()=> {
            console.log(`Server has been started on port ${PORT}`)
        })
    } catch (e) {
        console.log('Server Error ', e.message)
        process.exit(1)
    }
}
start();
