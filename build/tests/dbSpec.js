"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users_1 = require("../Models/users");
var products_1 = require("../Models/products");
var orders_1 = require("../Models/orders");
var StoreU = new users_1.UserStore();
var StoreP = new products_1.ProductStore();
var StoreO = new orders_1.OrderStore();
describe('User Model Testing', function () {
    it('it should have an index method', function () {
        expect(StoreU.index()).toBeDefined();
    });
    it('it should have a show method', function () {
        expect(StoreU.show(1)).toBeDefined();
    });
    it('it should have a create method', function () {
        var user = { firstName: 'm', lastName: 'z', userPassword: '111' };
        expect(StoreU.create(user)).toBeDefined();
    });
});
describe('Product Model Testing', function () {
    it('it should have an index method', function () {
        expect(StoreP.index()).toBeDefined();
    });
    it('it should have a show method', function () {
        expect(StoreP.show(1)).toBeDefined();
    });
    it('it should have a create method', function () {
        var user = { firstName: 'm', lastName: 'z', userPassword: '111' };
        expect(StoreP.create(user)).toBeDefined();
    });
});
describe('Order Model Testing', function () {
    it('it should have an index method', function () {
        expect(StoreO.create(1)).toBeDefined();
    });
    it('it should have a show method', function () {
        expect(StoreO.addProduct(1, 5)).toBeDefined();
    });
    it('it should have a create method', function () {
        expect(StoreO.end()).toBeDefined();
    });
});
