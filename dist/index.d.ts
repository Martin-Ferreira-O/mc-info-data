/// <reference types="node" />
declare const fetch: any;
declare const options: {
    method: string;
};
declare class requestApi {
    constructor();
    /**
     * Obtienes la información de un servidor.
     * @param ip La ip a buscar información.
     * @returns {Promise<Pending>} Un objeto json de información.
     */
    server(ip: string): Promise<Object>;
    /**
     * Obtienes un historial de nicks
     * @param username El nickname a buscar información.
     * @returns {Promise<Pending>} Historial de nicknames del usuario
     */
    history(username: string): Promise<Object>;
    /**
     * Sirve para obtener la skin de un usuario.
     * @param username <Nickname a buscar información>
     * @returns {Promise<Buffer>} Buffer de la imagen de la skin.
     */
    skin(username: string): Promise<Buffer>;
    /**
    * Sirve para poder obtener una imagen del cuerpo de una skin.
    * @param username <Nickname a buscar>
    * @returns {Promise<Pending>} Link de imagen el cuerpo de una skin
    */
    body(username: string): Promise<Buffer>;
    /**
    * Obtienes todos los nicknames o personas que le han dado like al servidor
    * @param ipServer <Servidor a buscar>
    * @returns {Promise<Pending>} Todos los nicks de las personas que han dado like por el servidor, si supera los 500 respondera un numero
    */
    namemcLikes(ipServer: string): Promise<any>;
    /**
     * Obtienes el icono de un servidor.
     * @param ipServer Ip del servidor
     * @returns {Promise<Buffer>} Icono del servidor
     */
    icon(ipServer: String): Promise<Buffer>;
}
//# sourceMappingURL=index.d.ts.map