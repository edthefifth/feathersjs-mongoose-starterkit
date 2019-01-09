const creators = require('./creators/creators.service.js');
const user = require('./user/user.service.js');
const conversations = require('./conversations/conversations.service.js');
const comments = require('./comments/comments.service.js');
const follows = require('./follows/follows.service.js');
const groups = require('./groups/groups.service.js');
const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(creators);
  app.configure(user);
  app.configure(conversations);
  app.configure(comments);
  app.configure(follows);
  app.configure(groups);
  app.configure(users);
};
