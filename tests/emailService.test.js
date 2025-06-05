const { sendEmail } = require('../src/core/emailService');

test('Send email does not throw', async () => {
  const email = {
    to: 'shantanuchavhan002@gmail.com',
    subject: 'Hello',
    body: 'Testing'
  };
  const key = 'test-key-001';
  await expect(sendEmail(email, key)).resolves.not.toThrow();
});


// test('Rate limiting enforced', async () => {
//   // Preload rateLimiter store
//   for (let i = 0; i < 5; i++) {
//     await sendEmail({ to: 't@example.com', subject: 'RL', body: 'Body' }, `key-${i}`);
//   }

//   await expect(sendEmail({ to: 't@example.com', subject: 'RL Exceed', body: 'Body' }, 'key-final'))
//     .rejects.toThrow('Rate limit exceeded');
// });
