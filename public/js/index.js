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
	});

	document.getElementById("submit").addEventListener("click", async () => {
		const username = getValue("username");
		const { valid, message } = usernameValidator.validate(username);
		if (valid) {
			const data = JSON.parse(await (await fetch("/whitelist", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					username,
					email: getValue("email"),
					verifyCode: getValue("verifyCode")
				})
			})).text());
			showAlert(data.message);
		} else {
			showAlert(message);
		}

		// switch (data.code) {
		// 	case 200: {
		//
		// 	}
		// 	break;
		//
		// 	case 400: {
		// 		alert(data.message)
		// 	}
		// 	break
		//
		// 	default: {
		//
		// 	}
		// }
	});
});