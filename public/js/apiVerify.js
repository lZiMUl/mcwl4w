"use strict";

/**
	* ProjectName: web-basics-framework-template
	* ProjectDescription: Web Basics Framework Template
	* ProjectAuthor: lZiMUl
	*/

// Little Module
export default class windowApiVerify {
	constructor(attribute, success, fail) {
		success ? attribute in window ? success(window[attribute]) : fail(`Your current browser does not support [${attribute}] service agreement`) : null;
	}
};

// Little Module
export class navigatorApiVerify {
	constructor(attribute, success, fail) {
		success ? attribute in navigator ? success({ event: navigator[attribute] }) : fail(`Your current browser does not support [${attribute}] service agreement`) : null;
	}
}