const config = require('config')

module.exports = function (to){
    return {
        to: to,
            from: '',
            subject: `Аккаунт создан`,
            html: `
                <h1>Добро пожаловать в мой чат Socket.IO</h1>
                <p>Вы успешно создали аккаунт для почты ${to}</p>
                <hr/>
                <a href="${config.get('baseUri')}">Чат на сокетах</a>
            `
    }
}