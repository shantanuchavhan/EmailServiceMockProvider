// src/core/circuitBreaker.js
function createCircuitBreaker(name, failureThreshold = 3, cooldown = 10000) {
  let failures = 0, lastFailureTime = null, state = 'CLOSED';

  return {
    name,
    async exec(fn) {
      const now = Date.now();

      if (state === 'OPEN' && now - lastFailureTime < cooldown) {
        console.log(`[CIRCUIT] ${name} is OPEN. Skipping call.`);
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
        if (failures >= failureThreshold) {
          state = 'OPEN';
          console.log(`[CIRCUIT] ${name} has entered OPEN state.`);
        }
        throw err;
      }
    }
  };
}

module.exports = createCircuitBreaker;
