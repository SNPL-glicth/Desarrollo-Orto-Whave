"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cors = require("cors");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:8080'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        exposedHeaders: ['Authorization'],
    }));
    await app.listen(4000);
    console.log('Servidor corriendo en http://localhost:4000');
}
bootstrap();
//# sourceMappingURL=main.js.map