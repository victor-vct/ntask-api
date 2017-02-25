module.exports = app => {
  const Tasks = app.db.models.Tasks;

  app.route('/tasks')
    .get(function(req, res){
      //Requisiçao para listar tarefas
      Tasks.findAll({})
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message});
        })
    })
    .post(function(req, res){
      //Requisição para cadastrar uma nova tarefa
      Tasks.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({msg: error.message})
        });
    });
  app.route('/tasks/:id')
    .get(function(req, res){
      //Requisição para uma tarefa
      Tasks.findOne({where: req.params})
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
      Tasks.update(req.body, {where: req.params})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message});
        });
    })
    .delete(function(req, res){
      //Requisiçao para deletar uma tarefa
      Tasks.destroy({where: req.params.id})
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({msg: error.message})
        });
    });

}
