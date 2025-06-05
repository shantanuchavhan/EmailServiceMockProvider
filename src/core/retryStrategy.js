async function retry(fn, maxRetries = 3, baseDelay = 200) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === maxRetries) throw err;
      await new Promise(res => setTimeout(res, baseDelay * Math.pow(2, attempt)));
    }
  }
}
module.exports = retry;
