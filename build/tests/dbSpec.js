"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var users_1 = require("../Models/users");
var products_1 = require("../Models/products");
var orders_1 = require("../Models/orders");
var bcrypt_1 = __importDefault(require("bcrypt"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var _a = process.env, pepper = _a.pepper, saltRounds = _a.saltRounds;
var StoreU = new users_1.UserStore();
var StoreP = new products_1.ProductStore();
var StoreO = new orders_1.OrderStore();
describe('User Model Testing', function () {
    var hashedPass1, hashedPass2;
    var firstName, lastName;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var user1, user1Created, user2, user2Created;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user1 = { first_name: 'Moh', last_name: 'Zaki', user_password: '101010' };
                    return [4 /*yield*/, StoreU.create(user1)];
                case 1:
                    user1Created = _a.sent();
                    user2 = { first_name: 'Ahmed', last_name: 'Sameh', user_password: '111' };
                    return [4 /*yield*/, StoreU.create(user2)];
                case 2:
                    user2Created = _a.sent();
                    hashedPass1 = user1Created.user_password;
                    hashedPass2 = user2Created.user_password;
                    firstName = user1Created.first_name;
                    lastName = user1Created.last_name;
                    return [2 /*return*/];
            }
        });
    }); });
    it('create method should add a user', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect({ first_name: firstName, last_name: lastName }).toEqual({ first_name: 'Moh', last_name: 'Zaki' });
            return [2 /*return*/];
        });
    }); });
    it('check the bcrypted password', function () { return __awaiter(void 0, void 0, void 0, function () {
        var resPass;
        return __generator(this, function (_a) {
            resPass = '101010';
            expect(bcrypt_1.default.compareSync(resPass + pepper, hashedPass1)).toBeTrue();
            return [2 /*return*/];
        });
    }); });
    it('checks that show returns one user correctly', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, StoreU.show(1)];
                case 1:
                    user = _a.sent();
                    expect(user).toEqual({ id: 1, first_name: 'Moh', last_name: 'Zaki', user_password: hashedPass1 });
                    return [2 /*return*/];
            }
        });
    }); });
    it('checks that index return all existing users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var users, existingUsers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, StoreU.index()];
                case 1:
                    users = _a.sent();
                    existingUsers = [{ id: 1, first_name: 'Moh', last_name: 'Zaki', user_password: hashedPass1 },
                        { id: 2, first_name: 'Ahmed', last_name: 'Sameh', user_password: hashedPass2 }];
                    expect(users).toEqual(existingUsers);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Product Model Testing', function () {
    var p1C, p2C;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var p1, p2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    p1 = { product_name: 'Milk', price: 10 };
                    p2 = { product_name: 'Meat', price: 200 };
                    return [4 /*yield*/, StoreP.create(p1)];
                case 1:
                    p1C = _a.sent();
                    return [4 /*yield*/, StoreP.create(p2)];
                case 2:
                    p2C = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('create method should add product', function () {
        expect(p1C).toEqual({ id: 1, product_name: 'Milk', price: 10 });
    });
    it('show method show the wanted result', function () { return __awaiter(void 0, void 0, void 0, function () {
        var p;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, StoreP.show(2)];
                case 1:
                    p = _a.sent();
                    expect(p).toEqual({ id: 2, product_name: 'Meat', price: 200 });
                    return [2 /*return*/];
            }
        });
    }); });
    it('index method get all products', function () { return __awaiter(void 0, void 0, void 0, function () {
        var products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, StoreP.index()];
                case 1:
                    products = _a.sent();
                    expect(products).toEqual([{ id: 1, product_name: 'Milk', price: 10 }, { id: 2, product_name: 'Meat', price: 200 }]);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Order Model Testing', function () {
    var oC;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, StoreO.create(1)];
                case 1:
                    oC = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('checks if order created successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(oC).toEqual({ id: 1, current_status: 'active', user_id: 1 });
            return [2 /*return*/];
        });
    }); });
    it('check if add to cart happens successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
        var op;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, StoreO.addProduct(1, 2)];
                case 1:
                    op = _a.sent();
                    expect(op).toEqual({ id: 1, order_id: 1, product_id: 1, quantity: 2 });
                    return [2 /*return*/];
            }
        });
    }); });
    it('checks if order end successfully', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, StoreO.end()];
                case 1:
                    _a.sent();
                    expect(oC.current_status).toEqual('finished');
                    return [2 /*return*/];
            }
        });
    }); });
});
