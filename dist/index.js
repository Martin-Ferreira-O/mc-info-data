"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const options = {
    method: "GET",
    headers: {
        "Content-Type": "Application/json"
    }
};
class MCInfo {
    constructor() {
    }
    /**
     * You get the information from a server.
     * @param {string} ip The ip to find information.
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
        const dataFetch = await node_fetch_1.default(`https://api.mojang.com/users/profiles/minecraft/${username}`, options).then((res) => res.json()).catch(() => { throw Error("Username invalid."); });
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
module.exports = { MCInfo };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBK0I7QUFFL0IsTUFBTSxPQUFPLEdBQUc7SUFDWixNQUFNLEVBQUUsS0FBSztJQUNiLE9BQU8sRUFBRTtRQUNMLGNBQWMsRUFBRSxrQkFBa0I7S0FDckM7Q0FDSixDQUFDO0FBQ0YsTUFBTSxNQUFNO0lBQ1I7SUFDQSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBVTtRQUNuQixJQUFHLE9BQU8sRUFBRSxJQUFJLFFBQVE7WUFBRSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZGLE1BQU0sR0FBRyxHQUFHLDhCQUE4QixFQUFFLEVBQUUsQ0FBQztRQUMvQyxNQUFNLEdBQUcsR0FBRyxNQUFNLG9CQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0YsTUFBTSxJQUFJLEdBQXNCLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFnQjtRQUMxQixJQUFJLE9BQU8sUUFBUSxJQUFJLFFBQVE7WUFBRSxTQUFTLENBQUMscUNBQXFDLEdBQUcsT0FBTyxRQUFRLENBQUMsQ0FBQTtRQUNuRyxNQUFNLEdBQUcsR0FBRyxrREFBa0QsR0FBRyxRQUFRLENBQUM7UUFDMUUsTUFBTSxHQUFHLEdBQUcsTUFBTSxvQkFBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pILE1BQU0sSUFBSSxHQUFHLHdDQUF3QyxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUM7UUFDcEUsTUFBTSxVQUFVLEdBQW9CLE1BQU0sb0JBQUssQ0FBQyxHQUFHLElBQUksRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDOUYsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUFBLENBQUM7SUFFRjs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFnQjtRQUN2QixJQUFHLE9BQU8sUUFBUSxJQUFJLFFBQVE7WUFBRSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsR0FBRyxPQUFPLFFBQVEsQ0FBQyxDQUFDO1FBQ3pHLE1BQU0sSUFBSSxHQUFHLGtEQUFrRCxHQUFHLFFBQVEsQ0FBQztRQUFBLENBQUM7UUFDNUUsTUFBTSxTQUFTLEdBQUcsTUFBTSxvQkFBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDbkYsSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxHQUFHLDhCQUE4QixTQUFTLENBQUMsRUFBRSxzQ0FBc0MsQ0FBQztRQUM5RixNQUFNLFFBQVEsR0FBRyxNQUFNLG9CQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHO1lBQUUsSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUNyRSxNQUFNLE1BQU0sR0FBRyxNQUFNLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN2QyxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7TUFJRTtJQUVGLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBZ0I7UUFDdkIsSUFBRyxPQUFPLFFBQVEsSUFBSSxRQUFRO1lBQUUsSUFBSSxLQUFLLENBQUMsMkNBQTJDLEdBQUcsT0FBTyxRQUFRLENBQUMsQ0FBQztRQUN6RyxNQUFNLFNBQVMsR0FBRyxNQUFNLG9CQUFLLENBQUMsbURBQW1ELFFBQVEsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4TCxNQUFNLElBQUksR0FBRyxxQ0FBcUMsU0FBUyxDQUFDLEVBQUUsc0NBQXNDLENBQUM7UUFDckcsTUFBTSxRQUFRLEdBQUcsTUFBTSxvQkFBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM1QyxNQUFNLE1BQU0sR0FBRyxNQUFNLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN2QyxJQUFJLE1BQU07WUFBRSxPQUFPLE1BQU0sQ0FBQzs7WUFBTSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtJQUM3RCxDQUFDO0lBQUEsQ0FBQztJQUVGOzs7O01BSUU7SUFFRixLQUFLLENBQUMsV0FBVyxDQUFDLEVBQVU7UUFDeEIsSUFBRyxPQUFPLEVBQUUsSUFBSSxRQUFRO1lBQUUsSUFBSSxLQUFLLENBQUMscUNBQXFDLEdBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN2RixNQUFNLFNBQVMsR0FBRyxNQUFNLG9CQUFLLENBQUMsaUNBQWlDLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BGLE1BQU0sUUFBUSxHQUFHLE1BQU0sU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3hDLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxHQUFHO1lBQUUsSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUVyRSxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUFBLENBQUM7SUFFRjs7OztPQUlHO0lBRUgsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFVO1FBQ2pCLElBQUcsT0FBTyxFQUFFLElBQUksUUFBUTtZQUFFLElBQUksS0FBSyxDQUFDLHFDQUFxQyxHQUFHLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDdkYsTUFBTSxHQUFHLEdBQUcsaUNBQWlDLEVBQUUsRUFBRSxDQUFDO1FBQ2xELE1BQU0sYUFBYSxHQUFHLE1BQU0sb0JBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDaEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDOUMsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztDQUVKO0FBQUEsQ0FBQztBQUNGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmZXRjaCBmcm9tICdub2RlLWZldGNoJztcclxuaW1wb3J0IHsgU2VydmVySW5mb3JtYXRpb24sIE5pY2tuYW1lSGlzdG9yeSB9IGZyb20gJy4vaW50ZXJmYWNlcy9pbmRleCc7XHJcbmNvbnN0IG9wdGlvbnMgPSB7IFxyXG4gICAgbWV0aG9kOiBcIkdFVFwiLCBcclxuICAgIGhlYWRlcnM6IHsgXHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJBcHBsaWNhdGlvbi9qc29uXCIgXHJcbiAgICB9IFxyXG59O1xyXG5jbGFzcyBNQ0luZm8ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogWW91IGdldCB0aGUgaW5mb3JtYXRpb24gZnJvbSBhIHNlcnZlci5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcCBUaGUgaXAgdG8gZmluZCBpbmZvcm1hdGlvbi5cclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPFNlcnZlckluZm9ybWF0aW9uPn0gQW4gaW5mb3JtYXRpb24ganNvbiBvYmplY3QuXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIHNlcnZlcihpcDogc3RyaW5nKTogUHJvbWlzZTxTZXJ2ZXJJbmZvcm1hdGlvbj4ge1xyXG4gICAgICAgIGlmKHR5cGVvZiBpcCAhPSAnc3RyaW5nJykgbmV3IEVycm9yKFwiVGhlIGlwIG11c3QgYmUgYSBzdHJpbmcgSSByZWNlaXZlZCBcIiArIHR5cGVvZiBpcCk7XHJcbiAgICAgICAgY29uc3QgdXJsID0gYGh0dHBzOi8vYXBpLm1jc3J2c3RhdC51cy8yLyR7aXB9YDtcclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpLmNhdGNoKCgpID0+IHsgdGhyb3cgRXJyb3IoXCJJTlZBTElEIElOVFJPRFVDRUQgSVAuXCIpIH0pO1xyXG4gICAgICAgIGNvbnN0IGpzb246IFNlcnZlckluZm9ybWF0aW9uID0gYXdhaXQgcmVzLmpzb24oKTtcclxuICAgICAgICByZXR1cm4ganNvbjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogWW91IGdldCBhIGhpc3Rvcnkgb2Ygbmlja25hbWVzXHJcbiAgICAgKiBAcGFyYW0gdXNlcm5hbWUgVGhlIG5pY2tuYW1lIHRvIHNlYXJjaCBmb3IgaW5mb3JtYXRpb24uXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxOaWNrbmFtZUhpc3Rvcnk+fSBVc2VyIG5pY2tuYW1lIGhpc3RvcnlcclxuICAgICAqL1xyXG4gICAgYXN5bmMgaGlzdG9yeSh1c2VybmFtZTogc3RyaW5nKTogUHJvbWlzZTxOaWNrbmFtZUhpc3Rvcnk+IHtcclxuICAgICAgICBpZiAodHlwZW9mIHVzZXJuYW1lICE9ICdzdHJpbmcnKSBUeXBlRXJyb3IoXCJUaGUgaXAgbXVzdCBiZSBhIHN0cmluZyBJIHJlY2VpdmVkIFwiICsgdHlwZW9mIHVzZXJuYW1lKVxyXG4gICAgICAgIGNvbnN0IHVybCA9IFwiaHR0cHM6Ly9hcGkubW9qYW5nLmNvbS91c2Vycy9wcm9maWxlcy9taW5lY3JhZnQvXCIgKyB1c2VybmFtZTtcclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSkuY2F0Y2goKCkgPT4geyBUeXBlRXJyb3IoXCJVc2VybmFtZSBpbnZhbGlkLlwiKTsgfSk7XHJcbiAgICAgICAgY29uc3QgdXJsMiA9IGBodHRwczovL2FwaS5tb2phbmcuY29tL3VzZXIvcHJvZmlsZXMvJHtyZXMuaWR9L25hbWVzYDtcclxuICAgICAgICBjb25zdCByZXNIaXN0b3J5OiBOaWNrbmFtZUhpc3RvcnkgPSBhd2FpdCBmZXRjaChgJHt1cmwyfWAsIG9wdGlvbnMpLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc0hpc3Rvcnk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSXQgaXMgdXNlZCB0byBvYnRhaW4gdGhlIHNraW4gb2YgYSB1c2VyLlxyXG4gICAgICogQHBhcmFtIHVzZXJuYW1lIDxOaWNrbmFtZSB0byBmaW5kIGluZm9ybWF0aW9uPlxyXG4gICAgICogQHJldHVybnMge1Byb21pc2U8QnVmZmVyPn0gU2tpbiBpbWFnZSBidWZmZXIuXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIHNraW4odXNlcm5hbWU6IHN0cmluZyk6IFByb21pc2U8QnVmZmVyPiB7XHJcbiAgICAgICAgaWYodHlwZW9mIHVzZXJuYW1lICE9ICdzdHJpbmcnKSBuZXcgRXJyb3IoXCJUaGUgdXNlcm5hbWUgbXVzdCBiZSBhIHN0cmluZyBJIHJlY2VpdmVkIFwiICsgdHlwZW9mIHVzZXJuYW1lKTtcclxuICAgICAgICBjb25zdCB1cmwxID0gXCJodHRwczovL2FwaS5tb2phbmcuY29tL3VzZXJzL3Byb2ZpbGVzL21pbmVjcmFmdC9cIiArIHVzZXJuYW1lOztcclxuICAgICAgICBjb25zdCBkYXRhRmV0Y2ggPSBhd2FpdCBmZXRjaCh1cmwxLCBvcHRpb25zKS50aGVuKChyZXM6IGFueSkgPT4gcmVzLmpzb24oKSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICBuZXcgRXJyb3IoXCJVc2VybmFtZSBpbnZhbGlkLlwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCB1cmwyID0gYGh0dHBzOi8vY3JhZmF0YXIuY29tL3NraW5zLyR7ZGF0YUZldGNoLmlkfT9zaXplPTQwOTgmZGVmYXVsdD1NSEZfU3RldmUmb3ZlcmxheWA7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwyLCBvcHRpb25zKTtcclxuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIG5ldyBFcnJvcihcIkVycm9yLCBuaWNrbmFtZSBub3QgZm91bmQuXCIpO1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IGF3YWl0IHJlc3BvbnNlLmJ1ZmZlcigpO1xyXG4gICAgICAgIHJldHVybiBidWZmZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEl0IGlzIHVzZWQgdG8gb2J0YWluIGFuIGltYWdlIG9mIHRoZSBib2R5IG9mIGEgc2tpbi5cclxuICAgICogQHBhcmFtIHVzZXJuYW1lIDxOaWNrbmFtZSB0byBmaW5kPlxyXG4gICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCdWZmZXI+fSBJbWFnZSBsaW5rIHRoZSBib2R5IG9mIGEgc2tpblxyXG4gICAgKi9cclxuXHJcbiAgICBhc3luYyBib2R5KHVzZXJuYW1lOiBzdHJpbmcpOiBQcm9taXNlPEJ1ZmZlcj4ge1xyXG4gICAgICAgIGlmKHR5cGVvZiB1c2VybmFtZSAhPSAnc3RyaW5nJykgbmV3IEVycm9yKFwiVGhlIHVzZXJuYW1lIG11c3QgYmUgYSBzdHJpbmcgSSByZWNlaXZlZCBcIiArIHR5cGVvZiB1c2VybmFtZSk7XHJcbiAgICAgICAgY29uc3QgZGF0YUZldGNoID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLm1vamFuZy5jb20vdXNlcnMvcHJvZmlsZXMvbWluZWNyYWZ0LyR7dXNlcm5hbWV9YCwgb3B0aW9ucykudGhlbigocmVzOiBhbnkpID0+IHJlcy5qc29uKCkpLmNhdGNoKCgpID0+IHsgdGhyb3cgRXJyb3IoXCJVc2VybmFtZSBpbnZhbGlkLlwiKTsgfSk7XHJcbiAgICAgICAgY29uc3QgdXJsMiA9IGBodHRwczovL2NyYWZhdGFyLmNvbS9yZW5kZXJzL2JvZHkvJHtkYXRhRmV0Y2guaWR9P3NpemU9NDA5OCZkZWZhdWx0PU1IRl9TdGV2ZSZvdmVybGF5YDtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybDIsIG9wdGlvbnMpO1xyXG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IGF3YWl0IHJlc3BvbnNlLmJ1ZmZlcigpO1xyXG4gICAgICAgIGlmIChidWZmZXIpIHJldHVybiBidWZmZXI7IGVsc2UgRXJyb3IoXCJJbnZhbGlkIG5pY2tuYW1lXCIpXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBHZXQgYWxsIHRoZSBuaWNrbmFtZXMgb3IgcGVvcGxlIHdobyBoYXZlIGxpa2VkIHRoZSBzZXJ2ZXJcclxuICAgICogQHBhcmFtIGlwIDxTZXJ2ZXIgdG8gZmluZD5cclxuICAgICogQHJldHVybnMge1Byb21pc2U8bnVtYmVyPn0gSG93IG1hbnkgcGVvcGxlIGhhdmUgdm90ZWQgZm9yIGEgc2VydmVyXHJcbiAgICAqL1xyXG5cclxuICAgIGFzeW5jIG5hbWVtY0xpa2VzKGlwOiBzdHJpbmcpOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgIGlmKHR5cGVvZiBpcCAhPSAnc3RyaW5nJykgbmV3IEVycm9yKFwiVGhlIGlwIG11c3QgYmUgYSBzdHJpbmcgSSByZWNlaXZlZCBcIiArIHR5cGVvZiBpcCk7XHJcbiAgICAgICAgY29uc3QgZmV0Y2hlYWRvID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLm5hbWVtYy5jb20vc2VydmVyLyR7aXB9L2xpa2VzYCwgb3B0aW9ucyk7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaGVhZG8uanNvbigpO1xyXG4gICAgICAgIGlmIChmZXRjaGVhZG8uc3RhdHVzID09PSA0MDQpIG5ldyBFcnJvcihcIlNlcnZlciBkb2Vzbid0IGV4aXN0LlwiKTtcclxuXHJcbiAgICByZXR1cm4gcmVzcG9uc2UubGVuZ3RoO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgaWNvbiBvZiB0aGUgc2VydmVyXHJcbiAgICAgKiBAcGFyYW0gaXAgU2VydmVyIElQXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxCdWZmZXI+fSBTZXJ2ZXIgSWNvbiBCdWZmZXJcclxuICAgICAqL1xyXG5cclxuICAgIGFzeW5jIGljb24oaXA6IFN0cmluZyk6IFByb21pc2U8QnVmZmVyPiB7XHJcbiAgICAgICAgaWYodHlwZW9mIGlwICE9ICdzdHJpbmcnKSBuZXcgRXJyb3IoXCJUaGUgaXAgbXVzdCBiZSBhIHN0cmluZyBJIHJlY2VpdmVkIFwiICsgdHlwZW9mIGlwKTtcclxuICAgICAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly9hcGkubWNzcnZzdGF0LnVzL2ljb24vJHtpcH1gO1xyXG4gICAgICAgIGNvbnN0IGZldGNoUmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hSZXNwb25zZS5idWZmZXIoKTtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICB9XHJcblxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IHsgTUNJbmZvIH0iXX0=