# Вот как можно выполнить аналогичный POST-запрос к API ImgBB с использованием библиотеки `requests` в Python:

### Python-код для загрузки изображения на ImgBB


# url = "https://api.imgbb.com/1/upload"
# api_key = "YOUR_CLIENT_API_KEY"  # Замените на ваш ключ
# expiration = 600  # Время жизни изображения в секундах (10 минут)

# # Открываем файл изображения в бинарном режиме
# with open("image.png", "rb") as file:
#     files = {"image": file}
#     params = {
#         "expiration": expiration,
#         "key": api_key
#     }
#     response = requests.post(url, files=files, params=params)

# # Проверяем ответ
# if response.status_code == 200:
#     print("Изображение успешно загружено!")
#     print("URL:", response.json()["data"]["url"])
# else:
#     print("Ошибка:", response.status_code, response.text)

# ### Пояснения:
# 1. `files={"image": file}` – передача файла в виде multipart/form-data.
# 2. `params` – GET-параметры (expiration и key).
# 3. `response.json()` – разбор JSON-ответа от сервера.

# ### Пример ответа ImgBB (JSON):
# {
#     "data": {
#         "url": "https://i.ibb.co/abc123/image.png",
#         "delete_url": "https://imgbb.com/delete/abc123"
#     },
#     "success": true,
#     "status": 200
# }

# ### Дополнительно:
# # - Если нужно закодировать изображение в Base64, можно использовать:
# import base64

# with open("image.png", "rb") as file:
#     image_base64 = base64.b64encode(file.read()).decode("utf-8")

# payload = {
#     "key": api_key,
#     "image": image_base64,
#     "expiration": expiration
# }

# response = requests.post(url, data=payload)
  

