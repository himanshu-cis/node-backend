const mongoose = require('mongoose');

class MongoManager {
  constructor(config) {
    this._config = config;
  }
  getMongoUrl() {
    return this._config.MONGODB_URI;
  }
  connect() {
    mongoose.set('useCreateIndex', true);
    return mongoose.connect(this.getMongoUrl(), { useNewUrlParser: true });
  }
}

module.exports = { MongoManager };