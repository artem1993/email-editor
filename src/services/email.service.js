import axios from "axios";

class EmailService {
	#URL = "http://localhost:3000/emails";

	async getEmails() {
		const { data } = await axios.get(this.#URL);
		return data;
	}

	async sendEmail(text) {
		const { data } = await axios.post(this.#URL, { text });
		return data;
	}

	async deleteEmail(id) {
		const { data } = await axios.delete(`${this.#URL}/${id}`);
		return data;
	}
}

export const emailService = new EmailService();
