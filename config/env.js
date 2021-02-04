const CONFIG = {
    CLIENT_PORT: 3000,
    SERVER_PORT: 4000,
    DB_CONNECTION_URI: 'mongodb+srv://{DB_USERNAME}:{DB_USER_PASSWORD}@cluster0.abcdef.mongodb.net/{COLLECTION NAME}?retryWrites=true&w=majority',
    SIMPLYRETS_API: '',
    SIMPLYRETS_API_CREDENTIALS: {
        USER: '',
        TOKEN: ''
    },
    SECURITY: {
        PASSWORD_SALT_LENGTH: 16,
        PASSWORD_SALT: '',
        AUTH_TOKEN_PRIVATE_KEY: 'D(yMp)$LCcG37yof7R?Mcv3BmoXdCAdjcMGq.Eeei='
    }
}

module.exports = CONFIG
