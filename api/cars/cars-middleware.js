const Cars = require('./cars-model')
const vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
 try {
   const car = await Cars.getById(req.params.id)
   if (!car) {
     res.status(404).json({ message: `car with id ${car} is not found` })
   }
   else {next()}
 }
 catch (err) {
   next(err)
 }
}

const checkCarPayload = async (req, res, next) => {
  try {
    const { vin, make, model, mileage } = await req.body
    if ( !vin ) {
      res.status(400).json({ message: `vin is missing` })
    } else if (!make) {
      res.status(400).json({ message: `make is missing` })
    } else if (!model) {
      res.status(400).json({ message: `model is missing` })
    } else if (!mileage) {
      res.status(400).json({ message: `mileage is missing`})
    } else {
      next()
    }
  }
  catch (err) {
    next(err)
  }
}

const checkVinNumberValid = async (req, res, next) => {
    const { vin } = await req.body
    if (vinValidator.validate(vin)) {
      next()
    } else {
      next(res.status(400).json({ message: `vin ${vin} is invalid` }))
    }
}

const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body
  const cars = await Cars.getAll()
  cars.forEach(car => {
    if (car.vin.trim() === vin){
      return res.status(400).json({ message: `vin ${vin} already exists`})
    } else {next()}
  })
}

module.exports = {checkCarId,
checkCarPayload,
checkVinNumberValid,
checkVinNumberUnique}