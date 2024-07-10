"use strict";

import Alert from "./customAlert.js";
import usernameValidator from "./usernameValidator.js";

window.addEventListener("load", () => {
	function getValue(id) {
		return document.getElementById(id).value;
	}

	function showAlert(content) {
		new Alert({
			title: document.title,
			content,
			close: "知道了"
		});
	}

	let time = 60;

	const sentVerifyCode = document.getElementById("sentVerifyCode");
	sentVerifyCode.addEventListener("click", async () => {
		if (getValue("email")) {
			sentVerifyCode.disabled = true;
			await fetch("/sentVerifyCode", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					username: getValue("username"),
					email: getValue("email")
				})
			});

			showAlert("验证码已发送");

			const dsq = setInterval(() => {
				sentVerifyCode.innerText = `剩余: ${time--}s`;
				if (time < 0) {
					time = 60;
					sentVerifyCode.innerText = "获取验证码";
					sentVerifyCode.disabled = false;
					clearInterval(dsq);
				}
			}, 1000);
		} else showAlert("邮箱地址不能为空");
	});

	document.getElementById("submit").addEventListener("click", async () => {
		const username = getValue("username");
		const email = getValue("email");
		const verifyCode = getValue("verifyCode");
		const { valid, message } = usernameValidator.validate(username);
		if (valid) {
			if (email && verifyCode) {
				const data = JSON.parse(await (await fetch("/whitelist", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						username,
						email,
						verifyCode
					})
				})).text());
				showAlert(data.message);
			} else showAlert("邮箱 或 验证码 不能为空");
		} else {
			showAlert(message);
		}
	});
});