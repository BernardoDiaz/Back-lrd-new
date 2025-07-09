import express from 'express';
import cors from "cors";
// RUTAS
import routesUsers from '../routes/UserRoute/user.Route';
import studentRoutes from '../routes/StudentRoute/student.Route';
import paymentsRoutes from '../routes/PaymentsRoute/payments.Route';
import feeConfigRoutes from '../routes/PaymentsRoute/feeConfig.Route';
import productCategoryRoutes from '../routes/ProductsRoute/productCategory.Route';
import productRoutes from '../routes/ProductsRoute/product.Route';
import enrollmentRoutes from '../routes/StudentRoute/enrollment.Route';
import paymentReceiptRoutes from '../routes/PaymentsRoute/paymentReceipt.Route';
// MODELOS DE BD
import { user } from './usersModels/user';
import { Student } from './studentsModels/student';
import { PaymentBook } from './paymentsModels/paymentBook';
import { Fee } from './paymentsModels/fee';
import { Enrollment } from './paymentsModels/enrollment';
import { Payment } from './paymentsModels/payment';
import { FeeConfig } from './paymentsModels/feeConfig';
import { ProductCategory } from './productsModels/productCategory';
import { Product } from './productsModels/product';
import PaymentReceipt from './paymentsModels/paymentReceipt';
import '../models/paymentsModels/associations';

class Server {
    private app: express.Application;
    private port: number;
    private host:string; 

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT as string, 10) || 8080;
        this.host = '0.0.0.0';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    };

    listen() {
        this.app.listen(this.port,this.host, () => {
            console.log('port ' + this.port);
        });
    };

    routes() { 
        //endpoint usuarios
        this.app.use('/api/users', routesUsers); 
        this.app.use('/api/students', studentRoutes);
        this.app.use('/api/payments', paymentsRoutes);
        this.app.use('/api/fee-config', feeConfigRoutes);
        this.app.use('/api/categories', productCategoryRoutes);
        this.app.use('/api/products', productRoutes);
        this.app.use('/api/enrollments', enrollmentRoutes);
        this.app.use('/api/payment-receipts', paymentReceiptRoutes);
    };

    midlewares() {
        //parceo body
        this.app.use(express.json());
        this.app.use(express.json({ limit: '100mb' }));
        this.app.use(express.urlencoded({ limit: '100mb', extended: true }));
        //cors
        const allowedOrigins = [
            'http://localhost:4200',
            'http://saa.liceoreydavid.net'
        ];
        this.app.use(cors({
            origin: (origin, callback) => {
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true);
                } else {
                    callback(new Error('No permitido por CORS'));
                }
            },
            credentials: true,
            allowedHeaders: ['Content-Type', 'Authorization'],
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'] // Agregado PATCH
        }));
    };
 
    async dbConnect() { 
        try {
            await user.sync();
            await Student.sync();
            await PaymentBook.sync();
            await Fee.sync();
            await Enrollment.sync();
            await Payment.sync();
            await FeeConfig.sync();
            // Crear FeeConfig por defecto si no existen
            const niveles = [
                { "nivel": "Inicial 1", "montoCuota": "95.00", "montoMatricula": "190.00" },
                { "nivel": "Inicial 2", "montoCuota": "70.00", "montoMatricula": "190.00" },
                { "nivel": "Inicial 3", "montoCuota": "65.00", "montoMatricula": "190.00" },
                { "nivel": "Parvularia", "montoCuota": "43.00", "montoMatricula": "200.00" },
                { "nivel": "Primer Ciclo", "montoCuota": "48.00", "montoMatricula": "200.00" },
                { "nivel": "Segundo Ciclo", "montoCuota": "48.00", "montoMatricula": "200.00" },
                { "nivel": "Tercer Ciclo", "montoCuota": "48.00", "montoMatricula": "200.00" },
                { "nivel": "Bachillerato", "montoCuota": "57.00", "montoMatricula": "250.00" }
            ];
            for (const { nivel, montoCuota, montoMatricula } of niveles) {
                const exists = await FeeConfig.findOne({ where: { nivel } });
                if (!exists) {
                    await FeeConfig.create({ nivel, montoCuota, montoMatricula });
                }
            }
            await ProductCategory.sync();
            await Product.sync();
            // Sincronizar PaymentReceipt forzando alteración de tabla
            await PaymentReceipt.sync({ alter: true });
            console.log('PaymentReceipt sincronizado correctamente');
            console.log('Connection valid');
        } catch (error) {
            console.error('Connection not valid', error);
        };
    };
};

export default Server;
