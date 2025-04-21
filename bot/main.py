from aiogram import Dispatcher
import asyncio
from handlers import rt
from aiogram import Bot
from config import settings

dp = Dispatcher()

dp.include_router(rt)
BOT = Bot(token='7800546097:AAHFW0NFj4y8zchCI_DcSvt3ICnUTFBYBwg')

async def main():
    await dp.start_polling(BOT)
    
if __name__ == '__main__':
    asyncio.run(main())