interface Config<T> {
    content: T;
    title: T;
    close: T;
}
export default class Alert {
    private static list;
    private readonly frame;
    constructor({ content, title, close }: Config<string>);
    addEventListener(eventName: string, callback: (event: Event & {
        Alert: HTMLElement;
    }) => void): void;
    private ce;
    private ssa;
    private ac;
    private de;
}
export {};
//# sourceMappingURL=customAlert.d.ts.map