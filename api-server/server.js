const http = require('http');
const { getAllItems, getItemById, createItem, updateItem, deleteItem } = require('./inventory');

const PORT = 4000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && req.url === '/items') {
    return res.end(JSON.stringify({ success: true, data: getAllItems() }));
  }

  if (req.method === 'GET' && req.url.startsWith('/items/')) {
    const id = req.url.split('/')[2];
    const item = getItemById(id);
    if (!item) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ success: false, message: 'Item not found' }));
    }
    return res.end(JSON.stringify({ success: true, data: item }));
  }

  if (req.method === 'POST' && req.url === '/items') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const newItem = JSON.parse(body);
        const created = createItem(newItem);
        res.statusCode = 201;
        return res.end(JSON.stringify({ success: true, data: created }));
      } catch (err) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ success: false, message: 'Invalid data' }));
      }
    });
    return;
  }

  if (req.method === 'PUT' && req.url.startsWith('/items/')) {
    const id = req.url.split('/')[2];
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const updated = updateItem(id, JSON.parse(body));
        if (!updated) {
          res.statusCode = 404;
          return res.end(JSON.stringify({ success: false, message: 'Item not found' }));
        }
        return res.end(JSON.stringify({ success: true, data: updated }));
      } catch (err) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ success: false, message: 'Invalid data' }));
      }
    });
    return;
  }

  if (req.method === 'DELETE' && req.url.startsWith('/items/')) {
    const id = req.url.split('/')[2];
    const deleted = deleteItem(id);
    if (!deleted) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ success: false, message: 'Item not found' }));
    }
    return res.end(JSON.stringify({ success: true, data: deleted }));
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ success: false, message: 'Route not found' }));
});

server.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});

