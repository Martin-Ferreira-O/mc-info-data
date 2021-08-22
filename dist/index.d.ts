/// <reference types="node" />
import { NicknameHistory, ServerInformation } from "./interfaces";
declare class MCInfo {
    /**
     * You get the information from a server.
     * @param {string} ip The ip to find information.
     * @returns {Promise<ServerInformation>} An information json object.
     */
    server(ip: string): Promise<ServerInformation>;
    /**
     * You get a history of nicknames
     * @param username The nickname to search for information.
     * @returns {Promise<NicknameHistory>} User nickname history
     */
    history(username: string): Promise<NicknameHistory>;
    /**
     * It is used to obtain the skin of a user.
     * @param username <Nickname to find information>
     * @returns {Promise<Buffer>} Skin image buffer.
     */
    skin(username: string): Promise<Buffer>;
    /**
     * It is used to obtain an image of the body of a skin.
     * @param username <Nickname to find>
     * @returns {Promise<Buffer>} Image link the body of a skin
     */
    body(username: string): Promise<Buffer>;
    /**
     * Get all the nicknames or people who have liked the server
     * @param ip <Server to find>
     * @returns {Promise<number>} How many people have voted for a server
     */
    namemcLikes(ip: string): Promise<number>;
    /**
     * Get the icon of the server
     * @param ip Server IP
     * @returns {Promise<Buffer>} Server Icon Buffer
     */
    icon(ip: String): Promise<Buffer>;
}
export { MCInfo };
//# sourceMappingURL=index.d.ts.map