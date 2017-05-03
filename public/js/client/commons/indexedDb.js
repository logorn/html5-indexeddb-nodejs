/**
 * IndexedDb Client configuration CRUD requests (using Dexie)
 */

const db = new Dexie("db_Car_Driver");
db.version(1).stores({
    car: '++id, maker, model, year , driver',
    driver: '++id, lastName, firstName, car'
});

/* (CREATE) Add a Car */

function addCar(Car, callback) {
    delete Car.id;
    db.car.put(Car).then(function () {
        callback();
    }).catch(function (error) {
        console.log(error);
    })
}

/* (READ) Get all Cars */

function getAllCars(callback) {
    db.car.toArray().then(function (array) {
        callback(array);
    });
}

/* (CREATE) Add a Driver */

function addDriver(Driver, callback) {
    delete Driver.id;
    db.driver.put(Driver).then(function () {
        callback();
    }).catch(function (error) {
        console.log(error);
    })
}

/* (READ) Get all Drivers */

function getAllDrivers(callback) {
    db.driver.toArray().then(function (array) {
        callback(array);
    });
}