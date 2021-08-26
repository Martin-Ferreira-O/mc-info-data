"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetData = void 0;
const axios_1 = require("axios");
class GetData {
    constructor() { }
    /**
     * Get the UUID from any nickname
     * @param {string} nick Nick to search id
     * @returns null | string
     */
    async getUUID(nick) {
        const { data } = await axios_1.default({
            url: `https://api.mojang.com/users/profiles/minecraft/${nick}`,
        });
        return data?.id || null;
    }
}
exports.GetData = GetData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZ2V0RGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBMEI7QUFFMUIsTUFBTSxPQUFPO0lBQ1osZ0JBQWUsQ0FBQztJQUNoQjs7OztPQUlHO0lBQ08sS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFZO1FBQ25DLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLGVBQUssQ0FBQztZQUM1QixHQUFHLEVBQUUsbURBQW1ELElBQUksRUFBRTtTQUM5RCxDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksRUFBRSxFQUFFLElBQUksSUFBSSxDQUFDO0lBQ3pCLENBQUM7Q0FDRDtBQUVRLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuXG5jbGFzcyBHZXREYXRhIHtcblx0Y29uc3RydWN0b3IoKSB7fVxuXHQvKipcblx0ICogR2V0IHRoZSBVVUlEIGZyb20gYW55IG5pY2tuYW1lXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBuaWNrIE5pY2sgdG8gc2VhcmNoIGlkXG5cdCAqIEByZXR1cm5zIG51bGwgfCBzdHJpbmdcblx0ICovXG5cdHByb3RlY3RlZCBhc3luYyBnZXRVVUlEKG5pY2s6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuXHRcdGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgYXhpb3Moe1xuXHRcdFx0dXJsOiBgaHR0cHM6Ly9hcGkubW9qYW5nLmNvbS91c2Vycy9wcm9maWxlcy9taW5lY3JhZnQvJHtuaWNrfWAsXG5cdFx0fSk7XG5cdFx0cmV0dXJuIGRhdGE/LmlkIHx8IG51bGw7XG5cdH1cbn1cblxuZXhwb3J0IHsgR2V0RGF0YSB9O1xuIl19