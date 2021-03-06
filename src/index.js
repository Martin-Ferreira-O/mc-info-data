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
     * Obtienes la información de un servidor.
     * @param ip La ip a buscar información.
     * @returns {Promise<Pending>} Un objeto json de información.
     */
    requestApi.prototype.server = function (ip) {
        return __awaiter(this, void 0, void 0, function () {
            var url, options, objeto, res, json, err_1;
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
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, node_fetch_1["default"]("" + url + ip, options)];
                    case 2:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 3:
                        json = _a.sent();
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
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        throw new Error("[ERROR] La ip introducida no es valida.");
                    case 5: return [2 /*return*/, objeto];
                }
            });
        });
    };
    ;
    /**
     * Obtienes un historial de nicks
     * @param username El nickname a buscar información.
     * @returns {Promise<Pending>} Historial de nicknames del usuario
     */
    requestApi.prototype.history = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var url1, options, dataFetch, url2, res, dataUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!username)
                            throw new Error("No se ingreso ningun nickname.");
                        url1 = "https://api.mojang.com/users/profiles/minecraft/" + username;
                        options = {
                            method: "GET"
                        };
                        return [4 /*yield*/, node_fetch_1["default"](url1, options).then(function (res) { return res.json(); })["catch"](function (err) {
                                throw new Error("Username invalido.");
                            })];
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
    /**
     * Sirve para obtener la skin de un usuario.
     * @param username <Nickname a buscar información>
     * @returns {Promise<Buffer>} Buffer de la imagen de la skin.
     */
    requestApi.prototype.skin = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var url1, options, dataFetch, url2, response, buffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url1 = "https://api.mojang.com/users/profiles/minecraft/" + username;
                        options = {
                            method: "GET"
                        };
                        return [4 /*yield*/, node_fetch_1["default"](url1, options).then(function (res) { return res.json(); })["catch"](function (err) {
                                throw new Error("Username invalido.");
                            })];
                    case 1:
                        dataFetch = _a.sent();
                        url2 = "https://crafatar.com/skins/" + dataFetch.id + "?size=4098&default=MHF_Steve&overlay";
                        return [4 /*yield*/, node_fetch_1["default"](url2, options)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new Error("Error en la API, error de conexion.");
                        return [4 /*yield*/, response.buffer()];
                    case 3:
                        buffer = _a.sent();
                        return [2 /*return*/, buffer];
                }
            });
        });
    };
    /**
    * Sirve para poder obtener una imagen del cuerpo de una skin.
    * @param username <Nickname a buscar>
    * @returns {Promise<Pending>} Link de imagen el cuerpo de una skin
    */
    requestApi.prototype.body = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var url1, options, dataFetch, url2, response, buffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!username)
                            throw new Error("No se ingreso una IP");
                        url1 = "https://api.mojang.com/users/profiles/minecraft/" + username;
                        options = {
                            method: "GET"
                        };
                        return [4 /*yield*/, node_fetch_1["default"](url1, options).then(function (res) { return res.json(); })["catch"](function (err) {
                                throw new Error("Username invalido.");
                            })];
                    case 1:
                        dataFetch = _a.sent();
                        url2 = "https://crafatar.com/renders/body/" + dataFetch.id + "?size=4098&default=MHF_Steve&overlay";
                        return [4 /*yield*/, node_fetch_1["default"](url2, options)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new Error("Error en la API, error de conexion.");
                        return [4 /*yield*/, response.buffer()];
                    case 3:
                        buffer = _a.sent();
                        return [2 /*return*/, buffer];
                }
            });
        });
    };
    ;
    /**
    * Obtienes todos los nicknames o personas que le han dado like al servidor
    * @param ipServer <Servidor a buscar>
    * @returns {Promise<Pending>} Todos los nicks de las personas que han dado like por el servidor, si supera los 500 respondera un numero
    */
    requestApi.prototype.namemcLikes = function (ipServer) {
        return __awaiter(this, void 0, void 0, function () {
            var options, fetcheado, response, myArray, i, valor, valorSinJson, nicknameUsuario;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!ipServer)
                            throw new Error("No se ingreso una IP");
                        options = {
                            method: "GET"
                        };
                        return [4 /*yield*/, node_fetch_1["default"]("https://api.namemc.com/server/" + ipServer + "/likes", options)];
                    case 1:
                        fetcheado = _a.sent();
                        return [4 /*yield*/, fetcheado.json()];
                    case 2:
                        response = _a.sent();
                        if (fetcheado.status == 404)
                            throw new Error("No existe el servidor.");
                        if (!(response.length >= 500)) return [3 /*break*/, 3];
                        return [2 /*return*/, response.length];
                    case 3:
                        myArray = [];
                        i = 0;
                        _a.label = 4;
                    case 4:
                        if (!(i < response.length)) return [3 /*break*/, 9];
                        valor = response[i];
                        return [4 /*yield*/, node_fetch_1["default"]("https://sessionserver.mojang.com/session/minecraft/profile/" + valor, options)];
                    case 5:
                        valorSinJson = _a.sent();
                        return [4 /*yield*/, valorSinJson.json()];
                    case 6:
                        nicknameUsuario = _a.sent();
                        return [4 /*yield*/, myArray.push(nicknameUsuario.name)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 4];
                    case 9: return [2 /*return*/, myArray];
                }
            });
        });
    };
    ;
    /**
     * Obtienes el icono de un servidor.
     * @param ipServer Ip del servidor
     * @returns {Promise<Buffer>} Icono del servidor
     */
    requestApi.prototype.icon = function (ipServer) {
        return __awaiter(this, void 0, void 0, function () {
            var options, url, fetchResponse, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!ipServer)
                            throw new Error("No se ingreso ningun servidor.");
                        options = {
                            method: "GET"
                        };
                        url = "https://api.mcsrvstat.us/icon/" + ipServer;
                        return [4 /*yield*/, node_fetch_1["default"](url, options)];
                    case 1:
                        fetchResponse = _a.sent();
                        return [4 /*yield*/, fetchResponse.buffer()];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    return requestApi;
}());
exports.requestApi = requestApi;
;
