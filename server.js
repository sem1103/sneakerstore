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
