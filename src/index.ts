const fetch = require("node-fetch");
const options = { method: "GET", headers: { "Content-Type": "Application/json" } };
class requestApi {
    constructor() {
    }
    
    /**
     * You get the information from a server.
     * @param ip The ip to find information.
     * @returns {Promise<Pending>} An information json object.
     */
    async server(ip: string): Promise<Object> {
        if(typeof ip != 'string') new Error("The ip must be a string I received " + typeof ip);
        const url = `https://api.mcsrvstat.us/2/${ip}`;
        const res = await fetch(url, options).catch(() => { throw Error("INVALID INTRODUCED IP.") });
        const json = await res.json();
        return json;
    };
    /**
     * You get a history of nicknames
     * @param username The nickname to search for information.
     * @returns {Promise<Pending>} User nickname history
     */
    async history(username: string): Promise<Object> {
        if (typeof username != 'string') TypeError("The ip must be a string I received " + typeof username)
        const url = "https://api.mojang.com/users/profiles/minecraft/" + username;
        const res = await fetch(url, options).then((res) => res.json()).catch(() => { TypeError("Username invalido."); });
        const url2 = `https://api.mojang.com/user/profiles/${res.id}/names`;
        const resHistory = await fetch(`${url2}`, options).then((res) => res.json());
        return resHistory;
    };

    /**
     * It is used to obtain the skin of a user.
     * @param username <Nickname to find information>
     * @returns {Promise<Buffer>} Skin image buffer.
     */
    async skin(username: string): Promise<Buffer> {
        if(typeof username != 'string') new Error("The username must be a string I received " + typeof username);
        const url1 = "https://api.mojang.com/users/profiles/minecraft/" + username;;
        const dataFetch = await fetch(url1, options).then((res: any) => res.json()).catch(() => {
            new Error("Username invalido.");
        });
       
        const url2 = `https://crafatar.com/skins/${dataFetch.id}?size=4098&default=MHF_Steve&overlay`;
        const response = await fetch(url2, options);
        if (response.status !== 200) new Error("Error en la API, error de conexion.")
        const buffer = await response.buffer();
        return buffer;
    }
    /**
    * It is used to obtain an image of the body of a skin.
    * @param username <Nickname to find>
    * @returns {Promise<Pending>} Image link the body of a skin
    */

    async body(username: string): Promise<Buffer> {
        if(typeof username != 'string') new Error("The username must be a string I received " + typeof username);
        const url1 = "https://api.mojang.com/users/profiles/minecraft/" + username;

        const dataFetch = await fetch(url1, options).then((res: any) => res.json()).catch(() => {
            new Error("Username invalido.");
        });
        const url2 = `https://crafatar.com/renders/body/${dataFetch.id}?size=4098&default=MHF_Steve&overlay`;
        const response = await fetch(url2, options);
        const buffer = await response.buffer();
        if (buffer) return buffer; else Error("Invalid nickname")
    };

    /**
    * Get all the nicknames or people who have liked the server
    * @param ip <Server to find>
    * @returns {Promise<number>} How many people have voted for a server
    */

    async namemcLikes(ip: string): Promise<any> {
        if(typeof ip != 'string') new Error("The ip must be a string I received " + typeof ip);
        const fetcheado = await fetch(`https://api.namemc.com/server/${ip}/likes`, options);
        const response = await fetcheado.json();
        if (fetcheado.status === 404) new Error("Server doesn't exist.");

    return response.length;
    };

    /**
     * Get the icon of the server
     * @param ip Server IP
     * @returns {Promise<Buffer>} Server Icon Buffer
     */

    async icon(ip: String): Promise<Buffer> {
        if(typeof ip != 'string') new Error("The ip must be a string I received " + typeof ip);
        const url = `https://api.mcsrvstat.us/icon/${ip}`;
        const fetchResponse = await fetch(url, options);
        const response = await fetchResponse.buffer();
        return response;
    }

};
module.exports = { requestApi }