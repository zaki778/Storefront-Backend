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
exports.OrderStore = void 0;
var database_1 = __importDefault(require("../database"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var OrderStore = /** @class */ (function () {
    function OrderStore() {
    }
    OrderStore.prototype.create = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var dbConnection, sqlQueryI, queryResultI, sqlQueryII, queryResultII, sqlQuery, queryResult, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        dbConnection = _a.sent();
                        sqlQueryI = "SELECT * FROM users WHERE id =($1)";
                        return [4 /*yield*/, dbConnection.query(sqlQueryI, [userId])];
                    case 2:
                        queryResultI = _a.sent();
                        sqlQueryII = 'SELECT * FROM orders WHERE user_id = ($1) AND current_status = ($2)';
                        return [4 /*yield*/, dbConnection.query(sqlQueryII, [userId, 'active'])];
                    case 3:
                        queryResultII = _a.sent();
                        console.log("queryII: " + queryResultII.rows[0]);
                        if (queryResultII.rows[0])
                            return [2 /*return*/, { user_id: -2 }];
                        if (!queryResultI.rows[0]) return [3 /*break*/, 5];
                        sqlQuery = "INSERT INTO orders (user_id, current_status) VALUES ($1, $2) RETURNING *";
                        return [4 /*yield*/, dbConnection.query(sqlQuery, [userId, 'active'])];
                    case 4:
                        queryResult = _a.sent();
                        return [2 /*return*/, queryResult.rows[0]];
                    case 5: return [2 /*return*/, { user_id: -1 }];
                    case 6:
                        error_1 = _a.sent();
                        throw new Error("in the catch and the error is : ".concat(error_1));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.addProduct = function (pid, quantity) {
        return __awaiter(this, void 0, void 0, function () {
            var dbConnection, sqlQueryI, queryResultI, sqlQueryIII, queryResultIII, activeOrderId, sqlQueryII, queryResultII, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        dbConnection = _a.sent();
                        sqlQueryI = "SELECT id FROM orders WHERE current_status = 'active'";
                        return [4 /*yield*/, dbConnection.query(sqlQueryI)];
                    case 2:
                        queryResultI = _a.sent();
                        sqlQueryIII = "SELECT * FROM products WHERE id = ($1)";
                        return [4 /*yield*/, dbConnection.query(sqlQueryIII, [pid])];
                    case 3:
                        queryResultIII = _a.sent();
                        if (!(queryResultI.rows[0] && queryResultIII.rows[0])) return [3 /*break*/, 5];
                        activeOrderId = queryResultI.rows[0].id;
                        sqlQueryII = "INSERT INTO order_product (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";
                        return [4 /*yield*/, dbConnection.query(sqlQueryII, [activeOrderId, pid, quantity])];
                    case 4:
                        queryResultII = _a.sent();
                        return [2 /*return*/, queryResultII.rows[0]];
                    case 5:
                        if (!queryResultIII.rows[0])
                            return [2 /*return*/, { quantity: -1 }];
                        return [2 /*return*/, { quantity: 0 }];
                    case 6:
                        error_2 = _a.sent();
                        throw new Error("in the catch and the error is : ".concat(error_2));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.end = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dbConnection, sqlQuery, queryResult, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        dbConnection = _a.sent();
                        sqlQuery = "UPDATE orders SET current_status = 'finished' WHERE id IN (SELECT id FROM orders WHERE current_status = 'active') RETURNING *";
                        return [4 /*yield*/, dbConnection.query(sqlQuery)];
                    case 2:
                        queryResult = _a.sent();
                        return [2 /*return*/, queryResult.rows[0]];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("in the catch and the error is : ".concat(error_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return OrderStore;
}());
exports.OrderStore = OrderStore;
