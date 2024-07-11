"use strict";

import Alert from "./customAlert.js";
import usernameValidator from "./usernameValidator.js";

window.addEventListener("load", async () => {
	function getValue(id) {
		return document.getElementById(id).value;
	}

	function showAlert(content) {
		new Alert({
			title: document.title,
			content,
			close: "知道了!"
		});
	}

	const { session } = JSON.parse(await (await fetch("/getSession", { method: "GET" })).text());

	let time = 60;
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	const sentVerifyCode = document.getElementById("sentVerifyCode");
	sentVerifyCode.addEventListener("click", async () => {
		const email = getValue("email");
		if (!email) {
			return showAlert("邮箱地址不能为空");
		}
		if (!emailRegex.test(email)) {
			return showAlert("邮箱地址不合法");
		}
		sentVerifyCode.disabled = true;
		fetch("/sentVerifyCode", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				session,
				username: getValue("username"),
				email
			})
		}).then(async (data) => {
			const { status, message } = JSON.parse(await data.text());
			showAlert(message);
			if (status) {
				const dsq = setInterval(() => {
					sentVerifyCode.innerText = `重新发送: ${time--}s`;
					if (time < 0) {
						time = 60;
						sentVerifyCode.innerText = "获取验证码";
						sentVerifyCode.disabled = false;
						clearInterval(dsq);
					}
				}, 1000);
			} else sentVerifyCode.disabled = false;
		});
	});

	document.getElementById("submit").addEventListener("click", async () => {
		const username = getValue("username");
		const email = getValue("email");
		const verifyCode = getValue("verifyCode");
		const { valid, message } = usernameValidator.validate(username);
		if (valid) {
				const data = JSON.parse(await (await fetch("/whitelist", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						session,
						username,
						email,
						verifyCode
					})
				})).text());
				showAlert(data.message);
		} else {
			showAlert(message);
		}
	});
});