const Actions = require('./actions-model')

function loggerA(req, res, next) {
    console.log('Got a request for Actions API')
    console.log(`Request from ${req.url} with a ${req.method} method`)
    next()
}

function checkActionID(req, res, next){
    const { id } = req.params
    Actions.get(id)
    .then(action => {
        if(action){
            req.action = action
             next()
        } else {
            next({ message: 'not found', status: 404})
        }
    })
    .catch(err => {
      next(err)
    })

}

function checkActionPayload(req, res, next){
    if( !req.body.project_id || 
            !req.body.description || 
              !req.body.notes ){
            next({ status: 400, message: 'Project_id, description, notes must be given and project_id must be of an existing project and description must be 128 characters long'})
        } else {
            next()
        }
}
module.exports = {loggerA, checkActionID, checkActionPayload}
