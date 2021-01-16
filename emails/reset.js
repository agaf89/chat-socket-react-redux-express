const config = require('config')

module.exports = function (to, token){
    return {
        to: to,
            from: '',
            subject: `Восстановление доступа`,
            html: `
                <h1>Вы забыли пароль?</h1>
                <p>Если нет, то проигнорируйте это письмо</p>
                <p>Иначе нажмите на ссылку ниже</p>
                <p><a href='${config.get('baseUri')}/reset/${token}'>Восстановить доступ</a></p>
                <hr/>
                <a href="${config.get('baseUri')}">Чат на сокетах</a>
            `
    }
}