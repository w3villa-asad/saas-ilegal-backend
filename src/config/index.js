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
        QANOON_NFT_TOKEN_ADD :"",
        QANOON_TOKEN_ADD: "0x7ef271C4A0C41080f214d801521d1E3B7DcAe144",
        QANOON_SWAPPER_ADD: "",
        QANOON_NFT_AUCTION_ADD: "",
        QANOON_ITEM_AUCTION_ADD: "",
        QANOON_DIRECT_ITEM_SALE_ADD: "", 
        QANOON_DIRECT_NFT_SALE_ADD: "",
    },
}