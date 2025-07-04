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
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
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
                'Inicial',
                'Parvularia',
                'Primer Ciclo',
                'Segundo Ciclo',
                'Tercer Ciclo',
                'Bachillerato'
            ];
            for (const nivel of niveles) {
                const exists = await FeeConfig.findOne({ where: { nivel } });
                if (!exists) {
                    await FeeConfig.create({ nivel, montoCuota: 35, montoMatricula: 350 });
                }
            }
            await ProductCategory.sync();
            await Product.sync();
            console.log('Connection valid');
        } catch (error) {
            console.error('Connection not valid', error);
        };
    };
};

export default Server;
