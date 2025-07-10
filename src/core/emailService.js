// src/core/emailService.js
const providerA = require('../providers/mockProviderA');
const providerB = require('../providers/mockProviderB');
const retry = require('./retryStrategy');
const { breakerA, breakerB } = require('./breakerManager');
const { isDuplicate, storeKey } = require('./idempotencyStore');
const { updateStatus, getStatus } = require('./statusTracker');
const { log } = require('../utils/logger');

async function sendEmail(email, idempotencyKey) {
  if (isDuplicate(idempotencyKey)) {
    log('INFO', 'Duplicate request');
    updateStatus(idempotencyKey, 'DUPLICATE');
    return;
  }

  try {
    await retry(() => breakerA.exec(() => providerA.send(email)));
    log('INFO', 'Email sent using ProviderA');
    updateStatus(idempotencyKey, 'SENT_PROVIDER_A');
  } catch (errA) {
    log('WARN', 'ProviderA failed. Trying ProviderB...');
    try {
      await retry(() => breakerB.exec(() => providerB.send(email)));
      log('INFO', 'Email sent using ProviderB');
      updateStatus(idempotencyKey, 'SENT_PROVIDER_B');
    } catch (errB) {
      log('ERROR', 'Both providers failed');
      updateStatus(idempotencyKey, 'FAILED');
      throw new Error('Both providers failed');
    }
  }

  storeKey(idempotencyKey);
}

module.exports = { sendEmail, getStatus };
