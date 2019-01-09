const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;


function fillUid(hook,next){
    var userData = hook.data;
    userData.uid = 'users-'+Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER));
    next();
}

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [fillUid, hashPassword({passwordField:'password'})],
    update: [ hashPassword({passwordField:'password'}),  authenticate('jwt') ],
    patch: [ hashPassword({passwordField:'password'}),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
      // Make sure the private field is never sent to the client
      // Always must be the last hook
      protect('private'), protect('password')
    ],
    find: [ ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
