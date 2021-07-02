const fetch = require("node-fetch");
const options = { method: "GET" }
class requestApi {
    constructor() {
    }
    
    /**
     * Obtienes la información de un servidor.
     * @param ip La ip a buscar información.
     * @returns {Promise<Pending>} Un objeto json de información.
     */
    async server(ip: string): Promise<Object> {
        if (!ip) throw new Error("No se introducio ninguna ip");
        if(typeof ip != 'string') throw new Error("La ip debe ser una string.")
        const url = "https://api.mcsrvstat.us/2/";
        const res = await fetch(`${url}${ip}`, options).catch(() => { throw Error("IP INTRODUCIDA VALIDA.") });
        const json = await res.json();
        return json;
    };
    /**
     * Obtienes un historial de nicks
     * @param username El nickname a buscar información.
     * @returns {Promise<Pending>} Historial de nicknames del usuario
     */
    async history(username: string): Promise<Object> {
        if (!username) throw new Error("No se ingreso ningun nickname.");
        const url1 = "https://api.mojang.com/users/profiles/minecraft/" + username;;
        const dataFetch = await fetch(url1, options).then((res: { json: () => any; }) => res.json())
            .catch(() => {
                throw new Error("Username invalido.");
            });
        const url2 = `https://api.mojang.com/user/profiles/${dataFetch.id}/names`;
        const res = await fetch(`${url2}`, options);
        const dataUrl = await res.json();
        return dataUrl;
    };

    /**
     * Sirve para obtener la skin de un usuario.
     * @param username <Nickname a buscar información>
     * @returns {Promise<Buffer>} Buffer de la imagen de la skin.
     */
    async skin(username: string): Promise<Buffer> {
        const url1 = "https://api.mojang.com/users/profiles/minecraft/" + username;;
        const dataFetch = await fetch(url1, options).then((res: any) => res.json()).catch(() => {
            throw new Error("Username invalido.");
        });
       
        const url2 = `https://crafatar.com/skins/${dataFetch.id}?size=4098&default=MHF_Steve&overlay`;
        const response = await fetch(url2, options);
        if (response.status !== 200) throw new Error("Error en la API, error de conexion.")
        const buffer = await response.buffer();
        return buffer;
    }
    /**
    * Sirve para poder obtener una imagen del cuerpo de una skin.
    * @param username <Nickname a buscar>
    * @returns {Promise<Pending>} Link de imagen el cuerpo de una skin
    */

    async body(username: string): Promise<Buffer> {
        if (!username) throw new Error("No se ingreso una IP");
        const url1 = "https://api.mojang.com/users/profiles/minecraft/" + username;


        const dataFetch = await fetch(url1, options).then((res: any) => res.json()).catch(() => {
            throw new Error("Username invalido.");
        });
        const url2 = `https://crafatar.com/renders/body/${dataFetch.id}?size=4098&default=MHF_Steve&overlay`;
        const response = await fetch(url2, options);
        if (response.status !== 200) throw new Error("Error en la API, error de conexion.")
        const buffer = await response.buffer();
        return buffer;
    };

    /**
    * Obtienes todos los nicknames o personas que le han dado like al servidor
    * @param ipServer <Servidor a buscar>
    * @returns {Promise<Pending>} Todos los nicks de las personas que han dado like por el servidor, si supera los 500 respondera un numero
    */

    async namemcLikes(ipServer: string): Promise<any> {
        if (!ipServer) throw new Error("No se ingreso una IP");
        const fetcheado = await fetch(`https://api.namemc.com/server/${ipServer}/likes`, options);
        const response = await fetcheado.json();
        if (fetcheado.status == 404) throw new Error("No existe el servidor.");
        if (response.length >= 20) {
            return response.length;
        } else {
            const myArray = [];
            for (let i = 0; i < response.length; i++) {
                const valorSinJson = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${response[i]}`, options);
                const nicknameUsuario = await valorSinJson.json();
                myArray.push(nicknameUsuario.name);
            }
            return myArray;
        }
    };

    /**
     * Obtienes el icono de un servidor.
     * @param ipServer Ip del servidor
     * @returns {Promise<Buffer>} Icono del servidor
     */

    async icon(ipServer: String): Promise<Buffer> {
        
        if(!ipServer) throw new Error("No se ingreso ningun servidor.");
        if(typeof ipServer != 'string') throw new Error("La ip del servidor debe ser tipo string.");
        ;

        const url = `https://api.mcsrvstat.us/icon/${ipServer}`;
        const fetchResponse = await fetch(url, options);
        const response = await fetchResponse.buffer();
        return response;
    }

};
module.exports = { requestApi }