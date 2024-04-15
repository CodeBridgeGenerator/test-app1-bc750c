const assert = require('assert');
const app = require('../../src/app');

describe('\'chatAi\' service', () => {
  it('registered the service', () => {
    const service = app.service('chatAi');

    assert.ok(service, 'Registered the service (chatAi)');
  });
});
