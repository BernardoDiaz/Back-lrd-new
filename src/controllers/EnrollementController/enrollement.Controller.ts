import { Request, Response } from "express";
import { Enrollment } from "../../models/paymentsModels/enrollment";
import { Fee } from "../../models/paymentsModels/fee";
import { FeeConfig } from "../../models/paymentsModels/feeConfig";
import { Student } from "../../models/studentsModels/student";
import { PaymentBook } from "../../models/paymentsModels/paymentBook";
import { Payment } from '../../models/paymentsModels/payment';
import PaymentReceipt from '../../models/paymentsModels/paymentReceipt';

// Consultar información de matrícula por studentId y año (si se envía)
export const getEnrollmentByStudentId = async (req: Request, res: Response) => {
    try {
        const { studentId, year: yearParam } = req.params; 
        const { year: yearQuery } = req.query;
        // El año puede venir como parámetro de la URL o como query parameter
        const year = yearParam || yearQuery;
        let where: any = { studentId };
        if (year) {
            where.year = year;
        }
        const enrollments = await Enrollment.findAll({ 
            attributes:['id','montoTotal', 'montoPagado', 'saldo', 'descuento', 'year'], // Se agrega descuento
            where
        });
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ error: "Error al consultar la matrícula", details: (error as Error).message });
    }
};

// Actualizar montoPagado, saldo y descuento de la matrícula por studentId y registrar la cuota pagada
export const updateEnrollmentPayment = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const { montoPagado, feeId, descuento = 0 } = req.body;
        const currentYear = new Date().getFullYear();
        // Buscar todas las matrículas del estudiante
        const enrollments = await Enrollment.findAll({ where: { studentId, id:feeId } });
        // Filtrar por año usando createdAt
        const enrollment = enrollments.find(e => {
            const createdAt = e.get("createdAt");
            if (!createdAt) return false;
            const year = new Date(createdAt as string).getFullYear();
            return year === currentYear;
        });
        if (!enrollment) {
            return res.status(404).json({ msg: "Matrícula no encontrada para el año actual" });
        }
        let montoPagadoActual = enrollment.get("montoPagado");
        if (typeof montoPagadoActual !== "number") {
            montoPagadoActual = parseFloat(montoPagadoActual as string);
        }
        let montoTotal = enrollment.get("montoTotal");
        if (typeof montoTotal !== "number") {
            montoTotal = parseFloat(montoTotal as string);
        }
        let descuentoActual = enrollment.get("descuento") || 0;
        if (typeof descuentoActual !== "number") {
            descuentoActual = parseFloat(descuentoActual as string);
        }
        const pagoReal = Number(montoPagado) - Number(descuento);
        const nuevoPagado = (montoPagadoActual as number) + pagoReal;
        const nuevoDescuento = (descuentoActual as number) + Number(descuento);
        const nuevoMontoTotal = (montoTotal as number) - Number(descuento);
        let saldo = nuevoMontoTotal - nuevoPagado;
        if (saldo < 0) saldo = 0;
        await enrollment.update({ 
            montoPagado: nuevoPagado, 
            saldo, 
            descuento: nuevoDescuento,
            montoTotal: nuevoMontoTotal
        });
        // Siempre registrar el pago y el recibo, independientemente de feeId
        let payment;
        if (feeId) {
            const fee = await Fee.findByPk(feeId);
            if (fee) {
                await fee.update({ pagado: true, fechaPago: new Date() });
            }
            payment = await Payment.create({
                studentId,
                concepto: 'cuota',
                feeId,
                monto: pagoReal,
                descuento, 
                montoReal: pagoReal,
                fecha: new Date(),
            });
        } else {
            payment = await Payment.create({
                studentId,
                concepto: 'matricula',
                enrollmentId: enrollment.get('id'),
                monto: pagoReal,
                descuento,
                montoReal: pagoReal,
                fecha: new Date(),
            });
        }
        console.log('Pago creado:', payment.get('id'));
        try {
            const recibo = await PaymentReceipt.create({ paymentId: payment.get('id'), amount: pagoReal, status: 'emitido', issuedAt: new Date(), notes: feeId ? 'Pago de cuota desde matrícula' : 'Pago de matrícula desde matrícula' });
            console.log('Recibo creado:', recibo.get('id'));
        } catch (err) {
            console.error('Error creando recibo:', err);
        }
        res.json({msg: "Matrícula actualizada"}); 
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la matrícula", details: (error as Error).message, stack: (error as Error).stack });
    }
};

// Crear matrícula y talonario para un año específico
export const createEnrollmentAndFeesForYear = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const { year, nivel, grado, descuento = 0 } = req.body; // Permitir descuento opcional
        if (!year || !nivel || !grado) {
            return res.status(400).json({ msg: "Datos incompletos: year, nivel y grado son requeridos" });
        }
        // Verificar si ya existe matrícula para ese año
        const existing = await Enrollment.findOne({ where: { studentId, year } });
        if (existing) {
            return res.status(409).json({ msg: "Ya existe matrícula para ese año" });
        }
        // Buscar configuración de montos por nivel
        const config = await FeeConfig.findOne({ where: { nivel } });
        if (!config) {
            return res.status(400).json({ msg: 'No existe configuración de montos para el nivel especificado.' });
        }
        const cuotaFinal = config.get('montoCuota');
        const matriculaFinal = config.get('montoMatricula');
        // Actualizar nivel y grado del estudiante
        const student = await Student.findOne({ where: { studentID: studentId } });
        if (!student) {
            return res.status(404).json({ msg: "Estudiante no encontrado" });
        }
        await student.update({ nivel, grado });
        // Crear matrícula con saldo que considera descuento inicial
        const saldoInicial = Number(matriculaFinal) - Number(descuento);
        const enrollment = await Enrollment.create({ 
            studentId, 
            montoTotal: matriculaFinal, 
            montoPagado: 0, 
            saldo: saldoInicial, 
            year,
            descuento // Guardar descuento si se envía
        });
        // Verificar si ya existe un talonario para este año
        let paymentBook = await PaymentBook.findOne({ 
            where: { studentId, year } 
        });
        // Si no existe, crear uno nuevo
        if (!paymentBook) {
            paymentBook = await PaymentBook.create({ 
                studentId, 
                year 
            });
        }
        // Generar automáticamente 11 cuotas (enero a noviembre)
        const meses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre'
        ];
        // Verificación adicional para TypeScript
        if (!paymentBook || !paymentBook.get('id')) {
            return res.status(500).json({ error: "Error al crear o encontrar el talonario de pagos (id nulo)" });
        }
        const cuotas = meses.map(mes => ({
            paymentBookId: (paymentBook as any).get('id'),
            studentId,
            mes,
            monto: cuotaFinal,
            pagado: false,
            year
        }));
        const fees = await Fee.bulkCreate(cuotas);
        res.status(201).json({ 
            enrollment, 
            fees,
            updatedStudent: {
                studentId,
                nivel,
                grado
            },
            montos: {
                matricula: matriculaFinal,
                cuota: cuotaFinal
            }
        });
    } catch (error) {
        res.status(500).json({ 
            error: "Error al crear matrícula y cuotas", 
            details: (error as Error).message 
        });
    }
};
// ...puedes agregar aquí otros métodos CRUD como en los otros controladores...

export const getEnrollmentYears = async (req: Request, res: Response) => {
    try {
        const years = await Enrollment.findAll({
            attributes: [[Enrollment.sequelize!.fn('DISTINCT', Enrollment.sequelize!.col('year')), 'year']],
            raw: true,
            order: [['year', 'DESC']]
        });
        // Convertir a formato que Angular pueda consumir: [{ year: 2025 }, { year: 2024 }]
        const yearList = years.map((y: any) => ({ year: y.year }));
        res.json(yearList);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los años de matrícula", details: (error as Error).message });
    }
};

// Obtener cuotas (fees) por studentId y año (opcional)
export const getFeesByStudentId = async (req: Request, res: Response) => {
    try {
        const { studentId, year: yearParam } = req.params;
        const { year: yearQuery } = req.query;
        const year = yearParam || yearQuery;

        // Buscar los talonarios del estudiante (filtrar por año si se proporciona)
        let paymentBookWhere: any = { studentId };
        if (year) paymentBookWhere.year = year;
        const paymentBooks = await PaymentBook.findAll({ where: paymentBookWhere });
        if (!paymentBooks || paymentBooks.length === 0) {
            return res.status(404).json({ msg: 'No se encontró talonario para el estudiante' });
        }
        // Obtener los IDs de los talonarios
        const paymentBookIds = paymentBooks.map(pb => pb.get('id'));
        // Buscar las cuotas asociadas a esos talonarios
        const fees = await Fee.findAll({
            where: { paymentBookId: paymentBookIds },
            attributes: ['id', 'mes', 'monto', 'pagado', 'fechaPago', 'year', 'paymentBookId']
        });
        res.json(fees);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las cuotas', details: (error as Error).message });
    }
};

