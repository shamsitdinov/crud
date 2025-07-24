import TelegramBot from "node-telegram-bot-api";
import "dotenv/config"

const TOKEN = "7948844608:AAGd3to_W25RLmdtaP3BkQIG_u0VO2mClJM"

const bot = new TelegramBot(TOKEN, { polling: true })

bot.setMyCommands([
    { command: "/start", description: "Boshlash" },
    { command: "/uz", description: "O'zbekcha" },
    { command: "/ru", description: "Русский" },
])


export const startBot = () => {
    bot.on("message", (msg) => {
        const text = msg.text
        const chatId = msg.chat.id

        if (text === "/start") {
            bot.sendMessage(chatId, "Assalomu alaykum! Bu Core Energy jamoasi uchun ishchi bot")
            bot.sendMessage(chatId, "Iltimos, tilni tanlang")
        }



    })
}
