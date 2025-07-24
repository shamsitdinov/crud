import express from "express"
import TelegramBot from "node-telegram-bot-api";

const app = express()
const TOKEN = "7948844608:AAGd3to_W25RLmdtaP3BkQIG_u0VO2mClJM"

const bot = new TelegramBot(TOKEN, { polling: true })

bot.setMyCommands([
    { command: "/start", description: "Boshlash" }
])

app.get("/ping",(req,res)=>{
    res.send("Bot ishladi !")
})

const opts = {
    reply_markup: {
        keyboard: [
            [{ text: "Русский", callback_data: "ruski" }, { text: "O'zbekcha", callback_data: "uzbek" }]
        ], resize_keyboard: true,
        one_time_keyboard: true
    }
}
const menyu = {
    reply_markup: {
        keyboard: [
            [{ text: "Ishda", callback_data: "ishda" }, { text: "Kechikdim", callback_data: "kechikdim" },],
            [{ text: "Ob'ektda", callback_data: "obyektda" }, { text: "Hisobot", callback_data: "hisobot" }]
        ],
        resize_keyboard: true,
        one_time_keyboard: true
    }
}


bot.on("message", async (msg) => {
    const text = msg.text
    const chatId = msg.chat.id


    if (text === "/start") {
        await bot.sendMessage(chatId, "Assalomu alaykum! Bu Core Energy jamoasi uchun ishchi bot")
        await bot.sendMessage(chatId, "Iltimos, tilni tanlang", opts)
    }
    if (text === "O'zbekcha") {
        await bot.sendMessage(chatId, "Siz o'zbek tilni tanladingiz.",)
        bot.sendMessage(chatId, "Asosiy menyuni tanlang :", menyu)
    }
    if (text === 'Русский') {
        bot.sendMessage(chatId, "Вы выбрали узбекский язык.")
    }
    if (text === 'Ishda') {
        bot.sendMessage(chatId, "Siz ishda deb belgiladingiz.Rahmad")
    }
    if (text === "Ob'ektda") {
        bot.sendMessage(chatId, "Ob'ektda ishlayotganingiz belgilandi")
    }
    if (text === 'Kechikdim') {
        bot.sendMessage(chatId, "Siz kechikdim deb belgiladingiz")
    }
    if (text === 'Hisobot') {
        bot.sendMessage(chatId, ` 
         Iltimos bugungi ish haqida qisqacha hisobot yuboring:
        - Qayerda ishladingiz ?
        - Nima bajardingiz ?
        -Rasim (agar bo'lsa) ilova qiling`)
        bot.once("message", reply => {
            if (reply.chat.id === chatId && reply.text !== '/start') {
                bot.sendMessage(chatId, `Rahmat! ${reply.chat.username}`);
            }
        })
    }

})

app.listen(4100, () => console.log("Server is running")) 