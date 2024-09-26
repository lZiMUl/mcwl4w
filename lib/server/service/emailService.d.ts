import nodemailer from 'nodemailer';
export declare const host: string, port: number, username: string, password: string, verifyCodeExpireTime: number;
declare const _default: {
    config: {
        host: string;
        port: number;
        username: string;
        password: string;
        verifyCodeExpireTime: number;
    };
    service: nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo, import("nodemailer/lib/smtp-transport").Options>;
};
export default _default;
//# sourceMappingURL=emailService.d.ts.map