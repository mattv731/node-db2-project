// STRETCH
exports.seed = function (knex) {
    return knex('cars').truncate()
    .then(function () {
        return knex('cars').insert([
            { vin: 'ASIONQT490GANO3459', make: 'Volkswagen', model: 'Golf', mileage: 126342, transmission: 'manual', title: "clear"},
            { vin: 'ASIONQTNA0GANO3459', make: 'Mazda', model: 'MX-5', mileage: 126342, transmission: 'manual', title: "clear"}
        ])
    })
}