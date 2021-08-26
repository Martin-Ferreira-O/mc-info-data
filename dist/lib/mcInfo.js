"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MCInfo = void 0;
const axios_1 = require("axios");
const getData_1 = require("./getData");
class MCInfo extends getData_1.GetData {
    /**
     * You get the information from a server.
     * @param {string} ip The ip to find information.
     * @returns {Promise<ServerInformation>} An information json object.
     */
    async server(ip) {
        if (typeof ip != 'string')
            throw TypeError('The ip must be a string I received ' + typeof ip);
        const url = `https://api.mcsrvstat.us/2/${ip}`;
        const res = await axios_1.default({ url }).catch(() => {
            throw TypeError('[ERROR] Invalid IP enter.');
        });
        return res.data;
    }
    /**
     * You get a history of nicknames
     * @param username The nickname to search for information.
     * @returns {Promise<NicknameHistory | void>} User nickname history
     */
    async history(username) {
        if (typeof username != 'string')
            TypeError('The ip must be a string I received ' + typeof username);
        const res = await this.getUUID(username);
        if (res) {
            const names = `https://api.mojang.com/user/profiles/${res}/names`;
            const history = await axios_1.default({ url: names });
            return history.data;
        }
    }
    /**
     * It is used to obtain the skin of a user.
     * @param username <Nickname to find information>
     * @returns {Promise<Buffer | void>} Skin image buffer.
     */
    async skin(username) {
        if (typeof username != 'string')
            throw TypeError('The username must be a string I received ' + typeof username);
        const data = await this.getUUID(username);
        if (data) {
            const imageLink = `https://crafatar.com/skins/${data}?size=4098&default=MHF_Steve&overlay`;
            const response = await axios_1.default({
                url: imageLink,
                responseType: 'arraybuffer',
            });
            if (response.status !== 200)
                throw TypeError('Error, nickname not found.');
            const buffer = await response.data;
            return buffer;
        }
    }
    /**
     * It is used to obtain an image of the body of a skin.
     * @param username <Nickname to find>
     * @returns {Promise<Buffer | void>} Image link the body of a skin
     */
    async body(username) {
        if (typeof username != 'string')
            throw TypeError('The username must be a string I received ' + typeof username);
        const data = await this.getUUID(username);
        if (data) {
            const image = `https://crafatar.com/renders/body/${data}?size=4098&default=MHF_Steve&overlay`;
            const response = await axios_1.default({
                url: image,
                responseType: 'arraybuffer',
            });
            return response.data;
        }
    }
    /**
     * Get all the nicknames or people who have liked the server
     * @param ip <Server to find>
     * @returns {Promise<number>} How many people have voted for a server
     */
    async nameMCLikes(ip) {
        if (typeof ip != 'string')
            throw TypeError('The ip must be a string I received ' + typeof ip);
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
        if (typeof ip != 'string')
            throw TypeError('The ip must be a string I received ' + typeof ip);
        const url = `https://api.mcsrvstat.us/icon/${ip}`;
        const { data } = await axios_1.default({ url, responseType: 'arraybuffer' });
        return data;
    }
}
exports.MCInfo = MCInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWNJbmZvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9tY0luZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUNBQTBCO0FBQzFCLHVDQUFvQztBQUVwQyxNQUFNLE1BQU8sU0FBUSxpQkFBTztJQUMzQjs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFVO1FBQzdCLElBQUksT0FBTyxFQUFFLElBQUksUUFBUTtZQUN4QixNQUFNLFNBQVMsQ0FBQyxxQ0FBcUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sR0FBRyxHQUFHLDhCQUE4QixFQUFFLEVBQUUsQ0FBQztRQUMvQyxNQUFNLEdBQUcsR0FBRyxNQUFNLGVBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUMzQyxNQUFNLFNBQVMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQ2pCLENBQUM7SUFDRDs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFnQjtRQUNwQyxJQUFJLE9BQU8sUUFBUSxJQUFJLFFBQVE7WUFDOUIsU0FBUyxDQUFDLHFDQUFxQyxHQUFHLE9BQU8sUUFBUSxDQUFDLENBQUM7UUFDcEUsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLElBQUksR0FBRyxFQUFFO1lBQ1IsTUFBTSxLQUFLLEdBQUcsd0NBQXdDLEdBQUcsUUFBUSxDQUFDO1lBQ2xFLE1BQU0sT0FBTyxHQUFHLE1BQU0sZUFBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDNUMsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDO1NBQ3BCO0lBQ0YsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQWdCO1FBQ2pDLElBQUksT0FBTyxRQUFRLElBQUksUUFBUTtZQUM5QixNQUFNLFNBQVMsQ0FDZCwyQ0FBMkMsR0FBRyxPQUFPLFFBQVEsQ0FDN0QsQ0FBQztRQUVILE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQyxJQUFJLElBQUksRUFBRTtZQUNULE1BQU0sU0FBUyxHQUFHLDhCQUE4QixJQUFJLHNDQUFzQyxDQUFDO1lBQzNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBSyxDQUFDO2dCQUM1QixHQUFHLEVBQUUsU0FBUztnQkFDZCxZQUFZLEVBQUUsYUFBYTthQUMzQixDQUFDLENBQUM7WUFDSCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRztnQkFDMUIsTUFBTSxTQUFTLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUMvQyxNQUFNLE1BQU0sR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDbkMsT0FBTyxNQUFNLENBQUM7U0FDZDtJQUNGLENBQUM7SUFFRDs7OztPQUlHO0lBRUksS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFnQjtRQUNqQyxJQUFJLE9BQU8sUUFBUSxJQUFJLFFBQVE7WUFDOUIsTUFBTSxTQUFTLENBQ2QsMkNBQTJDLEdBQUcsT0FBTyxRQUFRLENBQzdELENBQUM7UUFDSCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUMsSUFBSSxJQUFJLEVBQUU7WUFDVCxNQUFNLEtBQUssR0FBRyxxQ0FBcUMsSUFBSSxzQ0FBc0MsQ0FBQztZQUM5RixNQUFNLFFBQVEsR0FBRyxNQUFNLGVBQUssQ0FBQztnQkFDNUIsR0FBRyxFQUFFLEtBQUs7Z0JBQ1YsWUFBWSxFQUFFLGFBQWE7YUFDM0IsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO1NBQ3JCO0lBQ0YsQ0FBQztJQUVEOzs7O09BSUc7SUFFSSxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQVU7UUFDbEMsSUFBSSxPQUFPLEVBQUUsSUFBSSxRQUFRO1lBQ3hCLE1BQU0sU0FBUyxDQUFDLHFDQUFxQyxHQUFHLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDcEUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLGVBQUssQ0FBQztZQUNwQyxHQUFHLEVBQUUsaUNBQWlDLEVBQUUsUUFBUTtTQUNoRCxDQUFDLENBQUM7UUFDSCxJQUFJLE1BQU0sS0FBSyxHQUFHO1lBQUUsTUFBTSxTQUFTLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUU3RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7O09BSUc7SUFFSSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQVU7UUFDM0IsSUFBSSxPQUFPLEVBQUUsSUFBSSxRQUFRO1lBQ3hCLE1BQU0sU0FBUyxDQUFDLHFDQUFxQyxHQUFHLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDcEUsTUFBTSxHQUFHLEdBQUcsaUNBQWlDLEVBQUUsRUFBRSxDQUFDO1FBQ2xELE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLGVBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUNuRSxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7Q0FDRDtBQUNRLHdCQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCB7IEdldERhdGEgfSBmcm9tICcuL2dldERhdGEnO1xuaW1wb3J0IHsgTmlja25hbWVIaXN0b3J5LCBTZXJ2ZXJJbmZvcm1hdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuY2xhc3MgTUNJbmZvIGV4dGVuZHMgR2V0RGF0YSB7XG5cdC8qKlxuXHQgKiBZb3UgZ2V0IHRoZSBpbmZvcm1hdGlvbiBmcm9tIGEgc2VydmVyLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gaXAgVGhlIGlwIHRvIGZpbmQgaW5mb3JtYXRpb24uXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPFNlcnZlckluZm9ybWF0aW9uPn0gQW4gaW5mb3JtYXRpb24ganNvbiBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgc2VydmVyKGlwOiBzdHJpbmcpOiBQcm9taXNlPFNlcnZlckluZm9ybWF0aW9uPiB7XG5cdFx0aWYgKHR5cGVvZiBpcCAhPSAnc3RyaW5nJylcblx0XHRcdHRocm93IFR5cGVFcnJvcignVGhlIGlwIG11c3QgYmUgYSBzdHJpbmcgSSByZWNlaXZlZCAnICsgdHlwZW9mIGlwKTtcblx0XHRjb25zdCB1cmwgPSBgaHR0cHM6Ly9hcGkubWNzcnZzdGF0LnVzLzIvJHtpcH1gO1xuXHRcdGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zKHsgdXJsIH0pLmNhdGNoKCgpID0+IHtcblx0XHRcdHRocm93IFR5cGVFcnJvcignW0VSUk9SXSBJbnZhbGlkIElQIGVudGVyLicpO1xuXHRcdH0pO1xuXHRcdHJldHVybiByZXMuZGF0YTtcblx0fVxuXHQvKipcblx0ICogWW91IGdldCBhIGhpc3Rvcnkgb2Ygbmlja25hbWVzXG5cdCAqIEBwYXJhbSB1c2VybmFtZSBUaGUgbmlja25hbWUgdG8gc2VhcmNoIGZvciBpbmZvcm1hdGlvbi5cblx0ICogQHJldHVybnMge1Byb21pc2U8Tmlja25hbWVIaXN0b3J5IHwgdm9pZD59IFVzZXIgbmlja25hbWUgaGlzdG9yeVxuXHQgKi9cblx0cHVibGljIGFzeW5jIGhpc3RvcnkodXNlcm5hbWU6IHN0cmluZyk6IFByb21pc2U8Tmlja25hbWVIaXN0b3J5IHwgdm9pZD4ge1xuXHRcdGlmICh0eXBlb2YgdXNlcm5hbWUgIT0gJ3N0cmluZycpXG5cdFx0XHRUeXBlRXJyb3IoJ1RoZSBpcCBtdXN0IGJlIGEgc3RyaW5nIEkgcmVjZWl2ZWQgJyArIHR5cGVvZiB1c2VybmFtZSk7XG5cdFx0Y29uc3QgcmVzID0gYXdhaXQgdGhpcy5nZXRVVUlEKHVzZXJuYW1lKTtcblx0XHRpZiAocmVzKSB7XG5cdFx0XHRjb25zdCBuYW1lcyA9IGBodHRwczovL2FwaS5tb2phbmcuY29tL3VzZXIvcHJvZmlsZXMvJHtyZXN9L25hbWVzYDtcblx0XHRcdGNvbnN0IGhpc3RvcnkgPSBhd2FpdCBheGlvcyh7IHVybDogbmFtZXMgfSk7XG5cdFx0XHRyZXR1cm4gaGlzdG9yeS5kYXRhO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBJdCBpcyB1c2VkIHRvIG9idGFpbiB0aGUgc2tpbiBvZiBhIHVzZXIuXG5cdCAqIEBwYXJhbSB1c2VybmFtZSA8Tmlja25hbWUgdG8gZmluZCBpbmZvcm1hdGlvbj5cblx0ICogQHJldHVybnMge1Byb21pc2U8QnVmZmVyIHwgdm9pZD59IFNraW4gaW1hZ2UgYnVmZmVyLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIHNraW4odXNlcm5hbWU6IHN0cmluZyk6IFByb21pc2U8QnVmZmVyIHwgdm9pZD4ge1xuXHRcdGlmICh0eXBlb2YgdXNlcm5hbWUgIT0gJ3N0cmluZycpXG5cdFx0XHR0aHJvdyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgdXNlcm5hbWUgbXVzdCBiZSBhIHN0cmluZyBJIHJlY2VpdmVkICcgKyB0eXBlb2YgdXNlcm5hbWVcblx0XHRcdCk7XG5cblx0XHRjb25zdCBkYXRhID0gYXdhaXQgdGhpcy5nZXRVVUlEKHVzZXJuYW1lKTtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Y29uc3QgaW1hZ2VMaW5rID0gYGh0dHBzOi8vY3JhZmF0YXIuY29tL3NraW5zLyR7ZGF0YX0/c2l6ZT00MDk4JmRlZmF1bHQ9TUhGX1N0ZXZlJm92ZXJsYXlgO1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcyh7XG5cdFx0XHRcdHVybDogaW1hZ2VMaW5rLFxuXHRcdFx0XHRyZXNwb25zZVR5cGU6ICdhcnJheWJ1ZmZlcicsXG5cdFx0XHR9KTtcblx0XHRcdGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMClcblx0XHRcdFx0dGhyb3cgVHlwZUVycm9yKCdFcnJvciwgbmlja25hbWUgbm90IGZvdW5kLicpO1xuXHRcdFx0Y29uc3QgYnVmZmVyID0gYXdhaXQgcmVzcG9uc2UuZGF0YTtcblx0XHRcdHJldHVybiBidWZmZXI7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEl0IGlzIHVzZWQgdG8gb2J0YWluIGFuIGltYWdlIG9mIHRoZSBib2R5IG9mIGEgc2tpbi5cblx0ICogQHBhcmFtIHVzZXJuYW1lIDxOaWNrbmFtZSB0byBmaW5kPlxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTxCdWZmZXIgfCB2b2lkPn0gSW1hZ2UgbGluayB0aGUgYm9keSBvZiBhIHNraW5cblx0ICovXG5cblx0cHVibGljIGFzeW5jIGJvZHkodXNlcm5hbWU6IHN0cmluZyk6IFByb21pc2U8QnVmZmVyIHwgdm9pZD4ge1xuXHRcdGlmICh0eXBlb2YgdXNlcm5hbWUgIT0gJ3N0cmluZycpXG5cdFx0XHR0aHJvdyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdUaGUgdXNlcm5hbWUgbXVzdCBiZSBhIHN0cmluZyBJIHJlY2VpdmVkICcgKyB0eXBlb2YgdXNlcm5hbWVcblx0XHRcdCk7XG5cdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHRoaXMuZ2V0VVVJRCh1c2VybmFtZSk7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnN0IGltYWdlID0gYGh0dHBzOi8vY3JhZmF0YXIuY29tL3JlbmRlcnMvYm9keS8ke2RhdGF9P3NpemU9NDA5OCZkZWZhdWx0PU1IRl9TdGV2ZSZvdmVybGF5YDtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3Moe1xuXHRcdFx0XHR1cmw6IGltYWdlLFxuXHRcdFx0XHRyZXNwb25zZVR5cGU6ICdhcnJheWJ1ZmZlcicsXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiByZXNwb25zZS5kYXRhO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYWxsIHRoZSBuaWNrbmFtZXMgb3IgcGVvcGxlIHdobyBoYXZlIGxpa2VkIHRoZSBzZXJ2ZXJcblx0ICogQHBhcmFtIGlwIDxTZXJ2ZXIgdG8gZmluZD5cblx0ICogQHJldHVybnMge1Byb21pc2U8bnVtYmVyPn0gSG93IG1hbnkgcGVvcGxlIGhhdmUgdm90ZWQgZm9yIGEgc2VydmVyXG5cdCAqL1xuXG5cdHB1YmxpYyBhc3luYyBuYW1lTUNMaWtlcyhpcDogc3RyaW5nKTogUHJvbWlzZTxudW1iZXI+IHtcblx0XHRpZiAodHlwZW9mIGlwICE9ICdzdHJpbmcnKVxuXHRcdFx0dGhyb3cgVHlwZUVycm9yKCdUaGUgaXAgbXVzdCBiZSBhIHN0cmluZyBJIHJlY2VpdmVkICcgKyB0eXBlb2YgaXApO1xuXHRcdGNvbnN0IHsgZGF0YSwgc3RhdHVzIH0gPSBhd2FpdCBheGlvcyh7XG5cdFx0XHR1cmw6IGBodHRwczovL2FwaS5uYW1lbWMuY29tL3NlcnZlci8ke2lwfS9saWtlc2AsXG5cdFx0fSk7XG5cdFx0aWYgKHN0YXR1cyA9PT0gNDA0KSB0aHJvdyBUeXBlRXJyb3IoXCJTZXJ2ZXIgZG9lc24ndCBleGlzdC5cIik7XG5cblx0XHRyZXR1cm4gZGF0YS5sZW5ndGg7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IHRoZSBpY29uIG9mIHRoZSBzZXJ2ZXJcblx0ICogQHBhcmFtIGlwIFNlcnZlciBJUFxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTxCdWZmZXI+fSBTZXJ2ZXIgSWNvbiBCdWZmZXJcblx0ICovXG5cblx0cHVibGljIGFzeW5jIGljb24oaXA6IFN0cmluZyk6IFByb21pc2U8QnVmZmVyPiB7XG5cdFx0aWYgKHR5cGVvZiBpcCAhPSAnc3RyaW5nJylcblx0XHRcdHRocm93IFR5cGVFcnJvcignVGhlIGlwIG11c3QgYmUgYSBzdHJpbmcgSSByZWNlaXZlZCAnICsgdHlwZW9mIGlwKTtcblx0XHRjb25zdCB1cmwgPSBgaHR0cHM6Ly9hcGkubWNzcnZzdGF0LnVzL2ljb24vJHtpcH1gO1xuXHRcdGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgYXhpb3MoeyB1cmwsIHJlc3BvbnNlVHlwZTogJ2FycmF5YnVmZmVyJyB9KTtcblx0XHRyZXR1cm4gZGF0YTtcblx0fVxufVxuZXhwb3J0IHsgTUNJbmZvIH07XG4iXX0=