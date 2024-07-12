import nodemailer from "nodemailer";
import { getConfig } from "../util/apiUtil";
import ServiceType from "../type/serviceType";

const serviceType: ServiceType = "emailService";

export const [host, port, username, password]: [string, number, string, string] = [
	(getConfig(serviceType, "host") ?? "127.0.0.1") as string,
	(getConfig(serviceType, "port") ?? 587) as number,
	(getConfig(serviceType, "username") ?? "") as string,
	(getConfig(serviceType, "password") ?? "") as string
];

export default {
	config: {
		host,
		port,
		username,
		password
	},
	service: nodemailer.createTransport({
		host,
		port,
		secure: true,
		auth: {
			user: username,
			pass: password
		}
	})
};
