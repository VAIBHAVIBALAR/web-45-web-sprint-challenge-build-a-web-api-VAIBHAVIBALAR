const Projects = require('./projects-model')

function checkProjectID(req, res, next) {
    const { id } =  req.params
    Projects.get(id)
    .then(project => {
        if(project){
            req.project = project
            next()
        } else {
            next({ message: 'not found', status: 404})
        }
    })
    .catch(err => {
        next(err)
    })
}

function checkProjectPayload(req, res, next) {
    if(!req.body.name || 
        !req.body.description ||
        req.body.completed == null){
        next({ status: 400, message: 'project name and description must be given'})
    }else {
        next()
    }
}
module.exports = { checkProjectID, checkProjectPayload}