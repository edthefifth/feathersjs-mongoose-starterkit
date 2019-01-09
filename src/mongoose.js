const mongoose = require('mongoose');
module.exports = function (app) {

    mongoose.connect(app.get('mongodb'), 
    {   useNewUrlParser: true ,
        useCreateIndex: true,
        autoIndex: true,
        user:app.get('mongoUser'),
        pass:app.get('mongoPass'),
        authSource:app.get('mongoAdminDB')
    });    
    mongoose.Promise = global.Promise;

    app.set('mongooseClient', mongoose);
};
