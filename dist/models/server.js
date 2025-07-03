"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// RUTAS
const user_Route_1 = __importDefault(require("../routes/UserRoute/user.Route"));
const student_Route_1 = __importDefault(require("../routes/StudentRoute/student.Route"));
const payments_Route_1 = __importDefault(require("../routes/PaymentsRoute/payments.Route"));
const feeConfig_Route_1 = __importDefault(require("../routes/PaymentsRoute/feeConfig.Route"));
const productCategory_Route_1 = __importDefault(require("../routes/ProductsRoute/productCategory.Route"));
const product_Route_1 = __importDefault(require("../routes/ProductsRoute/product.Route"));
const enrollment_Route_1 = __importDefault(require("../routes/StudentRoute/enrollment.Route"));
// MODELOS DE BD
const user_1 = require("./usersModels/user");
const student_1 = require("./studentsModels/student");
const paymentBook_1 = require("./paymentsModels/paymentBook");
const fee_1 = require("./paymentsModels/fee");
const enrollment_1 = require("./paymentsModels/enrollment");
const payment_1 = require("./paymentsModels/payment");
const feeConfig_1 = require("./paymentsModels/feeConfig");
const productCategory_1 = require("./productsModels/productCategory");
const product_1 = require("./productsModels/product");
require("../models/paymentsModels/associations");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = parseInt(process.env.PORT, 10) || 8080;
        this.host = '0.0.0.0';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    ;
    listen() {
        this.app.listen(this.port, this.host, () => {
            console.log('port ' + this.port);
        });
    }
    ;
    routes() {
        //endpoint usuarios
        this.app.use('/api/users', user_Route_1.default);
        this.app.use('/api/students', student_Route_1.default);
        this.app.use('/api/payments', payments_Route_1.default);
        this.app.use('/api/fee-config', feeConfig_Route_1.default);
        this.app.use('/api/categories', productCategory_Route_1.default);
        this.app.use('/api/products', product_Route_1.default);
        this.app.use('/api/enrollments', enrollment_Route_1.default);
    }
    ;
    midlewares() {
        //parceo body
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.json({ limit: '100mb' }));
        this.app.use(express_1.default.urlencoded({ limit: '100mb', extended: true }));
        //cors
        this.app.use((0, cors_1.default)({
            origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization'],
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
        }));
    }
    ;
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_1.user.sync();
                yield student_1.Student.sync();
                yield paymentBook_1.PaymentBook.sync();
                yield fee_1.Fee.sync();
                yield enrollment_1.Enrollment.sync();
                yield payment_1.Payment.sync();
                yield feeConfig_1.FeeConfig.sync();
                // Crear FeeConfig por defecto si no existen
                const niveles = [
                    'Inicial',
                    'Parvularia',
                    'Primer Ciclo',
                    'Segundo Ciclo',
                    'Tercer Ciclo',
                    'Bachillerato'
                ];
                for (const nivel of niveles) {
                    const exists = yield feeConfig_1.FeeConfig.findOne({ where: { nivel } });
                    if (!exists) {
                        yield feeConfig_1.FeeConfig.create({ nivel, montoCuota: 35, montoMatricula: 350 });
                    }
                }
                yield productCategory_1.ProductCategory.sync();
                yield product_1.Product.sync();
                console.log('Connection valid');
            }
            catch (error) {
                console.error('Connection not valid', error);
            }
            ;
        });
    }
    ;
}
;
exports.default = Server;
