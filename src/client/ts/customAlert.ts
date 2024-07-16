import { navigatorApiVerify } from "./apiVerify.js";

interface List<T> {
	overlay: T;
	frame: T;
}

interface Config<T> {
	content: T;
	title: T;
	close: T;
}

export default class Alert {
	private static list: Array<List<HTMLElement>> = [];
	private readonly frame: HTMLElement;

	public constructor({ content, title, close }: Config<string>) {
		const [
			OVERLAY,
			FRAME,
			DIV,
			TITLE,
			TITLEDIV,
			CONTENT,
			CONTENTDIV,
			DONE
		]: Array<HTMLElement> = [
			this.ce("div"),
			this.ce("div"),
			this.ce("div"),
			this.ce("h3"),
			this.ce("div"),
			this.ce("div"),
			this.ce("div"),
			this.ce("button")
		];

		this.ssa(
			OVERLAY,
			`
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			z-index: 999;
		`
		);

		this.ssa(
			FRAME,
			`
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 80%;
			max-width: 500px;
			border: 3px solid transparent;
			border-radius: 10px;
			font-size: 16px;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
			background: #fff;
			z-index: 1000;
			transition: all 0.3s ease-in-out;
			opacity: 0;
			animation: fadeIn 0.5s forwards;
			background-clip: padding-box;
		`
		);
		this.ssa(
			DIV,
			`
			padding: 20px;
			text-align: center;
			border-radius: 10px;
		`
		);
		this.ssa(
			TITLEDIV,
			`
			margin-bottom: 20px;
		`
		);
		this.ssa(
			TITLE,
			`
			margin: 0;
			font-size: 20px;
			color: #333;
			font-weight: bold;
		`
		);
		this.ssa(
			CONTENTDIV,
			`
			max-height: 200px;
			overflow-y: auto;
			margin-bottom: 20px;
			padding: 0 10px;
		`
		);
		this.ssa(
			CONTENT,
			`
			font-size: 16px;
			color: #555;
		`
		);
		this.ssa(
			DONE,
			`
			width: 100%;
			padding: 12px;
			font-size: 16px;
			border: none;
			border-radius: 5px;
			background-color: dodgerblue;
			background-image: linear-gradient(to right, dodgerblue, deepskyblue);
			color: #fff;
			cursor: pointer;
			transition: background 0.3s ease;
		`
		);

		TITLE.innerText = title ? title : "Alert";
		CONTENT.innerHTML = content ? content : "";

		if (CONTENT.innerHTML) {
			const scripts: HTMLCollectionOf<HTMLScriptElement> =
				CONTENT.getElementsByTagName("script");
			for (let index: number = 0; index < scripts.length; index++) {
				const script: HTMLScriptElement = this.ce(
					"script"
				) as HTMLScriptElement;
				script.type = "text/javascript";
				const subScript: HTMLScriptElement = scripts[index];
				if (subScript.src) {
					script.src = subScript.src;
				} else {
					script.innerHTML = subScript.innerHTML;
				}
				document.head.appendChild(script);
			}
		}
		DONE.innerText = close ? close : "Close";
		DONE.addEventListener("click", () => {
			FRAME.style.opacity = "0";
			OVERLAY.style.opacity = "0";
			FRAME.remove();
			OVERLAY.remove();
			this.de();
			new navigatorApiVerify(
				"vibrate",
				() => navigator.vibrate(200),
				console.warn
			);
		});

		this.ac(TITLEDIV, TITLE);
		this.ac(DIV, TITLEDIV);
		this.ac(CONTENTDIV, CONTENT);
		this.ac(DIV, CONTENTDIV);
		this.ac(DIV, DONE);
		this.ac(FRAME, DIV);

		Alert.list.push({ overlay: OVERLAY, frame: FRAME });
		this.frame = FRAME;

		this.de();
	}

	public addEventListener(
		eventName: string,
		callback: (event: Event & { Alert: HTMLElement }) => void
	): void {
		this.frame.addEventListener(
			eventName,
			(event: Event) => {
				callback(
					Object.assign(event, {
						Alert: this.frame
					})
				);
			},
			false
		);
	}

	private ce(type: string): HTMLElement {
		return document.createElement(type);
	}

	private ssa(ele: HTMLElement, value: string): void {
		ele.style.cssText = value;
	}

	private ac<T extends HTMLElement>(ele: T, doc: T): void {
		ele.appendChild(doc);
	}

	private de(): void {
		if (Alert.list.length) {
			const { overlay, frame }: List<HTMLElement> =
				Alert.list.shift() as List<HTMLElement>;
			this.ac(document.body, overlay);
			this.ac(document.body, frame);
		}
	}
}
