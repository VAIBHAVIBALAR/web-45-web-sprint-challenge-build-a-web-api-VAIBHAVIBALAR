const express = require('express')
const {checkProjectID, checkProjectPayload} = require('./projects-middleware')
const Projects = require('./projects-model')
const Actions = require('../actions/actions-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const project = await Projects.get()
            res.status(200).json(project)
    }
    catch (err) {
        next(err)
    }
})

router.get('/:id', checkProjectID, (req, res) => {
    res.json(req.project)
})

router.post('/',checkProjectPayload, (req, res, next) =>{
    Projects.insert(req.body)
    .then(project => { 
        res.status(200).json(project)
    })
    .catch(err => {
        next(err)
    })

})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message : err.message,
        customMessage: 'Something wrong inside projects-router'
    })
})
module.exports = router