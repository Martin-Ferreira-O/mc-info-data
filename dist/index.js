"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const options = { method: "GET", headers: { "Content-Type": "Application/json" } };
class requestApi {
    constructor() {
    }
    /**
     * You get the information from a server.
     * @param ip The ip to find information.
     * @returns {Promise<ServerInformation>} An information json object.
     */
    async server(ip) {
        if (typeof ip != 'string')
            new Error("The ip must be a string I received " + typeof ip);
        const url = `https://api.mcsrvstat.us/2/${ip}`;
        const res = await node_fetch_1.default(url, options).catch(() => { throw Error("INVALID INTRODUCED IP."); });
        const json = await res.json();
        return json;
    }
    /**
     * You get a history of nicknames
     * @param username The nickname to search for information.
     * @returns {Promise<NicknameHistory>} User nickname history
     */
    async history(username) {
        if (typeof username != 'string')
            TypeError("The ip must be a string I received " + typeof username);
        const url = "https://api.mojang.com/users/profiles/minecraft/" + username;
        const res = await node_fetch_1.default(url, options).then((res) => res.json()).catch(() => { TypeError("Username invalid."); });
        const url2 = `https://api.mojang.com/user/profiles/${res.id}/names`;
        const resHistory = await node_fetch_1.default(`${url2}`, options).then((res) => res.json());
        return resHistory;
    }
    ;
    /**
     * It is used to obtain the skin of a user.
     * @param username <Nickname to find information>
     * @returns {Promise<Buffer>} Skin image buffer.
     */
    async skin(username) {
        if (typeof username != 'string')
            new Error("The username must be a string I received " + typeof username);
        const url1 = "https://api.mojang.com/users/profiles/minecraft/" + username;
        ;
        const dataFetch = await node_fetch_1.default(url1, options).then((res) => res.json()).catch(() => {
            new Error("Username invalid.");
        });
        const url2 = `https://crafatar.com/skins/${dataFetch.id}?size=4098&default=MHF_Steve&overlay`;
        const response = await node_fetch_1.default(url2, options);
        if (response.status !== 200)
            new Error("Error, nickname not found.");
        const buffer = await response.buffer();
        return buffer;
    }
    /**
    * It is used to obtain an image of the body of a skin.
    * @param username <Nickname to find>
    * @returns {Promise<Buffer>} Image link the body of a skin
    */
    async body(username) {
        if (typeof username != 'string')
            new Error("The username must be a string I received " + typeof username);
        const url1 = "https://api.mojang.com/users/profiles/minecraft/" + username;
        const dataFetch = await node_fetch_1.default(url1, options).then((res) => res.json()).catch(() => {
            new Error("Username invalid.");
        });
        const url2 = `https://crafatar.com/renders/body/${dataFetch.id}?size=4098&default=MHF_Steve&overlay`;
        const response = await node_fetch_1.default(url2, options);
        const buffer = await response.buffer();
        if (buffer)
            return buffer;
        else
            Error("Invalid nickname");
    }
    ;
    /**
    * Get all the nicknames or people who have liked the server
    * @param ip <Server to find>
    * @returns {Promise<number>} How many people have voted for a server
    */
    async namemcLikes(ip) {
        if (typeof ip != 'string')
            new Error("The ip must be a string I received " + typeof ip);
        const fetcheado = await node_fetch_1.default(`https://api.namemc.com/server/${ip}/likes`, options);
        const response = await fetcheado.json();
        if (fetcheado.status === 404)
            new Error("Server doesn't exist.");
        return response.length;
    }
    ;
    /**
     * Get the icon of the server
     * @param ip Server IP
     * @returns {Promise<Buffer>} Server Icon Buffer
     */
    async icon(ip) {
        if (typeof ip != 'string')
            new Error("The ip must be a string I received " + typeof ip);
        const url = `https://api.mcsrvstat.us/icon/${ip}`;
        const fetchResponse = await node_fetch_1.default(url, options);
        const response = await fetchResponse.buffer();
        return response;
    }
}
;
module.exports = { requestApi };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBK0I7QUFFL0IsTUFBTSxPQUFPLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxFQUFFLENBQUM7QUFDbkYsTUFBTSxVQUFVO0lBQ1o7SUFDQSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBVTtRQUNuQixJQUFHLE9BQU8sRUFBRSxJQUFJLFFBQVE7WUFBRSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZGLE1BQU0sR0FBRyxHQUFHLDhCQUE4QixFQUFFLEVBQUUsQ0FBQztRQUMvQyxNQUFNLEdBQUcsR0FBRyxNQUFNLG9CQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0YsTUFBTSxJQUFJLEdBQXNCLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFnQjtRQUMxQixJQUFJLE9BQU8sUUFBUSxJQUFJLFFBQVE7WUFBRSxTQUFTLENBQUMscUNBQXFDLEdBQUcsT0FBTyxRQUFRLENBQUMsQ0FBQTtRQUNuRyxNQUFNLEdBQUcsR0FBRyxrREFBa0QsR0FBRyxRQUFRLENBQUM7UUFDMUUsTUFBTSxHQUFHLEdBQUcsTUFBTSxvQkFBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FB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QUUsT0FBTyxDQUFDLENBQUM7UUFDcEYsTUFBTSxRQUFRLEdBQUcsTUFBTSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEMsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLEdBQUc7WUFBRSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBRXJFLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBQUEsQ0FBQztJQUVGOzs7O09BSUc7SUFFSCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQVU7UUFDakIsSUFBRyxPQUFPLEVBQUUsSUFBSSxRQUFRO1lBQUUsSUFBSSxLQUFLLENBQUMscUNBQXFDLEdBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN2RixNQUFNLEdBQUcsR0FBRyxpQ0FBaUMsRUFBRSxFQUFFLENBQUM7UUFDbEQsTUFBTSxhQUFhLEdBQUcsTUFBTSxvQkFBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNoRCxNQUFNLFFBQVEsR0FBRyxNQUFNLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM5QyxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0NBRUo7QUFBQSxDQUFDO0FBQ0YsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLFVBQVUsRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZldGNoIGZyb20gJ25vZGUtZmV0Y2gnO1xyXG5pbXBvcnQgeyBTZXJ2ZXJJbmZvcm1hdGlvbiwgTmlja25hbWVIaXN0b3J5IH0gZnJvbSAnLi9pbnRlcmZhY2VzL2luZGV4JztcclxuY29uc3Qgb3B0aW9ucyA9IHsgbWV0aG9kOiBcIkdFVFwiLCBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiQXBwbGljYXRpb24vanNvblwiIH0gfTtcclxuY2xhc3MgcmVxdWVzdEFwaSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBZb3UgZ2V0IHRoZSBpbmZvcm1hdGlvbiBmcm9tIGEgc2VydmVyLlxyXG4gICAgICogQHBhcmFtIGlwIFRoZSBpcCB0byBmaW5kIGluZm9ybWF0aW9uLlxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8U2VydmVySW5mb3JtYXRpb24+fSBBbiBpbmZvcm1hdGlvbiBqc29uIG9iamVjdC5cclxuICAgICAqL1xyXG4gICAgYXN5bmMgc2VydmVyKGlwOiBzdHJpbmcpOiBQcm9taXNlPFNlcnZlckluZm9ybWF0aW9uPiB7XHJcbiAgICAgICAgaWYodHlwZW9mIGlwICE9ICdzdHJpbmcnKSBuZXcgRXJyb3IoXCJUaGUgaXAgbXVzdCBiZSBhIHN0cmluZyBJIHJlY2VpdmVkIFwiICsgdHlwZW9mIGlwKTtcclxuICAgICAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly9hcGkubWNzcnZzdGF0LnVzLzIvJHtpcH1gO1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucykuY2F0Y2goKCkgPT4geyB0aHJvdyBFcnJvcihcIklOVkFMSUQgSU5UUk9EVUNFRCBJUC5cIikgfSk7XHJcbiAgICAgICAgY29uc3QganNvbjogU2VydmVySW5mb3JtYXRpb24gPSBhd2FpdCByZXMuanNvbigpO1xyXG4gICAgICAgIHJldHVybiBqc29uO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBZb3UgZ2V0IGEgaGlzdG9yeSBvZiBuaWNrbmFtZXNcclxuICAgICAqIEBwYXJhbSB1c2VybmFtZSBUaGUgbmlja25hbWUgdG8gc2VhcmNoIGZvciBpbmZvcm1hdGlvbi5cclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPE5pY2tuYW1lSGlzdG9yeT59IFVzZXIgbmlja25hbWUgaGlzdG9yeVxyXG4gICAgICovXHJcbiAgICBhc3luYyBoaXN0b3J5KHVzZXJuYW1lOiBzdHJpbmcpOiBQcm9taXNlPE5pY2tuYW1lSGlzdG9yeT4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdXNlcm5hbWUgIT0gJ3N0cmluZycpIFR5cGVFcnJvcihcIlRoZSBpcCBtdXN0IGJlIGEgc3RyaW5nIEkgcmVjZWl2ZWQgXCIgKyB0eXBlb2YgdXNlcm5hbWUpXHJcbiAgICAgICAgY29uc3QgdXJsID0gXCJodHRwczovL2FwaS5tb2phbmcuY29tL3VzZXJzL3Byb2ZpbGVzL21pbmVjcmFmdC9cIiArIHVzZXJuYW1lO1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucykudGhlbigocmVzKSA9PiByZXMuanNvbigpKS5jYXRjaCgoKSA9PiB7IFR5cGVFcnJvcihcIlVzZXJuYW1lIGludmFsaWQuXCIpOyB9KTtcclxuICAgICAgICBjb25zdCB1cmwyID0gYGh0dHBzOi8vYXBpLm1vamFuZy5jb20vdXNlci9wcm9maWxlcy8ke3Jlcy5pZH0vbmFtZXNgO1xyXG4gICAgICAgIGNvbnN0IHJlc0hpc3Rvcnk6IE5pY2tuYW1lSGlzdG9yeSA9IGF3YWl0IGZldGNoKGAke3VybDJ9YCwgb3B0aW9ucykudGhlbigocmVzKSA9PiByZXMuanNvbigpKTtcclxuICAgICAgICByZXR1cm4gcmVzSGlzdG9yeTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJdCBpcyB1c2VkIHRvIG9idGFpbiB0aGUgc2tpbiBvZiBhIHVzZXIuXHJcbiAgICAgKiBAcGFyYW0gdXNlcm5hbWUgPE5pY2tuYW1lIHRvIGZpbmQgaW5mb3JtYXRpb24+XHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCdWZmZXI+fSBTa2luIGltYWdlIGJ1ZmZlci5cclxuICAgICAqL1xyXG4gICAgYXN5bmMgc2tpbih1c2VybmFtZTogc3RyaW5nKTogUHJvbWlzZTxCdWZmZXI+IHtcclxuICAgICAgICBpZih0eXBlb2YgdXNlcm5hbWUgIT0gJ3N0cmluZycpIG5ldyBFcnJvcihcIlRoZSB1c2VybmFtZSBtdXN0IGJlIGEgc3RyaW5nIEkgcmVjZWl2ZWQgXCIgKyB0eXBlb2YgdXNlcm5hbWUpO1xyXG4gICAgICAgIGNvbnN0IHVybDEgPSBcImh0dHBzOi8vYXBpLm1vamFuZy5jb20vdXNlcnMvcHJvZmlsZXMvbWluZWNyYWZ0L1wiICsgdXNlcm5hbWU7O1xyXG4gICAgICAgIGNvbnN0IGRhdGFGZXRjaCA9IGF3YWl0IGZldGNoKHVybDEsIG9wdGlvbnMpLnRoZW4oKHJlczogYW55KSA9PiByZXMuanNvbigpKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIG5ldyBFcnJvcihcIlVzZXJuYW1lIGludmFsaWQuXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHVybDIgPSBgaHR0cHM6Ly9jcmFmYXRhci5jb20vc2tpbnMvJHtkYXRhRmV0Y2guaWR9P3NpemU9NDA5OCZkZWZhdWx0PU1IRl9TdGV2ZSZvdmVybGF5YDtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybDIsIG9wdGlvbnMpO1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkgbmV3IEVycm9yKFwiRXJyb3IsIG5pY2tuYW1lIG5vdCBmb3VuZC5cIik7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyID0gYXdhaXQgcmVzcG9uc2UuYnVmZmVyKCk7XHJcbiAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogSXQgaXMgdXNlZCB0byBvYnRhaW4gYW4gaW1hZ2Ugb2YgdGhlIGJvZHkgb2YgYSBza2luLlxyXG4gICAgKiBAcGFyYW0gdXNlcm5hbWUgPE5pY2tuYW1lIHRvIGZpbmQ+XHJcbiAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJ1ZmZlcj59IEltYWdlIGxpbmsgdGhlIGJvZHkgb2YgYSBza2luXHJcbiAgICAqL1xyXG5cclxuICAgIGFzeW5jIGJvZHkodXNlcm5hbWU6IHN0cmluZyk6IFByb21pc2U8QnVmZmVyPiB7XHJcbiAgICAgICAgaWYodHlwZW9mIHVzZXJuYW1lICE9ICdzdHJpbmcnKSBuZXcgRXJyb3IoXCJUaGUgdXNlcm5hbWUgbXVzdCBiZSBhIHN0cmluZyBJIHJlY2VpdmVkIFwiICsgdHlwZW9mIHVzZXJuYW1lKTtcclxuICAgICAgICBjb25zdCB1cmwxID0gXCJodHRwczovL2FwaS5tb2phbmcuY29tL3VzZXJzL3Byb2ZpbGVzL21pbmVjcmFmdC9cIiArIHVzZXJuYW1lO1xyXG5cclxuICAgICAgICBjb25zdCBkYXRhRmV0Y2ggPSBhd2FpdCBmZXRjaCh1cmwxLCBvcHRpb25zKS50aGVuKChyZXM6IGFueSkgPT4gcmVzLmpzb24oKSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICBuZXcgRXJyb3IoXCJVc2VybmFtZSBpbnZhbGlkLlwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCB1cmwyID0gYGh0dHBzOi8vY3JhZmF0YXIuY29tL3JlbmRlcnMvYm9keS8ke2RhdGFGZXRjaC5pZH0/c2l6ZT00MDk4JmRlZmF1bHQ9TUhGX1N0ZXZlJm92ZXJsYXlgO1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsMiwgb3B0aW9ucyk7XHJcbiAgICAgICAgY29uc3QgYnVmZmVyID0gYXdhaXQgcmVzcG9uc2UuYnVmZmVyKCk7XHJcbiAgICAgICAgaWYgKGJ1ZmZlcikgcmV0dXJuIGJ1ZmZlcjsgZWxzZSBFcnJvcihcIkludmFsaWQgbmlja25hbWVcIilcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEdldCBhbGwgdGhlIG5pY2tuYW1lcyBvciBwZW9wbGUgd2hvIGhhdmUgbGlrZWQgdGhlIHNlcnZlclxyXG4gICAgKiBAcGFyYW0gaXAgPFNlcnZlciB0byBmaW5kPlxyXG4gICAgKiBAcmV0dXJucyB7UHJvbWlzZTxudW1iZXI+fSBIb3cgbWFueSBwZW9wbGUgaGF2ZSB2b3RlZCBmb3IgYSBzZXJ2ZXJcclxuICAgICovXHJcblxyXG4gICAgYXN5bmMgbmFtZW1jTGlrZXMoaXA6IHN0cmluZyk6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICAgICAgaWYodHlwZW9mIGlwICE9ICdzdHJpbmcnKSBuZXcgRXJyb3IoXCJUaGUgaXAgbXVzdCBiZSBhIHN0cmluZyBJIHJlY2VpdmVkIFwiICsgdHlwZW9mIGlwKTtcclxuICAgICAgICBjb25zdCBmZXRjaGVhZG8gPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkubmFtZW1jLmNvbS9zZXJ2ZXIvJHtpcH0vbGlrZXNgLCBvcHRpb25zKTtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoZWFkby5qc29uKCk7XHJcbiAgICAgICAgaWYgKGZldGNoZWFkby5zdGF0dXMgPT09IDQwNCkgbmV3IEVycm9yKFwiU2VydmVyIGRvZXNuJ3QgZXhpc3QuXCIpO1xyXG5cclxuICAgIHJldHVybiByZXNwb25zZS5sZW5ndGg7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBpY29uIG9mIHRoZSBzZXJ2ZXJcclxuICAgICAqIEBwYXJhbSBpcCBTZXJ2ZXIgSVBcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPEJ1ZmZlcj59IFNlcnZlciBJY29uIEJ1ZmZlclxyXG4gICAgICovXHJcblxyXG4gICAgYXN5bmMgaWNvbihpcDogU3RyaW5nKTogUHJvbWlzZTxCdWZmZXI+IHtcclxuICAgICAgICBpZih0eXBlb2YgaXAgIT0gJ3N0cmluZycpIG5ldyBFcnJvcihcIlRoZSBpcCBtdXN0IGJlIGEgc3RyaW5nIEkgcmVjZWl2ZWQgXCIgKyB0eXBlb2YgaXApO1xyXG4gICAgICAgIGNvbnN0IHVybCA9IGBodHRwczovL2FwaS5tY3NydnN0YXQudXMvaWNvbi8ke2lwfWA7XHJcbiAgICAgICAgY29uc3QgZmV0Y2hSZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaFJlc3BvbnNlLmJ1ZmZlcigpO1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgIH1cclxuXHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0geyByZXF1ZXN0QXBpIH0iXX0=