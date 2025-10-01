const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'items.json');

// Read all items
function getAllItems() {
  const data = fs.readFileSync(dataFile);
  return JSON.parse(data);
}

// Get one item by ID
function getItemById(id) {
  const items = getAllItems();
  return items.find(item => item.id === id);
}

// Create new item
function createItem(newItem) {
  const items = getAllItems();
  items.push(newItem);
  fs.writeFileSync(dataFile, JSON.stringify(items, null, 2));
  return newItem;
}

// Update item
function updateItem(id, updatedItem) {
  let items = getAllItems();
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...updatedItem };
  fs.writeFileSync(dataFile, JSON.stringify(items, null, 2));
  return items[index];
}

// Delete item
function deleteItem(id) {
  let items = getAllItems();
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return null;
  const deleted = items.splice(index, 1);
  fs.writeFileSync(dataFile, JSON.stringify(items, null, 2));
  return deleted[0];
}

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
};
