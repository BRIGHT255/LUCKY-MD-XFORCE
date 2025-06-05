const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0w5Mks5RWZaamdzZWlOaWFsK2g4Zkk3YzA2NTlCRE1CVE4zVmxPNTNXND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVkwwOHlDTXdyWjdIN3VZQTQ3eUI2MHJuTXh3eWxwQ2dzSE1scEVnZEh4bz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpSDMyNE05UVo3TGNxdnhBcVVNNkdweVpPMk5XdUE0ZTNTNzE1YTJKZ0hvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHazhoZ2JhTURKR1NCWis5eTVkejJKN3FoRm1xclowYVE4NUZ4NkY1YVdnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZNOThobFZVMm9BMHpMRVlGTENhRE4rWFA4bDZ2M3VLaUFPVDlpTmxJVUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhScm45Y1YxdlNvblkvZjBNcjhIYUw4L3FtdGVjQnFZQXMzVXEwL3ExM2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0Z3Mzl0UWNJY2ljbm90THl5cjhqbmU5Q0JvQ2VSb1RyMjcvQWl1dlMwcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib1UzRjBuejF6M04wY2ttNDhFS1AwUStCRFduWlVRQnFqdjRmNklpZjMwQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlV4MXBJYzJ6V3BDTHpiNmxESWl2elZ4MWtFTkl2TU1scG9PcjZjWnlWTEx1VUFRS25tV1EzNnVYNWZCMEtyczFGRlVPS0ZLWENvMTUzYXdlaldNaEJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU5LCJhZHZTZWNyZXRLZXkiOiJpb2kyNERxMnVwNnVZRHI3UHJ5dzhCVlJ2L203NTI2c0s1Q25WL2FsbjQ0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2MzcxNjI2NTQ1MUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCQ0ExMjgzNzhGODEwNjFCMDcxRUY3M0FGQjczM0E0NCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5MTQ0NTMyfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3MTYyNjU0NTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiODU5MDY4NEY3N0M0MjBBNkM3RDc1OUQ3QjY3MzI3MTcifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0OTE0NDUzN31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiR2JNcUJueFRRSFdkOF9IcVJkYWlIUSIsInBob25lSWQiOiJlYTM3YzVkZi1hMzAzLTQyNWQtYmVlMy1iNTM5MzVmN2U0MTgiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRXhhejByTTVkTEYwOVRRUVcxeEJSL2lPdFc4PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9NZmJLOGIyMVA2U0N6YzFEb1p1UG9LWDhLMD0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJGUkVERVpSQSIsIm1lIjp7ImlkIjoiMjYzNzE2MjY1NDUxOjRAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIyOTQ0MjYyMTYwODA2Njo0QGxpZCIsIm5hbWUiOiJjaGlub3ppYnJpZ2h0MjYyIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLajMrSTBGRU1Pbmg4SUdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJobklvbDVzWmJISS85N2tNYmV1aDU2NHdNQ2NjV25IV0dCNVM0SWtWelVnPSIsImFjY291bnRTaWduYXR1cmUiOiJCM3BhWVpkZ3FxaXJRWWlvVXZKSkcxUitKSGxMRG9saHVLdjNoTFByc3FJUHRCMDNickFHUkJ4cjk4U291WW5iWnFCMUhkaFJPbmFpdmR2VDBFQjFBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiaHpPZkJrcU1JNDR0bnBqK0J1Zzl1Nkc5VjVtcUVtY2NYUnZNeEJrY3lzR2RlZ1d3T1ZoSGoyVERmUGJFTmFMUk1xRWNSU3VXTGxUS1lHUVhEODQ0QUE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3MTYyNjU0NTE6NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZWnlLSmViR1d4eVAvZTVERzNyb2VldU1EQW5IRnB4MWhnZVV1Q0pGYzFJIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQklJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDkxNDQ1MjksImxhc3RQcm9wSGFzaCI6Im5tM0JiIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFDcnEifQ==',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/mr-X-force/LUCKY-MD-XFORCE',
    OWNER_NAME : process.env.OWNER_NAME || "FrediEzra",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255752593977",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/uw4l17.jpeg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/3o37c5.jpeg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By LUCKY-MD-XFORCE',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "LUCKY-MD-XFORCE",
    BOT : process.env.BOT_NAME || 'LUCKY-MD-XFORCE',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Dodoma", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
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
