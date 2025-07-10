const createCircuitBreaker = require('./circuitBreaker');

const breakerA = createCircuitBreaker('ProviderA');
const breakerB = createCircuitBreaker('ProviderB');

module.exports = { breakerA, breakerB };
