"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Schedule = /** @class */ (function () {
    function Schedule(interval) {
        this.tasks = [];
        this.interval = 1000;
        this.step = 0;
        this.destroyed = false;
        this.suspended = true;
        this.timer = null;
        if (interval) {
            this.interval = interval;
        }
    }
    Schedule.prototype.run = function () {
        var _this = this;
        if (this.destroyed) {
            return this;
        }
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.suspended = false;
        this.timer = setInterval(function () {
            if (_this.suspended || _this.destroyed) {
                return;
            }
            _this.step++;
            if (_this.tasks) {
                _this.tasks.map(function (fn) { return fn(_this.step); });
            }
        }, this.interval);
        return this;
    };
    Schedule.prototype.suspend = function () {
        this.suspended = true;
        this.timer && clearInterval(this.timer);
        this.timer = null;
        return this;
    };
    Schedule.prototype.resume = function () {
        this.run();
        return this;
    };
    Schedule.prototype.cleanTask = function () {
        this.tasks = [];
        return this;
    };
    Schedule.prototype.addTask = function (task) {
        this.tasks && this.tasks.push(task);
        return this;
    };
    Schedule.prototype.toStep = function (step) {
        this.step = step;
        return this;
    };
    Schedule.prototype.removeTask = function (task) {
        if (this.tasks) {
            var index = this.tasks.findIndex(function (item) { return item === task; });
            this.tasks.splice(index, 1);
        }
        return this;
    };
    Schedule.prototype.destroy = function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.destroyed = true;
        this.tasks = null;
    };
    return Schedule;
}());
exports.default = Schedule;
