from aiogram import Dispatcher, F
import asyncio
from aiogram import Bot
from data import settings
from app.models import User_info
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, CallbackQuery, InputMediaPhoto
from aiogram.filters.callback_data import CallbackData
from data import Orm
dp = Dispatcher()

print(settings.TOKEN)
bot = Bot(token=settings.TOKEN)
ADMIN_CHAT_ID = settings.ADMIN_CHAT_ID


class User(CallbackData, prefix='user'):
    action: str
    p_id: str


async def main():
    await dp.start_polling(bot)


def format_message(message: User_info) -> str:
    print(message)
    res_text = (
        f'''
Имя: {message.name}
Биография: {message.biography}
Награды: {''.join([reward.name + ', ' for reward in message.rewards])}
===ИНФОРМАЦИЯ===
{''.join([f'Год: {info.year.value}, место: {info.location}, история: {info.story}\n' for info in message.years])}
'''
    )
    images = []
    if message.avatar is not None:
        for img in message.avatar:
            if img != '':
                images.append(img)
    print(images)
    for info in message.years:
        if info.images != []:
            for elem in info.images:
                if elem is not None:
                    images.append(elem)
    return res_text, images


async def send_to_moderation(message: User_info):
    # prit(message)
    print(message)
    message = User_info(**message)
    u_id = message.id
    message, images = format_message(message)
    if images:
        print(images)
        media_group = [InputMediaPhoto(media=image) for image in images]
        await bot.send_media_group(ADMIN_CHAT_ID, media=media_group)
    print(images)
    
    await bot.send_message(ADMIN_CHAT_ID, message, reply_markup=InlineKeyboardMarkup(inline_keyboard=[
        [
            InlineKeyboardButton(text='Подтвердить', callback_data=User(action='confirm', p_id=u_id).pack()),
            InlineKeyboardButton(text='Отклонить', callback_data=User(action='reject', p_id=u_id).pack())
        ]
    ]))


@dp.callback_query(User.filter(F.action == 'confirm'))
async def confirm(callback: CallbackQuery, callback_data: User):
    await callback.message.edit_text(text=callback.message.text + '\n✅ Подтверждено', reply_markup=None)
    print(callback_data.p_id)
    await Orm.confirm_person(callback_data.p_id)
    await callback.answer()


@dp.callback_query(User.filter(F.action == 'reject'))
async def reject(callback: CallbackQuery, callback_data: User):
    await callback.message.edit_text(text=callback.message.text + '\n❌ Отклонено')
    await callback.answer()
    await Orm.reject_person(callback_data.p_id)


if __name__ == '__main__':
    asyncio.run(main())
