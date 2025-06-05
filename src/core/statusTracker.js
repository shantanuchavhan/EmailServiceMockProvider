const statusMap = new Map();

function updateStatus(key, status) {
  statusMap.set(key, status);
}

function getStatus(key) {
  return statusMap.get(key);
}

module.exports = { updateStatus, getStatus };
