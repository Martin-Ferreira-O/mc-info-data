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
exports.__esModule = true;
exports.requestApi = void 0;
var node_fetch_1 = require("node-fetch");
var requestApi = /** @class */ (function () {
    function requestApi() {
    }
    /**
     *
     * @param ip La ip a buscar información.
     */
    requestApi.prototype.server = function (ip) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, objeto, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!ip)
                            throw new Error("No se introducio ninguna ip");
                        url = "https://api.mcsrvstat.us/2/";
                        options = {
                            method: "GET"
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, node_fetch_1["default"]("" + url + ip, options).then(function (res) { return res.json(); }).then(function (json) {
                                objeto = {
                                    ip: json.ip,
                                    port: json.port,
                                    motd: {
                                        raw: json.motd.raw,
                                        clean: json.motd.clean,
                                        html: json.motd.html
                                    },
                                    players: {
                                        online: json.players.online,
                                        max: json.players.max,
                                        listUsers: json.players.list
                                    },
                                    version: json.version,
                                    hostname: json.hostname,
                                    software: json.software
                                };
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("[ERROR] La ip introducida no es valida.");
                    case 4: return [2 /*return*/, objeto];
                }
            });
        });
    };
    ;
    /**
     *
     * @param username El nickname a buscar información.
     */
    requestApi.prototype.username = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var url1, options, dataFetch, url2, res, dataUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!username)
                            throw new Error("No se ingreso un nickname");
                        url1 = "https://api.mojang.com/users/profiles/minecraft/" + username;
                        options = {
                            method: "GET"
                        };
                        return [4 /*yield*/, node_fetch_1["default"](url1, options).then(function (res) { return res.json(); })];
                    case 1:
                        dataFetch = _a.sent();
                        url2 = "https://api.mojang.com/user/profiles/" + dataFetch.id + "/names";
                        return [4 /*yield*/, node_fetch_1["default"]("" + url2, options)];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 3:
                        dataUrl = _a.sent();
                        return [2 /*return*/, dataUrl];
                }
            });
        });
    };
    ;
    return requestApi;
}());
exports.requestApi = requestApi;
;
