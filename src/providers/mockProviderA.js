module.exports = {
  send: async (email) => {
    if (Math.random() > 0.3) return true;
    throw new Error('MockProviderA failed');
  }
};


// src/providers/providerA.js
// module.exports = {
//   send: async () => {
//     throw new Error('Forced failure from ProviderA');
//   }
// };


// src/providers/mockProviderA.js
// let callCount = 0;

// async function send(email) {
//   callCount++;
//   if (callCount < 3) {
//     console.log(`[mockProviderA] Fail attempt #${callCount}`);
//     throw new Error('Temporary failure from ProviderA');
//   }
//   console.log(`[mockProviderA] Success attempt #${callCount}`);
//   return true;
// }

// module.exports = { send };

