function createCircuitBreaker(name, failureThreshold = 3, cooldown = 10000) {
  let failures = 0, lastFailureTime = null, state = 'CLOSED';

  return {
    name,
    async exec(fn) {
      const now = Date.now();
      if (state === 'OPEN' && now - lastFailureTime < cooldown) {
        throw new Error(`${name} is in OPEN state`);
      }

      try {
        const result = await fn();
        failures = 0;
        state = 'CLOSED';
        return result;
      } catch (err) {
        failures++;
        lastFailureTime = now;
        if (failures >= failureThreshold) state = 'OPEN';
        throw err;
      }
    }
  };
}

module.exports = createCircuitBreaker;
