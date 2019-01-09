// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
    uid: { type: String, required: true, lowercase:true , index:true, unique:true },  
    alias: { type: String, required: [true,'Alias is a required field'], lowercase:true , index:true, unique:true },
    password: { type: String, required: true},
    private:{
        resetHash: { type: String, required: false} 
    },
    loginAttempts: { type: Number, required: true, default: 0 },
    lockUntil: { type: Number},
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
  
  
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
