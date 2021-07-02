const fetch = require("node-fetch");
const options = { method: "GET" };
class requestApi {
    constructor() {
    }
    /**
     * Obtienes la información de un servidor.
     * @param ip La ip a buscar información.
     * @returns {Promise<Pending>} Un objeto json de información.
     */
    async server(ip) {
        if (!ip)
            throw new Error("No se introducio ninguna ip");
        if (typeof ip != 'string')
            throw new Error("La ip debe ser una string.");
        const url = "https://api.mcsrvstat.us/2/";
        const res = await fetch(`${url}${ip}`, options).catch(() => { throw Error("IP INTRODUCIDA VALIDA."); });
        const json = await res.json();
        return json;
    }
    ;
    /**
     * Obtienes un historial de nicks
     * @param username El nickname a buscar información.
     * @returns {Promise<Pending>} Historial de nicknames del usuario
     */
    async history(username) {
        if (!username)
            throw new Error("No se ingreso ningun nickname.");
        const url1 = "https://api.mojang.com/users/profiles/minecraft/" + username;
        ;
        const dataFetch = await fetch(url1, options).then((res) => res.json())
            .catch(() => {
            throw new Error("Username invalido.");
        });
        const url2 = `https://api.mojang.com/user/profiles/${dataFetch.id}/names`;
        const res = await fetch(`${url2}`, options);
        const dataUrl = await res.json();
        return dataUrl;
    }
    ;
    /**
     * Sirve para obtener la skin de un usuario.
     * @param username <Nickname a buscar información>
     * @returns {Promise<Buffer>} Buffer de la imagen de la skin.
     */
    async skin(username) {
        const url1 = "https://api.mojang.com/users/profiles/minecraft/" + username;
        ;
        const dataFetch = await fetch(url1, options).then((res) => res.json()).catch(() => {
            throw new Error("Username invalido.");
        });
        const url2 = `https://crafatar.com/skins/${dataFetch.id}?size=4098&default=MHF_Steve&overlay`;
        const response = await fetch(url2, options);
        if (response.status !== 200)
            throw new Error("Error en la API, error de conexion.");
        const buffer = await response.buffer();
        return buffer;
    }
    /**
    * Sirve para poder obtener una imagen del cuerpo de una skin.
    * @param username <Nickname a buscar>
    * @returns {Promise<Pending>} Link de imagen el cuerpo de una skin
    */
    async body(username) {
        if (!username)
            throw new Error("No se ingreso una IP");
        const url1 = "https://api.mojang.com/users/profiles/minecraft/" + username;
        const dataFetch = await fetch(url1, options).then((res) => res.json()).catch(() => {
            throw new Error("Username invalido.");
        });
        const url2 = `https://crafatar.com/renders/body/${dataFetch.id}?size=4098&default=MHF_Steve&overlay`;
        const response = await fetch(url2, options);
        if (response.status !== 200)
            throw new Error("Error en la API, error de conexion.");
        const buffer = await response.buffer();
        return buffer;
    }
    ;
    /**
    * Obtienes todos los nicknames o personas que le han dado like al servidor
    * @param ipServer <Servidor a buscar>
    * @returns {Promise<Pending>} Todos los nicks de las personas que han dado like por el servidor, si supera los 500 respondera un numero
    */
    async namemcLikes(ipServer) {
        if (!ipServer)
            throw new Error("No se ingreso una IP");
        const fetcheado = await fetch(`https://api.namemc.com/server/${ipServer}/likes`, options);
        const response = await fetcheado.json();
        if (fetcheado.status == 404)
            throw new Error("No existe el servidor.");
        if (response.length >= 20) {
            return response.length;
        }
        else {
            const myArray = [];
            for (let i = 0; i < response.length; i++) {
                const valorSinJson = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${response[i]}`, options);
                const nicknameUsuario = await valorSinJson.json();
                myArray.push(nicknameUsuario.name);
            }
            return myArray;
        }
    }
    ;
    /**
     * Obtienes el icono de un servidor.
     * @param ipServer Ip del servidor
     * @returns {Promise<Buffer>} Icono del servidor
     */
    async icon(ipServer) {
        if (!ipServer)
            throw new Error("No se ingreso ningun servidor.");
        if (typeof ipServer != 'string')
            throw new Error("La ip del servidor debe ser tipo string.");
        ;
        const url = `https://api.mcsrvstat.us/icon/${ipServer}`;
        const fetchResponse = await fetch(url, options);
        const response = await fetchResponse.buffer();
        return response;
    }
}
;
module.exports = { requestApi };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sT0FBTyxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFBO0FBQ2pDLE1BQU0sVUFBVTtJQUNaO0lBQ0EsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQVU7UUFDbkIsSUFBSSxDQUFDLEVBQUU7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDeEQsSUFBRyxPQUFPLEVBQUUsSUFBSSxRQUFRO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO1FBQ3ZFLE1BQU0sR0FBRyxHQUFHLDZCQUE2QixDQUFDO1FBQzFDLE1BQU0sR0FBRyxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkcsTUFBTSxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDOUIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUFBLENBQUM7SUFDRjs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFnQjtRQUMxQixJQUFJLENBQUMsUUFBUTtZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUNqRSxNQUFNLElBQUksR0FBRyxrREFBa0QsR0FBRyxRQUFRLENBQUM7UUFBQSxDQUFDO1FBQzVFLE1BQU0sU0FBUyxHQUFHLE1BQU0sS0FBSyxDQUFDLElBQUksRUFBRSxPQUFP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QUM5QyxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0NBRUo7QUFBQSxDQUFDO0FBQ0YsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLFVBQVUsRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZmV0Y2ggPSByZXF1aXJlKFwibm9kZS1mZXRjaFwiKTtcclxuY29uc3Qgb3B0aW9ucyA9IHsgbWV0aG9kOiBcIkdFVFwiIH1cclxuY2xhc3MgcmVxdWVzdEFwaSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBPYnRpZW5lcyBsYSBpbmZvcm1hY2nDs24gZGUgdW4gc2Vydmlkb3IuXHJcbiAgICAgKiBAcGFyYW0gaXAgTGEgaXAgYSBidXNjYXIgaW5mb3JtYWNpw7NuLlxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8UGVuZGluZz59IFVuIG9iamV0byBqc29uIGRlIGluZm9ybWFjacOzbi5cclxuICAgICAqL1xyXG4gICAgYXN5bmMgc2VydmVyKGlwOiBzdHJpbmcpOiBQcm9taXNlPE9iamVjdD4ge1xyXG4gICAgICAgIGlmICghaXApIHRocm93IG5ldyBFcnJvcihcIk5vIHNlIGludHJvZHVjaW8gbmluZ3VuYSBpcFwiKTtcclxuICAgICAgICBpZih0eXBlb2YgaXAgIT0gJ3N0cmluZycpIHRocm93IG5ldyBFcnJvcihcIkxhIGlwIGRlYmUgc2VyIHVuYSBzdHJpbmcuXCIpXHJcbiAgICAgICAgY29uc3QgdXJsID0gXCJodHRwczovL2FwaS5tY3NydnN0YXQudXMvMi9cIjtcclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHt1cmx9JHtpcH1gLCBvcHRpb25zKS5jYXRjaCgoKSA9PiB7IHRocm93IEVycm9yKFwiSVAgSU5UUk9EVUNJREEgVkFMSURBLlwiKSB9KTtcclxuICAgICAgICBjb25zdCBqc29uID0gYXdhaXQgcmVzLmpzb24oKTtcclxuICAgICAgICByZXR1cm4ganNvbjtcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIE9idGllbmVzIHVuIGhpc3RvcmlhbCBkZSBuaWNrc1xyXG4gICAgICogQHBhcmFtIHVzZXJuYW1lIEVsIG5pY2tuYW1lIGEgYnVzY2FyIGluZm9ybWFjacOzbi5cclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFBlbmRpbmc+fSBIaXN0b3JpYWwgZGUgbmlja25hbWVzIGRlbCB1c3VhcmlvXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGhpc3RvcnkodXNlcm5hbWU6IHN0cmluZyk6IFByb21pc2U8T2JqZWN0PiB7XHJcbiAgICAgICAgaWYgKCF1c2VybmFtZSkgdGhyb3cgbmV3IEVycm9yKFwiTm8gc2UgaW5ncmVzbyBuaW5ndW4gbmlja25hbWUuXCIpO1xyXG4gICAgICAgIGNvbnN0IHVybDEgPSBcImh0dHBzOi8vYXBpLm1vamFuZy5jb20vdXNlcnMvcHJvZmlsZXMvbWluZWNyYWZ0L1wiICsgdXNlcm5hbWU7O1xyXG4gICAgICAgIGNvbnN0IGRhdGFGZXRjaCA9IGF3YWl0IGZldGNoKHVybDEsIG9wdGlvbnMpLnRoZW4oKHJlczogeyBqc29uOiAoKSA9PiBhbnk7IH0pID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVc2VybmFtZSBpbnZhbGlkby5cIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHVybDIgPSBgaHR0cHM6Ly9hcGkubW9qYW5nLmNvbS91c2VyL3Byb2ZpbGVzLyR7ZGF0YUZldGNoLmlkfS9uYW1lc2A7XHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYCR7dXJsMn1gLCBvcHRpb25zKTtcclxuICAgICAgICBjb25zdCBkYXRhVXJsID0gYXdhaXQgcmVzLmpzb24oKTtcclxuICAgICAgICByZXR1cm4gZGF0YVVybDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTaXJ2ZSBwYXJhIG9idGVuZXIgbGEgc2tpbiBkZSB1biB1c3VhcmlvLlxyXG4gICAgICogQHBhcmFtIHVzZXJuYW1lIDxOaWNrbmFtZSBhIGJ1c2NhciBpbmZvcm1hY2nDs24+XHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCdWZmZXI+fSBCdWZmZXIgZGUgbGEgaW1hZ2VuIGRlIGxhIHNraW4uXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIHNraW4odXNlcm5hbWU6IHN0cmluZyk6IFByb21pc2U8QnVmZmVyPiB7XHJcbiAgICAgICAgY29uc3QgdXJsMSA9IFwiaHR0cHM6Ly9hcGkubW9qYW5nLmNvbS91c2Vycy9wcm9maWxlcy9taW5lY3JhZnQvXCIgKyB1c2VybmFtZTs7XHJcbiAgICAgICAgY29uc3QgZGF0YUZldGNoID0gYXdhaXQgZmV0Y2godXJsMSwgb3B0aW9ucykudGhlbigocmVzOiBhbnkpID0+IHJlcy5qc29uKCkpLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVXNlcm5hbWUgaW52YWxpZG8uXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgXHJcbiAgICAgICAgY29uc3QgdXJsMiA9IGBodHRwczovL2NyYWZhdGFyLmNvbS9za2lucy8ke2RhdGFGZXRjaC5pZH0/c2l6ZT00MDk4JmRlZmF1bHQ9TUhGX1N0ZXZlJm92ZXJsYXlgO1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsMiwgb3B0aW9ucyk7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciBlbiBsYSBBUEksIGVycm9yIGRlIGNvbmV4aW9uLlwiKVxyXG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IGF3YWl0IHJlc3BvbnNlLmJ1ZmZlcigpO1xyXG4gICAgICAgIHJldHVybiBidWZmZXI7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogU2lydmUgcGFyYSBwb2RlciBvYnRlbmVyIHVuYSBpbWFnZW4gZGVsIGN1ZXJwbyBkZSB1bmEgc2tpbi5cclxuICAgICogQHBhcmFtIHVzZXJuYW1lIDxOaWNrbmFtZSBhIGJ1c2Nhcj5cclxuICAgICogQHJldHVybnMge1Byb21pc2U8UGVuZGluZz59IExpbmsgZGUgaW1hZ2VuIGVsIGN1ZXJwbyBkZSB1bmEgc2tpblxyXG4gICAgKi9cclxuXHJcbiAgICBhc3luYyBib2R5KHVzZXJuYW1lOiBzdHJpbmcpOiBQcm9taXNlPEJ1ZmZlcj4ge1xyXG4gICAgICAgIGlmICghdXNlcm5hbWUpIHRocm93IG5ldyBFcnJvcihcIk5vIHNlIGluZ3Jlc28gdW5hIElQXCIpO1xyXG4gICAgICAgIGNvbnN0IHVybDEgPSBcImh0dHBzOi8vYXBpLm1vamFuZy5jb20vdXNlcnMvcHJvZmlsZXMvbWluZWNyYWZ0L1wiICsgdXNlcm5hbWU7XHJcblxyXG5cclxuICAgICAgICBjb25zdCBkYXRhRmV0Y2ggPSBhd2FpdCBmZXRjaCh1cmwxLCBvcHRpb25zKS50aGVuKChyZXM6IGFueSkgPT4gcmVzLmpzb24oKSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVc2VybmFtZSBpbnZhbGlkby5cIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgdXJsMiA9IGBodHRwczovL2NyYWZhdGFyLmNvbS9yZW5kZXJzL2JvZHkvJHtkYXRhRmV0Y2guaWR9P3NpemU9NDA5OCZkZWZhdWx0PU1IRl9TdGV2ZSZvdmVybGF5YDtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybDIsIG9wdGlvbnMpO1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IgZW4gbGEgQVBJLCBlcnJvciBkZSBjb25leGlvbi5cIilcclxuICAgICAgICBjb25zdCBidWZmZXIgPSBhd2FpdCByZXNwb25zZS5idWZmZXIoKTtcclxuICAgICAgICByZXR1cm4gYnVmZmVyO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICogT2J0aWVuZXMgdG9kb3MgbG9zIG5pY2tuYW1lcyBvIHBlcnNvbmFzIHF1ZSBsZSBoYW4gZGFkbyBsaWtlIGFsIHNlcnZpZG9yXHJcbiAgICAqIEBwYXJhbSBpcFNlcnZlciA8U2Vydmlkb3IgYSBidXNjYXI+XHJcbiAgICAqIEByZXR1cm5zIHtQcm9taXNlPFBlbmRpbmc+fSBUb2RvcyBsb3Mgbmlja3MgZGUgbGFzIHBlcnNvbmFzIHF1ZSBoYW4gZGFkbyBsaWtlIHBvciBlbCBzZXJ2aWRvciwgc2kgc3VwZXJhIGxvcyA1MDAgcmVzcG9uZGVyYSB1biBudW1lcm9cclxuICAgICovXHJcblxyXG4gICAgYXN5bmMgbmFtZW1jTGlrZXMoaXBTZXJ2ZXI6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgaWYgKCFpcFNlcnZlcikgdGhyb3cgbmV3IEVycm9yKFwiTm8gc2UgaW5ncmVzbyB1bmEgSVBcIik7XHJcbiAgICAgICAgY29uc3QgZmV0Y2hlYWRvID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLm5hbWVtYy5jb20vc2VydmVyLyR7aXBTZXJ2ZXJ9L2xpa2VzYCwgb3B0aW9ucyk7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaGVhZG8uanNvbigpO1xyXG4gICAgICAgIGlmIChmZXRjaGVhZG8uc3RhdHVzID09IDQwNCkgdGhyb3cgbmV3IEVycm9yKFwiTm8gZXhpc3RlIGVsIHNlcnZpZG9yLlwiKTtcclxuICAgICAgICBpZiAocmVzcG9uc2UubGVuZ3RoID49IDIwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5sZW5ndGg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgbXlBcnJheSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3BvbnNlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxvclNpbkpzb24gPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9zZXNzaW9uc2VydmVyLm1vamFuZy5jb20vc2Vzc2lvbi9taW5lY3JhZnQvcHJvZmlsZS8ke3Jlc3BvbnNlW2ldfWAsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgbmlja25hbWVVc3VhcmlvID0gYXdhaXQgdmFsb3JTaW5Kc29uLmpzb24oKTtcclxuICAgICAgICAgICAgICAgIG15QXJyYXkucHVzaChuaWNrbmFtZVVzdWFyaW8ubmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG15QXJyYXk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE9idGllbmVzIGVsIGljb25vIGRlIHVuIHNlcnZpZG9yLlxyXG4gICAgICogQHBhcmFtIGlwU2VydmVyIElwIGRlbCBzZXJ2aWRvclxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QnVmZmVyPn0gSWNvbm8gZGVsIHNlcnZpZG9yXHJcbiAgICAgKi9cclxuXHJcbiAgICBhc3luYyBpY29uKGlwU2VydmVyOiBTdHJpbmcpOiBQcm9taXNlPEJ1ZmZlcj4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKCFpcFNlcnZlcikgdGhyb3cgbmV3IEVycm9yKFwiTm8gc2UgaW5ncmVzbyBuaW5ndW4gc2Vydmlkb3IuXCIpO1xyXG4gICAgICAgIGlmKHR5cGVvZiBpcFNlcnZlciAhPSAnc3RyaW5nJykgdGhyb3cgbmV3IEVycm9yKFwiTGEgaXAgZGVsIHNlcnZpZG9yIGRlYmUgc2VyIHRpcG8gc3RyaW5nLlwiKTtcclxuICAgICAgICA7XHJcblxyXG4gICAgICAgIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS5tY3NydnN0YXQudXMvaWNvbi8ke2lwU2VydmVyfWA7XHJcbiAgICAgICAgY29uc3QgZmV0Y2hSZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaFJlc3BvbnNlLmJ1ZmZlcigpO1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0geyByZXF1ZXN0QXBpIH0iXX0=