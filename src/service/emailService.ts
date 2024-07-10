import nodemailer from "nodemailer";
import { getConfig } from "../util/apiUtil";

export const [
	host,
	port,
	user,
	pass
]: [string, number, string, string] = [
	(getConfig("emailService", "host") ?? "127.0.0.1") as string,
	(getConfig("emailService", "port") ?? 25575) as number,
	(getConfig("emailService", "username") ?? "") as string,
	(getConfig("emailService", "password") ?? "") as string
];

export default {
	config: {
		host,
		port,
		user,
		pass
	},
	service: nodemailer.createTransport({
		host,
		port,
		secure: true, // Use `true` for port 465, `false` for all other ports
		auth: {
			user,
			pass
		}
	})
};


