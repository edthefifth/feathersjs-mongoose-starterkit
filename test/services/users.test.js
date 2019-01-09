const assert = require('assert');
//const feathersClient = require('@feathersjs/client');
//const io = require('socket.io-client');
const app = require('../../src/app');
//const host = app.get('host');
//const port = app.get('port');
const testAliasName = 'test'+Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER));
const password = 'SecretPassword';
describe('\'users\' service', function(){
    
  this.timeout(10000);  
    
   before(() => app.get('mongoClient'));
  

  
  it('registered the service', function() {
    const service = app.service('users');

    assert.ok(service, 'Registered the service');
  });
  
  
  it('creates a user, encrypts password', function(done) {
    app.service('users').create({ 
      alias: testAliasName,
      password:password
    }).then(user => {
        //Make sure uid was created

        assert.ok(user.uid);

        // Makes sure the password got encrypted
        assert.ok(user.password);

        assert.ok(user.password !== password);
        done();
    }).catch(done);

    
  });

  it('find user we just created', async () => {
    // Setting `provider` indicates an external request
    const tAliasName = 't2'+Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER));
    const params = { provider: 'rest' };
    const user = await app.service('users').create({ 
      alias: tAliasName,
      password:password
    },params);


    assert(!user.password);
    assert(user.alias === tAliasName);
    assert(user.uid);
  });
});
