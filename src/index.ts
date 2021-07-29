import fetch from 'node-fetch';
import { ServerInformation, NicknameHistory, IOptions } from './interfaces';
class MCInfo {
    options: IOptions;
    constructor() {
        this.options = { 
            method: "GET", 
            headers: { 
                "Content-Type": "Application/json" 
            } 
        }
    }
    
    /**
     * You get the information from a server.
     * @param {string} ip The ip to find information.
     * @returns {Promise<ServerInformation>} An information json object.
     */
    async server(ip: string): Promise<ServerInformation> {
        if(typeof ip != 'string') new Error("The ip must be a string I received " + typeof ip);
        const url = `https://api.mcsrvstat.us/2/${ip}`;
        const res = await fetch(url, this.options).catch(() => { throw Error("INVALID INTRODUCED IP.") });
        const json: ServerInformation = await res.json();
        return json;
    }
    /**
     * You get a history of nicknames
     * @param username The nickname to search for information.
     * @returns {Promise<NicknameHistory>} User nickname history
     */
    async history(username: string): Promise<NicknameHistory> {
        if (typeof username != 'string') TypeError("The ip must be a string I received " + typeof username)
        const url = "https://api.mojang.com/users/profiles/minecraft/" + username;
        const res = await fetch(url, this.options).then((res) => res.json()).catch(() => { TypeError("Username invalid."); });
        const url2 = `https://api.mojang.com/user/profiles/${res.id}/names`;
        const resHistory: NicknameHistory = await fetch(`${url2}`, this.options).then((res) => res.json());
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
        const dataFetch = await fetch(url1, this.options).then((res: any) => res.json()).catch(() => {
            new Error("Username invalid.");
        });
        const url2 = `https://crafatar.com/skins/${dataFetch.id}?size=4098&default=MHF_Steve&overlay`;
        const response = await fetch(url2, this.options);
        if (response.status !== 200) new Error("Error, nickname not found.");
        const buffer = await response.buffer();
        return buffer;
    }

    /**
    * It is used to obtain an image of the body of a skin.
    * @param username <Nickname to find>
    * @returns {Promise<Buffer>} Image link the body of a skin
    */

    async body(username: string): Promise<Buffer> {
        if(typeof username != 'string') new Error("The username must be a string I received " + typeof username);
        const dataFetch = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`, this.options).then((res: any) => res.json()).catch(() => { throw Error("Username invalid."); });
        const url2 = `https://crafatar.com/renders/body/${dataFetch.id}?size=4098&default=MHF_Steve&overlay`;
        const response = await fetch(url2, this.options);
        const buffer = await response.buffer();
        if (buffer) return buffer; else Error("Invalid nickname")
    };

    /**
    * Get all the nicknames or people who have liked the server
    * @param ip <Server to find>
    * @returns {Promise<number>} How many people have voted for a server
    */

    async namemcLikes(ip: string): Promise<number> {
        if(typeof ip != 'string') new Error("The ip must be a string I received " + typeof ip);
        const fetcheado = await fetch(`https://api.namemc.com/server/${ip}/likes`, this.options);
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
        const fetchResponse = await fetch(url, this.options);
        const response = await fetchResponse.buffer();
        return response;
    }

};
module.exports = { MCInfo }