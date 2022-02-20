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
var products_1 = require("../Models/products");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var Store = new products_1.ProductStore();
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = (req.headers.authorization);
        var token = authorizationHeader.split(' ')[1];
        var decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        var user = JSON.parse(atob(token.split('.')[1])).user;
        if (user.first_name === 'admin' && user.last_name === 'admin')
            throw new Error('Admin is the only one to create new Product');
        next();
    }
    catch (error) {
        res.json('cant verify');
    }
};
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allProducts, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Store.index()];
            case 1:
                allProducts = _a.sent();
                res.json(allProducts);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                throw new Error("in the catch and the error is : ".concat(error_1));
            case 3: return [2 /*return*/];
        }
    });
}); };
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, product, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = Number(req.params.id);
                return [4 /*yield*/, Store.show(id)];
            case 1:
                product = _a.sent();
                res.json(product);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                throw new Error("in the catch and the error is : ".concat(error_2));
            case 3: return [2 /*return*/];
        }
    });
}); };
//token required
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var p, newProduct, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                p = {
                    product_name: req.body.name,
                    price: req.body.price
                };
                return [4 /*yield*/, Store.create(p)];
            case 1:
                newProduct = _a.sent();
                if (newProduct.price == -1)
                    res.json('Already Exists!');
                else
                    res.json("Product Added! : " + JSON.stringify(newProduct));
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                throw new Error("in the catch and the error is : ".concat(error_3));
            case 3: return [2 /*return*/];
        }
    });
}); };
var productsRoutes = function (app) {
    app.get('/products/getAll', index);
    app.get('/products/getOne/:id', show);
    app.post('/products/createProduct', verifyAuthToken, create);
};
exports.default = productsRoutes;
