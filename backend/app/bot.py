from aiogram import Dispatcher
import asyncio
from aiogram import Bot
from data import settings
from app.models import *

dp = Dispatcher()

bot = Bot(token=settings.TOKEN)
ADMIN_CHAT_ID = settings.ADMIN_CHAT_ID

async def main():
    await dp.start_polling(bot)
    
def format_message(message: User_info) -> str:
    pass

async def send_message_to_moderation(message: User_info):
    await bot.send_message(ADMIN_CHAT_ID, format_message(message))
    
if __name__ == '__main__':
    asyncio.run(main())