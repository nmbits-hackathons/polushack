# polushack

ссылка на видео мобильного приложения - https://drive.google.com/file/d/1_7zA1CMQx0fBWiIxyTSpXUqbz2OANwvV/view?usp=sharing

В текущей конфигурации сервис обращается к бэкенд серверу расположенному по адресу http://45.67.228.220:8080/ , бэкенд будет доступен до 20:00, 


команды для запуска фронтенда

cd frontend

npm install

npm start





команды для запуска бэкенда - опционально , необходимо так же изменить адрес бэкенд сервера в конфигурационном файле frontend/ .env.production, чтобы взаимодействие
осуществлялось с локально запущенным бэкендом

cd backend

pip install -r requirements.txt

python3 main.py

