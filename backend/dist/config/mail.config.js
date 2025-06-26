"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailConfig = void 0;
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const path_1 = require("path");
exports.mailConfig = {
    transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'pachonlucassergionicolas@gmail.com',
            pass: 'roen axoq wppd yvxl',
        },
    },
    defaults: {
        from: '"Orto-Whave" <pachonlucassergionicolas@gmail.com>',
    },
    template: {
        dir: (0, path_1.join)(__dirname, '..', 'templates'),
        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
        options: {
            strict: true,
        },
    },
};
//# sourceMappingURL=mail.config.js.map