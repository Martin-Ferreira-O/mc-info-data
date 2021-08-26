import axios from 'axios';
import { GetData } from './getData';
import { NicknameHistory, ServerInformation } from '../interfaces';
class MCInfo extends GetData {
	/**
	 * You get the information from a server.
	 * @param {string} ip The ip to find information.
	 * @returns {Promise<ServerInformation>} An information json object.
	 */
	public async server(ip: string): Promise<ServerInformation> {
		if (typeof ip != 'string')
			throw TypeError('The ip must be a string I received ' + typeof ip);
		const url = `https://api.mcsrvstat.us/2/${ip}`;
		const res = await axios({ url }).catch(() => {
			throw TypeError('[ERROR] Invalid IP enter.');
		});
		return res.data;
	}
	/**
	 * You get a history of nicknames
	 * @param username The nickname to search for information.
	 * @returns {Promise<NicknameHistory | void>} User nickname history
	 */
	public async history(username: string): Promise<NicknameHistory | void> {
		if (typeof username != 'string')
			TypeError('The ip must be a string I received ' + typeof username);
		const res = await this.getUUID(username);
		if (res) {
			const names = `https://api.mojang.com/user/profiles/${res}/names`;
			const history = await axios({ url: names });
			return history.data;
		}
	}

	/**
	 * It is used to obtain the skin of a user.
	 * @param username <Nickname to find information>
	 * @returns {Promise<Buffer | void>} Skin image buffer.
	 */
	public async skin(username: string): Promise<Buffer | void> {
		if (typeof username != 'string')
			throw TypeError(
				'The username must be a string I received ' + typeof username
			);

		const data = await this.getUUID(username);
		if (data) {
			const imageLink = `https://crafatar.com/skins/${data}?size=4098&default=MHF_Steve&overlay`;
			const response = await axios({
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

	public async body(username: string): Promise<Buffer | void> {
		if (typeof username != 'string')
			throw TypeError(
				'The username must be a string I received ' + typeof username
			);
		const data = await this.getUUID(username);
		if (data) {
			const image = `https://crafatar.com/renders/body/${data}?size=4098&default=MHF_Steve&overlay`;
			const response = await axios({
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

	public async nameMCLikes(ip: string): Promise<number> {
		if (typeof ip != 'string')
			throw TypeError('The ip must be a string I received ' + typeof ip);
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

	public async icon(ip: String): Promise<Buffer> {
		if (typeof ip != 'string')
			throw TypeError('The ip must be a string I received ' + typeof ip);
		const url = `https://api.mcsrvstat.us/icon/${ip}`;
		const { data } = await axios({ url, responseType: 'arraybuffer' });
		return data;
	}
}
export { MCInfo };
