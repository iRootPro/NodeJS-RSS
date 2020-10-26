const ownMethods = schema => {
  schema.method('toClient', function() {
    const { _id, ...rest } = this.toJSON();
    delete rest.__v;
    delete rest.password;
    return { id: _id, ...rest };
  });
};

module.exports = {ownMethods}
