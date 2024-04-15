const { ChatAi } = require('./chatAi.class');
const createModel = require('../../models/chatAi.model');
const hooks = require('./chatAi.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/chatAi', new ChatAi(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('chatAi');

  service.hooks(hooks);
};