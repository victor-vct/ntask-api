module.exports = app => {
  app.db.sequelize.sync().done(function(){
    app.listen(app.get("port"), function(){
      var portOnListen = app.get("port");
      console.log('NTask API - porta ' + portOnListen);
    });
  })
};
