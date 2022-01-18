const Cars = require('./cars-model')
const router = require('express').Router()

const { 
    checkCarId, 
    checkCarPayload, 
    checkVinNumberValid, 
    checkVinNumberUnique } = require('./cars-middleware')

router.get('/', (req, res, next) => {
    Cars.getAll()
    .then(car => {
        res.json(car)
    })
    .catch(err => {next(err)})
})

router.get('/:id', checkCarId, (req, res, next) => {
    Cars.getById(req.params.id)
    .then(car => {
        res.json(car)
    })
    .catch(err => {next(err)})
})

router.post('/', checkCarPayload, checkVinNumberValid, async (req, res, next) => {
    await Cars.create(req.body)
    .then(car => {
        res.status(201).json(car)
    })
    .catch(err => {next(err)})
})

module.exports = router