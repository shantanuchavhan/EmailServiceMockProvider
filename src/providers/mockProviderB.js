module.exports = {
  send: async (email) => {
    if (Math.random() > 0.2) return true;
    throw new Error('MockProviderB failed');
  }
};
