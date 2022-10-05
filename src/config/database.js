require('dotenv').config(); // this is important!

module.exports = {
    targetEnv: process.env.TARGET_ENV || process.env.NODE_ENV,
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'secret',

    // Database
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        username: process.env.DB_USER || 'toor',
        password: process.env.DB_PASS || 'toor',
        name: process.env.DB_NAME || 'ilegal'
    },

    // Back
    BackUrl: process.env.BACKEND_URL || 'localhost',

    contracts:{
        // QANOON_NFT_TOKEN_ADD : "0x1De859f319beDd3d6fA0a349FF28d199676df493",
        // QANOON_TOKEN_ADD: "0x7Af5B74dFD15be82f76AF665624eBCFb239d5BC9",
        // QANOON_SWAPPER_ADD: "0xd27eAa795445e3738EDEc6f5a795082C35f19425",
        // QANOON_NFT_AUCTION_ADD: "0x6a93eFBf1879669056e4D3442Bc013f3fd1f994c",
        // QANOON_ITEM_AUCTION_ADD: "0xEe924d4E1fC4dCA08b835e32F4fd600F67864c7b",
        // QANOON_DIRECT_ITEM_SALE_ADD: "0xBDcc15c3Fa2509B6AC78228c90d26901057eacd6",
        // QANOON_DIRECT_NFT_SALE_ADD: "0xcAF3124b2f1Af156f08F8896274f22111678e776",
    },
}