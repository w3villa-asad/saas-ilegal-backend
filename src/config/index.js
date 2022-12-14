require('dotenv').config(); // this is important!

module.exports = {
    targetEnv: process.env.TARGET_ENV || process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    // jwtSecret: process.env.JWT_SECRET || 'secret',

    // Database
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        username: process.env.DB_USER || 'toor',
        password: process.env.DB_PASS || 'toor',
        name: process.env.DB_NAME || 'ilegal'
    },

    // Mail, SMTP
    mail: {
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
        from: process.env.MAIL_FROM || 'matevosyansevak29@gmail.com',
        bcc: process.env.MAIL_BCC || 'admin@gmail.com',
        contact: process.env.MAIL_CONTACT || 'demo@admin.com',
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        api_token: process.env.MAILTRAP_API_TOKEN
    },

    // Front
    frontUrl: process.env.FRONT_URL || 'localhost',
    shortenerUrl: process.env.SHORTENER_URL || 'localhost',

    // Back
    BackUrl: process.env.BACKEND_URL || 'localhost',

    contracts:{
        QANOON_TOKEN_ADD: "0x7ef271C4A0C41080f214d801521d1E3B7DcAe144",
        QANOON_ASASI_ADD: "0x62c6C7565685B2eb1bf9aC004dDD652821115caB",
        QANOON_REWARDS_ADD: "0xe491AA19c2C478D08eea25Cbf62FE90B714a8CFD",
        QANOON_PLUS_ADD: "0x588ba925417AEae94005b5D3bd859ADacd0ac5ab",
        QANOON_PREMIUM_ADD: "0xCA8FaB902d336B0f78E1bC38de7B791240E42bbb", 
        QANOON_COMPLEMENTARY_ADD: "0x5D7dBdE67DaEbC8C924A1F8A74d59BaFFe859ec8",
        QANOON_DOCUMENT_FACTORY_ADD: "0xbC90A94694d0e9Fe228a72fd15c2C390C7cdbDf3",
    },
}