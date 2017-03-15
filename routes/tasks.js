module.exports = app => {
  const Tasks = app.db.models.Tasks;

  app.route('/tasks')
    .all(app.auth.authenticate())
    .get(function(req, res){
      //Requisiçao para listar tarefas
      Tasks.findAll({
        where: {user_id: req.user.id}
      })
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        })
    })
    .post(function(req, res){
      //Requisição para cadastrar uma nova tarefa
      req.body.user_id = req.user.id;
      Tasks.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message})
        });
    });
  app.route('/tasks/:id')
    .all(app.auth.authenticate())
    .get(function(req, res){
      //Requisição para uma tarefa
      Tasks.findOne({where: {
        id: req.params.id,
        user_id: req.user.id
      }})
        .then(result => {
          if(result){
            res.json(result);
          }else{
            res.sendStatus(404);
          }
        })
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    })
    .put(function(req, res){
      //Requisição para atualizar uma tarefa
      Tasks.update(req.body, {where: {
        id: req.params.id,
        user_id: req.user.id
      }})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    })
    .delete(function(req, res){
      //Requisiçao para deletar uma tarefa
      Tasks.destroy({where:{
        id: req.params.id,
        user_id: req.user.id
      }})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message})
        });
    });

}
