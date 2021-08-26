import axios from "axios";

class GetData {
	constructor() {}
	/**
	 * Get the UUID from any nickname
	 * @param {string} nick Nick to search id
	 * @returns null | string
	 */
	protected async getUUID(nick: string): Promise<string | null> {
		const { data } = await axios({
			url: `https://api.mojang.com/users/profiles/minecraft/${nick}`,
		});
		return data?.id || null;
	}
}

export { GetData };
