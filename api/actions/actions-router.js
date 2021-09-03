const express = require('express')
const { checkActionID, checkActionPayload } = require('./actions-middlware')
const Actions = require('./actions-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Actions.get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        next(err)
    })
})

router.get('/:id', checkActionID, (req, res) =>{
    res.json(req.action)
})

router.post('/', checkActionID, checkActionPayload, async (req, res, next) => {
    try {
         const newD = await Actions.insert(req.body, req.params.id)
         res.status(200).json(newD)
    }
    catch(err) {
        next(err)
    }
})

router.put('/:id', checkActionID, checkActionPayload, async (req, res, next) => {
   try {
        const updated = await Actions.update(req.params.id, req.body)
        res.status(200).json(updated)
   }    
   catch(err) {
       next(err)
   }
})

router.delete('/:id', checkActionID, (req, res, next) => {
    Actions.remove(req.params.id)
    .then(() => {
        res.status(200).json({message: 'The action with the given id is removed'})
    })
    .catch(err => {
        next(err)
    })
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        customMessage: "Something went wrong in actions router"
    })
})
module.exports = router