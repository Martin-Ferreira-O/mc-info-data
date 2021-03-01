const hola = require("./requests.js");
const funcion = new hola.requestApi;

funcion.server(server).then(req => {
console.log(req)
})
