// بوت Abdo___HD🥷🔱 + sanfoura___HD🫦🦋 - نسخة خفيفة
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const P = require("pino")

const DEVS = ["212750649595","212641618268"]
const BAD_WORDS = ["قحبة","زامل","نيك","زبي","طبون","قحب"]
const LINKS = ["chat.whatsapp.com","wa.me"]

async function startBot(){
const { state, saveCreds } = await useMultiFileAuthState("./auth")
const sock = makeWASocket({
auth: state,
logger: P({ level: "silent" }),
printQRInTerminal: true,
browser: ["Abdo-Bot","Chrome","1.0"]
})

sock.ev.on("creds.update", saveCreds)

sock.ev.on("connection.update", (up)=>{
const { connection } = up
if(connection=="open"){ console.log("✅ Abdo___HD BOT خدام - QR تربط") }
})

sock.ev.on("messages.upsert", async (m)=>{
const msg = m.messages[0]
if(!msg.message) return
const from = msg.key.remoteJid
const sender = msg.key.participant || from
const senderNum = sender.split("@")[0]
const isDev = DEVS.includes(senderNum)

let text = msg.message.conversation || msg.message.extendedTextMessage?.text || ""
let low = text.toLowerCase()

// 1- يجاوب عربي
if(low=="بوت" || low=="bot" || low=="مرحبا abdo"){
await sock.sendMessage(from, { text: "مرحبا Abdo 🥷🔱 أنا خدام ✅\nالمطورين: Abdo___HD + sanfoura___HD🫦🦋" })
return
}

// 6- صورة المطور Abdo HD
if(low.includes("صورة المطور") || low.includes("abdo")){
try{
let pp = await sock.profilePictureUrl("212750649595@s.whatsapp.net", "image")
await sock.sendMessage(from, { image: { url: pp }, caption: "Abdo___HD🥷🔱\n0750649595" })
}catch{
await sock.sendMessage(from, { text: "Abdo___HD🥷🔱\n0750649595" })
}
return
}

// صورة المطورة sanfoura
if(low.includes("sanfoura")){
try{
let pp2 = await sock.profilePictureUrl("212641618268@s.whatsapp.net", "image")
await sock.sendMessage(from, { image: { url: pp2 }, caption: "sanfoura___HD🫦🦋\n0641618268" })
}catch{
await sock.sendMessage(from, { text: "sanfoura___HD🫦🦋\n0641618268" })
}
return
}

// أوامر المطورين فقط
if(isDev){
if(low=="صمت"){
await sock.groupSettingUpdate(from, "announcement")
await sock.sendMessage(from, { text: "🔒 صمت تفعل - Abdo HD" })
}
if(low=="اطلق" || low=="أطلق"){
await sock.groupSettingUpdate(from, "not_announcement")
await sock.sendMessage(from, { text: "🔓 اطلق - Abdo HD" })
}
if(text.startsWith("ضع في اسم بوت")){
let newName = text.split("ضع في اسم بوت")[1]
if(newName) await sock.groupUpdateSubject(from, newName.trim())
}
if(low.startsWith("تكتيم")){
let mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid
if(mentioned) await sock.sendMessage(from, { text: `تم تكتيم @${mentioned[0].split("@")[0]}`, mentions: mentioned })
}
}

// 3+7+8 - منع روابط + كلام خايب + ملصق
if(!from.endsWith("@g.us")) return
if(isDev) return

let isBad = BAD_WORDS.some(w=>low.includes(w))
let isLink = LINKS.some(l=>low.includes(l))
let isSticker = !!msg.message.stickerMessage

if(isBad || isLink || isSticker){
await sock.sendMessage(from, { delete: msg.key })
await sock.groupParticipantsUpdate(from, [sender], "remove")
await sock.sendMessage(from, { text: `تم طرد @${senderNum} ❌\nالسبب: رابط/كلام خايب/ملصق\nالمطور Abdo___HD🥷🔱`, mentions: [sender] })
}
})

}

startBot()
