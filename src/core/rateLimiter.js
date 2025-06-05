const rateLimitMap = new Map();

function isRateLimited(ip, limit = 5, windowMs = 60000) {
  const now = Date.now();
  if (!rateLimitMap.has(ip)) rateLimitMap.set(ip, []);
  const timestamps = rateLimitMap.get(ip).filter(ts => now - ts < windowMs);
  if (timestamps.length >= limit) return true;
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return false;
}

module.exports = isRateLimited;
