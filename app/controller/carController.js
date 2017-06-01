/* Load Car Data Access Object */
const CarDao = require('../dao/carDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Car entity */
const Car = require('../model/car');

/**
 * Car Controller
 */
class CarController {

    constructor() {
        this.carDao = new CarDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.car_id;

        this.carDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.carDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.carDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let car = new Car();
        car.car_id = req.params.car_id;
        car.car_maker = req.body.car_maker;
        car.car_model = req.body.car_model;
        car.car_year = req.body.car_year;

        return this.carDao.update(car)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let car = new Car();
        if (req.body.car_id) {
            car.car_id = req.body.car_id;
        }
        car.car_maker = req.body.car_maker;
        car.car_model = req.body.car_model;
        car.car_year = req.body.car_year;

        if (req.body.car_id) {
            return this.carDao.createWithId(car)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        } else {
            return this.carDao.create(car)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }

    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res
     * returns database deletion status
     */
    deleteById(req, res) {
        let id = req.params.car_id;

        this.carDao.deleteById(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params req, res
     * @return
     */
    exists(req, res) {
        let id = req.params.car_id;

        this.carDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = CarController;