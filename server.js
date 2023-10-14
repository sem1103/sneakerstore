const http = require('http');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Обработчик для PUT-запросов на корневом ресурсе /cartItems
server.put('/cartItems', (req, res, next) => {
  const updatedData = req.body; // Данные, которые пришли в теле PUT-запроса

  router.db.set('cartItems', updatedData).write();

  res.json('Данные успешно обновлены');
});

server.use(router);

const httpServer = http.createServer(server);

httpServer.listen(4004, () => {
  console.log('JSON-Server запущен на порту 4004');
});

// Таймер для отправки "keep-alive" запросов каждые 15 минут
setInterval(() => {
  // Создайте HTTP-клиент для отправки запроса "keep-alive"
  const options = {
    hostname: 'localhost', // Замените на нужный хост
    port: 4004, // Порт вашего сервера
    path: '/keep-alive', // Путь "keep-alive" эндпоинта
    method: 'GET', // GET-запрос для "keep-alive"
  };

  const req = http.request(options, (res) => {
    console.log(`Запрос "keep-alive" выполнен: ${res.statusCode}`);
  });

  req.on('error', (error) => {
    console.error(`Ошибка при выполнении запроса "keep-alive": ${error.message}`);
  });

  req.end();
},5 * 60 * 1000); 
