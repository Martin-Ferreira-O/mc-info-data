import axios from "axios";
import { NicknameHistory, ServerInformation } from "./interfaces";
class MCInfo {
	/**
	 * You get the information from a server.
	 * @param {string} ip The ip to find information.
	 * @returns {Promise<ServerInformation>} An information json object.
	 */
	async server(ip: string): Promise<ServerInformation> {
		if (typeof ip != "string")
			throw TypeError("The ip must be a string I received " + typeof ip);
		const url = `https://api.mcsrvstat.us/2/${ip}`;
		const res = await axios({ url }).catch(() => {
			throw TypeError("INVALID INTRODUCED IP.");
		});
		return res.data;
	}
	/**
	 * You get a history of nicknames
	 * @param username The nickname to search for information.
	 * @returns {Promise<NicknameHistory>} User nickname history
	 */
	async history(username: string): Promise<NicknameHistory> {
		if (typeof username != "string")
			TypeError("The ip must be a string I received " + typeof username);
		const url =
			"https://api.mojang.com/users/profiles/minecraft/" + username;
		const res = await axios({ url }).catch(() => {
			TypeError("The username introduced is invalid.");
		});
		if (res) {
			const names = `https://api.mojang.com/user/profiles/${res.data.id}/names`;
			const history = await axios({ url: names });
			return history.data;
		} else return undefined;
	}

	/**
	 * It is used to obtain the skin of a user.
	 * @param username <Nickname to find information>
	 * @returns {Promise<Buffer>} Skin image buffer.
	 */
	async skin(username: string): Promise<Buffer> {
		if (typeof username != "string")
			throw TypeError(
				"The username must be a string I received " + typeof username
			);
		const url =
			"https://api.mojang.com/users/profiles/minecraft/" + username;
		const { data } = await axios({ url }).catch(() => {
			throw Error("Username invalid.");
		});
		const imageLink = `https://crafatar.com/skins/${data.id}?size=4098&default=MHF_Steve&overlay`;
		const response = await axios({
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

	async body(username: string): Promise<Buffer> {
		if (typeof username != "string")
			throw TypeError(
				"The username must be a string I received " + typeof username
			);
		const { data } = await axios({
			url: `https://api.mojang.com/users/profiles/minecraft/${username}`,
		}).catch(() => {
			throw Error("Username invalid.");
		});
		const image = `https://crafatar.com/renders/body/${data.id}?size=4098&default=MHF_Steve&overlay`;
		const response = await axios({
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

	async namemcLikes(ip: string): Promise<number> {
		if (typeof ip != "string")
			throw TypeError("The ip must be a string I received " + typeof ip);
		const { data, status } = await axios({
			url: `https://api.namemc.com/server/${ip}/likes`,
		});
		if (status === 404) throw TypeError("Server doesn't exist.");

		return data.length;
	}

	/**
	 * Get the icon of the server
	 * @param ip Server IP
	 * @returns {Promise<Buffer>} Server Icon Buffer
	 */

	async icon(ip: String): Promise<Buffer> {
		if (typeof ip != "string")
			throw TypeError("The ip must be a string I received " + typeof ip);
		const url = `https://api.mcsrvstat.us/icon/${ip}`;
		const { data } = await axios({ url, responseType: "arraybuffer" });
		return data;
	}
}
export { MCInfo };
