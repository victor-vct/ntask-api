module.exports = app => {
  app.get('/', function(req, res) {
    res.json({status:"NTask API"});
  });
};
