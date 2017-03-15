module.exports = app => {
  const Users = app.db.models.Users;

  app.route('/user')
    .all(app.auth.authenticate())
    .get(function(req, res){
      Users.findById(req.user.id, {
        attributes: ["id", "name", "email"]
      })
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    })
    .delete(function(req, res){
      User.destroy({where: {id: req.user.id} })
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
    });

  app.post('/users', function(req, res){
    Users.create(req.body)
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  });

  /*
  app.get('/users/:id', function(req, res){
    Users.findById(req.params.id, {
      attributes: ['id', 'name', 'email']
    })
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  });
  app.delete('/users/:id', function(req, res){
    Users.destroy({where: {id: req.params.id} })
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  });
  app.post('/users/:id', function(req, res){
    Users.create(req.body)
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({msg: error.message});
      });
  });*/
}
