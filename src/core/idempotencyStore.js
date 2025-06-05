const store = new Set();

function isDuplicate(key) {

  return store.has(key);
}

function storeKey(key) {
  store.add(key);
}

module.exports = { isDuplicate, storeKey };
