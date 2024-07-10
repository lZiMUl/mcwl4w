"use strict";

// Little Module
export default class windowApiVerify {
	constructor(attribute, success, fail) {
		success ? attribute in window ? success(window[attribute]) : fail(`你当前浏览器不支持[${attribute}] 服务参数`) : null;
	}
};

// Little Module
export class navigatorApiVerify {
	constructor(attribute, success, fail) {
		success ? attribute in navigator ? success({ event: navigator[attribute] }) : fail(`你当前浏览器不支持[${attribute}] 服务参数`) : null;
	}
}