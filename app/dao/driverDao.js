/* Load Driver entity */
const Driver = require('../model/driver');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Driver Data Access Object
 */
class DriverDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT driver_id, driver_firstName, driver_lastName, car_id FROM driver WHERE driver_id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Driver(row.driver_id, row.driver_firstName, row.driver_lastName, row.car_id));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM driver";
        return this.common.findAll(sqlRequest).then(rows => {
            let drivers = [];
            for (const row of rows) {
                drivers.push(new Driver(row.driver_id, row.driver_firstName, row.driver_lastName, row.car_id));
            }
            return drivers;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM driver";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Driver
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Driver) {
        let sqlRequest = "UPDATE driver SET " +
            "driver_firstName=$firstName, " +
            "driver_lastName=$lastName, " +
            "car_id=$car " +
            "WHERE driver_id=$id";

        let sqlParams = {
            $firstName: Driver.driver_firstName,
            $lastName: Driver.driver_lastName,
            $car: Driver.driver_car,
            $id: Driver.driver_id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Driver
     * returns database insertion status
     */
    create(Driver) {
        let sqlRequest = "INSERT into driver (driver_firstName, driver_lastName, car_id) " +
            "VALUES ($firstName, $lastName, $car)";
        let sqlRequest2 = "SELECT driver_id, driver_firstName, driver_lastName, car_id FROM driver WHERE driver_id=$id";
        let sqlParams = {
            $firstName: Driver.driver_firstName,
            $lastName: Driver.driver_lastName,
            $car: Driver.driver_car
        };
        return this.common.run(sqlRequest, sqlParams, sqlRequest2);
    };

    /**
     * Creates the given entity with a provided in the database
     * @params Driver
     * returns database insertion status
     */
    createWithId(Driver) {
        let sqlRequest = "INSERT into driver (driver_id, driver_firstName, driver_lastName, car_id) " +
            "VALUES ($id, $firstName, $lastName, $car)";
        let sqlRequest2 = "SELECT driver_id, driver_firstName, driver_lastName, car_id FROM driver WHERE driver_id=$id";
        let sqlParams = {
            $id: Driver.id,
            $firstName: Driver.driver_firstName,
            $lastName: Driver.driver_lastName,
            $car: Driver.driver_car
        };
        return this.common.run(sqlRequest, sqlParams, sqlRequest2);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM driver WHERE driver_id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM driver WHERE driver_id=$id";
        let sqlParams = {$id: id};
        return this.common.existsOne(sqlRequest, sqlParams);
    };

    forceErrorInvalid() {
        return this.common.forceErrorInvalid();
    }
}

module.exports = DriverDao;