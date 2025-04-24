var Car = /** @class */ (function () {
    function Car(model, year, brand) {
        this.model = model;
        this.year = year;
        this.brand = brand;
    }
    Car.prototype.getBrand = function () {
        var _a;
        return (_a = this.brand) !== null && _a !== void 0 ? _a : "";
    };
    Car.prototype.getModel = function () {
        return this.model;
    };
    Car.prototype.getYear = function () {
        return this.year;
    };
    Car.prototype.setBrand = function (brand) {
        this.brand = brand;
    };
    Car.prototype.setModel = function (model) {
        this.model = model;
    };
    Car.prototype.setYear = function (year) {
        this.year = year;
    };
    Car.prototype.displayInfo = function () {
        var _a;
        console.log("Brand: ".concat((_a = this.brand) !== null && _a !== void 0 ? _a : ""));
        console.log("Model: ".concat(this.model));
        console.log("Year: ".concat(this.year));
    };
    Car.prototype.getInfo = function () {
        var _a;
        return {
            model: this.model,
            year: this.year,
            brand: (_a = this.brand) !== null && _a !== void 0 ? _a : "",
        };
    };
    return Car;
}());
var car = new Car("Toyota", 2022);
var carInfo = car.getInfo();
console.log("Car Info: " + JSON.stringify(carInfo));
car.displayInfo();
function identity(arg) {
    console.log(arg);
    return arg;
}
identity("myString");
identity(42);
