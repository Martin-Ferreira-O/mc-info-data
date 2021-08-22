"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MCInfo = void 0;
const axios_1 = require("axios");
class MCInfo {
    /**
     * You get the information from a server.
     * @param {string} ip The ip to find information.
     * @returns {Promise<ServerInformation>} An information json object.
     */
    async server(ip) {
        if (typeof ip != "string")
            throw TypeError("The ip must be a string I received " + typeof ip);
        const url = `https://api.mcsrvstat.us/2/${ip}`;
        const res = await axios_1.default({ url }).catch(() => {
            throw TypeError("INVALID INTRODUCED IP.");
        });
        return res.data;
    }
    /**
     * You get a history of nicknames
     * @param username The nickname to search for information.
     * @returns {Promise<NicknameHistory>} User nickname history
     */
    async history(username) {
        if (typeof username != "string")
            TypeError("The ip must be a string I received " + typeof username);
        const url = "https://api.mojang.com/users/profiles/minecraft/" + username;
        const res = await axios_1.default({ url }).catch(() => {
            TypeError("The username introduced is invalid.");
        });
        if (res) {
            const names = `https://api.mojang.com/user/profiles/${res.data.id}/names`;
            const history = await axios_1.default({ url: names });
            return history.data;
        }
        else
            return undefined;
    }
    /**
     * It is used to obtain the skin of a user.
     * @param username <Nickname to find information>
     * @returns {Promise<Buffer>} Skin image buffer.
     */
    async skin(username) {
        if (typeof username != "string")
            throw TypeError("The username must be a string I received " + typeof username);
        const url = "https://api.mojang.com/users/profiles/minecraft/" + username;
        const { data } = await axios_1.default({ url }).catch(() => {
            throw Error("Username invalid.");
        });
        const imageLink = `https://crafatar.com/skins/${data.id}?size=4098&default=MHF_Steve&overlay`;
        const response = await axios_1.default({
            url: imageLink,
            responseType: "arraybuffer",
        });
        if (response.status !== 200)
            throw TypeError("Error, nickname not found.");
        const buffer = await response.data;
        return buffer;
    }
    /**
     * It is used to obtain an image of the body of a skin.
     * @param username <Nickname to find>
     * @returns {Promise<Buffer>} Image link the body of a skin
     */
    async body(username) {
        if (typeof username != "string")
            throw TypeError("The username must be a string I received " + typeof username);
        const { data } = await axios_1.default({
            url: `https://api.mojang.com/users/profiles/minecraft/${username}`,
        }).catch(() => {
            throw Error("Username invalid.");
        });
        const image = `https://crafatar.com/renders/body/${data.id}?size=4098&default=MHF_Steve&overlay`;
        const response = await axios_1.default({
            url: image,
            responseType: "arraybuffer",
        });
        return response.data;
    }
    /**
     * Get all the nicknames or people who have liked the server
     * @param ip <Server to find>
     * @returns {Promise<number>} How many people have voted for a server
     */
    async namemcLikes(ip) {
        if (typeof ip != "string")
            throw TypeError("The ip must be a string I received " + typeof ip);
        const { data, status } = await axios_1.default({
            url: `https://api.namemc.com/server/${ip}/likes`,
        });
        if (status === 404)
            throw TypeError("Server doesn't exist.");
        return data.length;
    }
    /**
     * Get the icon of the server
     * @param ip Server IP
     * @returns {Promise<Buffer>} Server Icon Buffer
     */
    async icon(ip) {
        if (typeof ip != "string")
            throw TypeError("The ip must be a string I received " + typeof ip);
        const url = `https://api.mcsrvstat.us/icon/${ip}`;
        const { data } = await axios_1.default({ url, responseType: "arraybuffer" });
        return data;
    }
}
exports.MCInfo = MCInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQTBCO0FBRTFCLE1BQU0sTUFBTTtJQUNYOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQVU7UUFDdEIsSUFBSSxPQUFPLEVBQUUsSUFBSSxRQUFRO1lBQ3hCLE1BQU0sU0FBUyxDQUFDLHFDQUFxQyxHQUFHLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDcEUsTUFBTSxHQUFHLEdBQUcsOEJBQThCLEVBQUUsRUFBRSxDQUFDO1FBQy9DLE1BQU0sR0FBRyxHQUFHLE1BQU0sZUFBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQzNDLE1BQU0sU0FBUyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDakIsQ0FBQztJQUNEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQWdCO1FBQzdCLElBQUksT0FBTyxRQUFRLElBQUksUUFBUTtZQUM5QixTQUFTLENBQUMscUNBQXFDLEdBQUcsT0FBTyxRQUFRLENBQUMsQ0FBQztRQUNwRSxNQUFNLEdBQUcsR0FDUixrREFBa0QsR0FBRyxRQUFRLENBQUM7UUFDL0QsTUFBTSxHQUFHLEdBQUcsTUFBTSxlQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDM0MsU0FBUyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLEdBQUcsRUFBRTtZQUNSLE1BQU0sS0FBSyxHQUFHLHdDQUF3QyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxDQUFDO1lBQzFFLE1BQU0sT0FBTyxHQUFHLE1BQU0sZUFBSyxDQUFD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QUFDLENBQUM7UUFDbkUsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0NBQ0Q7QUFDUSx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcclxuaW1wb3J0IHsgTmlja25hbWVIaXN0b3J5LCBTZXJ2ZXJJbmZvcm1hdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuY2xhc3MgTUNJbmZvIHtcclxuXHQvKipcclxuXHQgKiBZb3UgZ2V0IHRoZSBpbmZvcm1hdGlvbiBmcm9tIGEgc2VydmVyLlxyXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBpcCBUaGUgaXAgdG8gZmluZCBpbmZvcm1hdGlvbi5cclxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTxTZXJ2ZXJJbmZvcm1hdGlvbj59IEFuIGluZm9ybWF0aW9uIGpzb24gb2JqZWN0LlxyXG5cdCAqL1xyXG5cdGFzeW5jIHNlcnZlcihpcDogc3RyaW5nKTogUHJvbWlzZTxTZXJ2ZXJJbmZvcm1hdGlvbj4ge1xyXG5cdFx0aWYgKHR5cGVvZiBpcCAhPSBcInN0cmluZ1wiKVxyXG5cdFx0XHR0aHJvdyBUeXBlRXJyb3IoXCJUaGUgaXAgbXVzdCBiZSBhIHN0cmluZyBJIHJlY2VpdmVkIFwiICsgdHlwZW9mIGlwKTtcclxuXHRcdGNvbnN0IHVybCA9IGBodHRwczovL2FwaS5tY3NydnN0YXQudXMvMi8ke2lwfWA7XHJcblx0XHRjb25zdCByZXMgPSBhd2FpdCBheGlvcyh7IHVybCB9KS5jYXRjaCgoKSA9PiB7XHJcblx0XHRcdHRocm93IFR5cGVFcnJvcihcIklOVkFMSUQgSU5UUk9EVUNFRCBJUC5cIik7XHJcblx0XHR9KTtcclxuXHRcdHJldHVybiByZXMuZGF0YTtcclxuXHR9XHJcblx0LyoqXHJcblx0ICogWW91IGdldCBhIGhpc3Rvcnkgb2Ygbmlja25hbWVzXHJcblx0ICogQHBhcmFtIHVzZXJuYW1lIFRoZSBuaWNrbmFtZSB0byBzZWFyY2ggZm9yIGluZm9ybWF0aW9uLlxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPE5pY2tuYW1lSGlzdG9yeT59IFVzZXIgbmlja25hbWUgaGlzdG9yeVxyXG5cdCAqL1xyXG5cdGFzeW5jIGhpc3RvcnkodXNlcm5hbWU6IHN0cmluZyk6IFByb21pc2U8Tmlja25hbWVIaXN0b3J5PiB7XHJcblx0XHRpZiAodHlwZW9mIHVzZXJuYW1lICE9IFwic3RyaW5nXCIpXHJcblx0XHRcdFR5cGVFcnJvcihcIlRoZSBpcCBtdXN0IGJlIGEgc3RyaW5nIEkgcmVjZWl2ZWQgXCIgKyB0eXBlb2YgdXNlcm5hbWUpO1xyXG5cdFx0Y29uc3QgdXJsID1cclxuXHRcdFx0XCJodHRwczovL2FwaS5tb2phbmcuY29tL3VzZXJzL3Byb2ZpbGVzL21pbmVjcmFmdC9cIiArIHVzZXJuYW1lO1xyXG5cdFx0Y29uc3QgcmVzID0gYXdhaXQgYXhpb3MoeyB1cmwgfSkuY2F0Y2goKCkgPT4ge1xyXG5cdFx0XHRUeXBlRXJyb3IoXCJUaGUgdXNlcm5hbWUgaW50cm9kdWNlZCBpcyBpbnZhbGlkLlwiKTtcclxuXHRcdH0pO1xyXG5cdFx0aWYgKHJlcykge1xyXG5cdFx0XHRjb25zdCBuYW1lcyA9IGBodHRwczovL2FwaS5tb2phbmcuY29tL3VzZXIvcHJvZmlsZXMvJHtyZXMuZGF0YS5pZH0vbmFtZXNgO1xyXG5cdFx0XHRjb25zdCBoaXN0b3J5ID0gYXdhaXQgYXhpb3MoeyB1cmw6IG5hbWVzIH0pO1xyXG5cdFx0XHRyZXR1cm4gaGlzdG9yeS5kYXRhO1xyXG5cdFx0fSBlbHNlIHJldHVybiB1bmRlZmluZWQ7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJdCBpcyB1c2VkIHRvIG9idGFpbiB0aGUgc2tpbiBvZiBhIHVzZXIuXHJcblx0ICogQHBhcmFtIHVzZXJuYW1lIDxOaWNrbmFtZSB0byBmaW5kIGluZm9ybWF0aW9uPlxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPEJ1ZmZlcj59IFNraW4gaW1hZ2UgYnVmZmVyLlxyXG5cdCAqL1xyXG5cdGFzeW5jIHNraW4odXNlcm5hbWU6IHN0cmluZyk6IFByb21pc2U8QnVmZmVyPiB7XHJcblx0XHRpZiAodHlwZW9mIHVzZXJuYW1lICE9IFwic3RyaW5nXCIpXHJcblx0XHRcdHRocm93IFR5cGVFcnJvcihcclxuXHRcdFx0XHRcIlRoZSB1c2VybmFtZSBtdXN0IGJlIGEgc3RyaW5nIEkgcmVjZWl2ZWQgXCIgKyB0eXBlb2YgdXNlcm5hbWVcclxuXHRcdFx0KTtcclxuXHRcdGNvbnN0IHVybCA9XHJcblx0XHRcdFwiaHR0cHM6Ly9hcGkubW9qYW5nLmNvbS91c2Vycy9wcm9maWxlcy9taW5lY3JhZnQvXCIgKyB1c2VybmFtZTtcclxuXHRcdGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgYXhpb3MoeyB1cmwgfSkuY2F0Y2goKCkgPT4ge1xyXG5cdFx0XHR0aHJvdyBFcnJvcihcIlVzZXJuYW1lIGludmFsaWQuXCIpO1xyXG5cdFx0fSk7XHJcblx0XHRjb25zdCBpbWFnZUxpbmsgPSBgaHR0cHM6Ly9jcmFmYXRhci5jb20vc2tpbnMvJHtkYXRhLmlkfT9zaXplPTQwOTgmZGVmYXVsdD1NSEZfU3RldmUmb3ZlcmxheWA7XHJcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zKHtcclxuXHRcdFx0dXJsOiBpbWFnZUxpbmssXHJcblx0XHRcdHJlc3BvbnNlVHlwZTogXCJhcnJheWJ1ZmZlclwiLFxyXG5cdFx0fSk7XHJcblx0XHRpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApXHJcblx0XHRcdHRocm93IFR5cGVFcnJvcihcIkVycm9yLCBuaWNrbmFtZSBub3QgZm91bmQuXCIpO1xyXG5cdFx0Y29uc3QgYnVmZmVyID0gYXdhaXQgcmVzcG9uc2UuZGF0YTtcclxuXHRcdHJldHVybiBidWZmZXI7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJdCBpcyB1c2VkIHRvIG9idGFpbiBhbiBpbWFnZSBvZiB0aGUgYm9keSBvZiBhIHNraW4uXHJcblx0ICogQHBhcmFtIHVzZXJuYW1lIDxOaWNrbmFtZSB0byBmaW5kPlxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPEJ1ZmZlcj59IEltYWdlIGxpbmsgdGhlIGJvZHkgb2YgYSBza2luXHJcblx0ICovXHJcblxyXG5cdGFzeW5jIGJvZHkodXNlcm5hbWU6IHN0cmluZyk6IFByb21pc2U8QnVmZmVyPiB7XHJcblx0XHRpZiAodHlwZW9mIHVzZXJuYW1lICE9IFwic3RyaW5nXCIpXHJcblx0XHRcdHRocm93IFR5cGVFcnJvcihcclxuXHRcdFx0XHRcIlRoZSB1c2VybmFtZSBtdXN0IGJlIGEgc3RyaW5nIEkgcmVjZWl2ZWQgXCIgKyB0eXBlb2YgdXNlcm5hbWVcclxuXHRcdFx0KTtcclxuXHRcdGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgYXhpb3Moe1xyXG5cdFx0XHR1cmw6IGBodHRwczovL2FwaS5tb2phbmcuY29tL3VzZXJzL3Byb2ZpbGVzL21pbmVjcmFmdC8ke3VzZXJuYW1lfWAsXHJcblx0XHR9KS5jYXRjaCgoKSA9PiB7XHJcblx0XHRcdHRocm93IEVycm9yKFwiVXNlcm5hbWUgaW52YWxpZC5cIik7XHJcblx0XHR9KTtcclxuXHRcdGNvbnN0IGltYWdlID0gYGh0dHBzOi8vY3JhZmF0YXIuY29tL3JlbmRlcnMvYm9keS8ke2RhdGEuaWR9P3NpemU9NDA5OCZkZWZhdWx0PU1IRl9TdGV2ZSZvdmVybGF5YDtcclxuXHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3Moe1xyXG5cdFx0XHR1cmw6IGltYWdlLFxyXG5cdFx0XHRyZXNwb25zZVR5cGU6IFwiYXJyYXlidWZmZXJcIixcclxuXHRcdH0pO1xyXG5cdFx0cmV0dXJuIHJlc3BvbnNlLmRhdGE7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgYWxsIHRoZSBuaWNrbmFtZXMgb3IgcGVvcGxlIHdobyBoYXZlIGxpa2VkIHRoZSBzZXJ2ZXJcclxuXHQgKiBAcGFyYW0gaXAgPFNlcnZlciB0byBmaW5kPlxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcj59IEhvdyBtYW55IHBlb3BsZSBoYXZlIHZvdGVkIGZvciBhIHNlcnZlclxyXG5cdCAqL1xyXG5cclxuXHRhc3luYyBuYW1lbWNMaWtlcyhpcDogc3RyaW5nKTogUHJvbWlzZTxudW1iZXI+IHtcclxuXHRcdGlmICh0eXBlb2YgaXAgIT0gXCJzdHJpbmdcIilcclxuXHRcdFx0dGhyb3cgVHlwZUVycm9yKFwiVGhlIGlwIG11c3QgYmUgYSBzdHJpbmcgSSByZWNlaXZlZCBcIiArIHR5cGVvZiBpcCk7XHJcblx0XHRjb25zdCB7IGRhdGEsIHN0YXR1cyB9ID0gYXdhaXQgYXhpb3Moe1xyXG5cdFx0XHR1cmw6IGBodHRwczovL2FwaS5uYW1lbWMuY29tL3NlcnZlci8ke2lwfS9saWtlc2AsXHJcblx0XHR9KTtcclxuXHRcdGlmIChzdGF0dXMgPT09IDQwNCkgdGhyb3cgVHlwZUVycm9yKFwiU2VydmVyIGRvZXNuJ3QgZXhpc3QuXCIpO1xyXG5cclxuXHRcdHJldHVybiBkYXRhLmxlbmd0aDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCB0aGUgaWNvbiBvZiB0aGUgc2VydmVyXHJcblx0ICogQHBhcmFtIGlwIFNlcnZlciBJUFxyXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPEJ1ZmZlcj59IFNlcnZlciBJY29uIEJ1ZmZlclxyXG5cdCAqL1xyXG5cclxuXHRhc3luYyBpY29uKGlwOiBTdHJpbmcpOiBQcm9taXNlPEJ1ZmZlcj4ge1xyXG5cdFx0aWYgKHR5cGVvZiBpcCAhPSBcInN0cmluZ1wiKVxyXG5cdFx0XHR0aHJvdyBUeXBlRXJyb3IoXCJUaGUgaXAgbXVzdCBiZSBhIHN0cmluZyBJIHJlY2VpdmVkIFwiICsgdHlwZW9mIGlwKTtcclxuXHRcdGNvbnN0IHVybCA9IGBodHRwczovL2FwaS5tY3NydnN0YXQudXMvaWNvbi8ke2lwfWA7XHJcblx0XHRjb25zdCB7IGRhdGEgfSA9IGF3YWl0IGF4aW9zKHsgdXJsLCByZXNwb25zZVR5cGU6IFwiYXJyYXlidWZmZXJcIiB9KTtcclxuXHRcdHJldHVybiBkYXRhO1xyXG5cdH1cclxufVxyXG5leHBvcnQgeyBNQ0luZm8gfTtcclxuIl19