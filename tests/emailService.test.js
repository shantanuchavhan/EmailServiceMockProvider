const { sendEmail } = require('../src/core/emailService'); // ✅ Correct import


await test('Send email does not throw', async () => {
  const email = {
    to: 'shantanuchavhan002@gmail.com',
    subject: 'Hello',
    body: 'Testing'
  };
  const key = 'test-key-001';
  await expect(sendEmail(email, key)).resolves.not.toThrow();
});


// test('Rate limiting enforced', async () => {
//   for (let i = 0; i < 5; i++) {
//     await sendEmail({ to: 't@example.com', subject: 'RL', body: 'Body' }, `key-${i}`);
//   }

//   await expect(
//     sendEmail({ to: 't@example.com', subject: 'RL Exceed', body: 'Body' }, 'key-final')
//   ).rejects.toThrow('Rate limit exceeded');
// });

// const retry = require('../src/core/retryStrategy');

// test('retry should succeed after temporary failures', async () => {
//   let tries = 0;
//   const fn = jest.fn(async () => {
//     tries++;
//     if (tries < 3) throw new Error('Fail');
//     return 'ok';
//   });

//   const result = await retry(fn, 5, 10);
//   expect(result).toBe('ok');
//   expect(fn).toHaveBeenCalledTimes(3);
// });
