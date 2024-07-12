import Alert from './customAlert.js'
import usernameValidator, { ValidateResult } from './usernameValidator.js'

window.addEventListener('load', async (): Promise<void> => {
	function getValue(id: string): string {
		return (document.getElementById(id) as HTMLInputElement).value
	}

	function showAlert(content: string): void {
		new Alert({
			title: document.title,
			content,
			close: '知道了!'
		})
	}

	const { session } = JSON.parse(
		await (await fetch('/getSession', { method: 'GET' })).text()
	)

	let time: number = 60
	const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

	const sentVerifyCode: HTMLButtonElement = document.getElementById(
		'sentVerifyCode'
	) as HTMLButtonElement
	sentVerifyCode.addEventListener('click', async (): Promise<void> => {
		const email: string = getValue('email')
		if (!email) {
			return showAlert('邮箱地址不能为空')
		}
		if (!emailRegex.test(email)) {
			return showAlert('邮箱地址不合法')
		}
		sentVerifyCode.disabled = true
		fetch('/sentVerifyCode', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				session,
				username: getValue('username'),
				email
			})
		}).then(async (data: Response): Promise<void> => {
			const { status, message } = JSON.parse(await data.text())
			showAlert(message)
			if (status) {
				const dsq = setInterval((): void => {
					sentVerifyCode.innerText = `重新发送: ${time--}s`
					if (time < 0) {
						time = 60
						sentVerifyCode.innerText = '获取验证码'
						sentVerifyCode.disabled = false
						clearInterval(dsq)
					}
				}, 1000)
			} else sentVerifyCode.disabled = false
		})
	})

	document.getElementById('submit')?.addEventListener('click', async () => {
		const username: string = getValue('username')
		const email: string = getValue('email')
		const verifyCode: string = getValue('verifyCode')
		const { valid, message }: ValidateResult =
			usernameValidator.validate(username)
		if (valid) {
			const data = JSON.parse(
				await (
					await fetch('/whitelist', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							session,
							username,
							email,
							verifyCode
						})
					})
				).text()
			)
			showAlert(data.message)
		} else {
			showAlert(message)
		}
	})
})
