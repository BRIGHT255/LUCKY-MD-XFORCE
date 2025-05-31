const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0ZSVlRKNHdjQXBOR1ZHaUVLUWMvTng5QktwZ0I4NW1KSHdERFJ6R1NHOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNk8xK2hzTGtBZnpvbWhKeUtUbmpyNEE0L3FpZGc0WW1abERvaVpUN0YxQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpSkRCR3hINGFaWm9PeDlpb3VPbGxTWjc2NzMvSHZyU3pjTkpsbUkxelZrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJSckwvQWRkRlpVMUpkUHU2TnVNZzJvMk03bmZtbzlLTDJ1ZGZuSm9sZXlZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVFRkhralBqVEllZ2cvc2d6b3dyUHdDTC9uWXBLa3h6MllSd09zOFJRM3M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1WeEZlb2Y0UDVYRWJFV0JFQWd2SmRJaDVlek5BS29zRExNYllZZE5BMTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUNwdkRXblk5WlJ5d2tlUmo4K0lkNGFwSVVGOEovS29CK0NkUVFsY0VHdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1Vsajd0c04yRlV0cEU3Ly9DVjNFUjhSNW13TTNrSkc3Mm5sN2RJcmJHST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImppQXhuOUxhNCtEbVN5bTk5YVlNOEpyWlZleEJEWTBidVZDeElURG12Ym56UXZ0aDNYYThlNHFWcVhacUY1bHdRQUpvNnVqYi9rdk1RUGpsZUF3T0FRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODUsImFkdlNlY3JldEtleSI6Ik95cGpxdk9BSExKZTF2cW4yeVBxemNGTGdmZU9oUkMwQktSbnhLeW5sdHc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjJiR3FIZEZNUUdTdzk4Z0t2TEZhOFEiLCJwaG9uZUlkIjoiMmM4Mzc5MTEtNDM0ZS00ZjU2LWIwOTItZjFjNmJlNzBlZjI0IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1LNjJOMThZekM1a1NiRSt3cTF1ckFraXZXST0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEU0ZmZjZhdldacVQ3RDJyazc2QVhvdk9xL2M9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRlJFREVaUkEiLCJtZSI6eyJpZCI6IjI2MzcxMjE5MjM3ODoxOEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJjaGlub3ppYnJpZ2h0MjYyIiwibGlkIjoiNTUxMDUwMTc2MjY2NjY6MThAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLaVo4NW9IRU11cjZzRUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJXcXZpRlFqVWNoa0NDcmU5Tkp2NjNoa0Nyc3JNblN1YUliVE1meDdlbkEwPSIsImFjY291bnRTaWduYXR1cmUiOiJMN1hpK0FPL3ZSQk9qVzhtV1lkaFQ5dDFWWkJuVDRQcm1kZXpHMzFlQlJDaDFIUXZYaUxBMG85MnYxVW9FSDExQlNubEFXbHhtaXFyTmtWWENLbFdDUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQ1JISEx5NkwrSkhwNWdmNGU5Z1QzYzVNbUYvYUtOd3NTWURiQWpzb2FENzJEUmxnL0xaNjBSdkRPMVFla3ZTVFhpdklrSlZhYVBySU1jazJUQ0VRQkE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3MTIxOTIzNzg6MThAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVnFyNGhVSTFISVpBZ3EzdlRTYit0NFpBcTdLekowcm1pRzB6SDhlM3B3TiJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ4NjY5OTEyLCJsYXN0UHJvcEhhc2giOiJubTNCYiJ9',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/mr-X-force/LUCKY-MD-XFORCE',
    OWNER_NAME : process.env.OWNER_NAME || "Bright",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "0712192378",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "hes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
    URL: process.env.URL || "https://files.catbox.moe/uw4l17.jpeg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/3o37c5.jpeg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'yes', 
    GCF: process.env.GROUP_HANDLE || 'yes', 
    AUTO_REPLY : process.env.AUTO_REPLY || "yes", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By ☢️LUCKY-MD-XFORCE☢️',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'yes',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "☢️LUCKY-MD-XFORCE☢️",
    BOT : process.env.BOT_NAME || '☢️LUCKY-MD-XFORCE☢️⁠',
    MODE: process.env.PUBLIC_MODE || "yes",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dar_Es_Salam", 
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    FREDI_DELETE : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
