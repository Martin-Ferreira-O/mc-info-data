const hola = require("./requests.js");
const funcion = new hola.requestApi;

async function main(server) {
    const funcionxd = await funcion.server(server)
    console.log(funcionxd)
};

main("mineaqua.us")