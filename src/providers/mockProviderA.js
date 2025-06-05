module.exports = {
  send: async (email) => {
    if (Math.random() > 0.3) return true;
    throw new Error('MockProviderA failed');
  }
};
