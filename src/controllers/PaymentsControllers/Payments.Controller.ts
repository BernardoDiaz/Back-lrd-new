import { Request, Response } from "express";
import { Payment } from "../../models/paymentsModels/payment";
import { Fee } from "../../models/paymentsModels/fee";
import { Enrollment } from "../../models/paymentsModels/enrollment";
import { PaymentBook } from "../../models/paymentsModels/paymentBook";

// Registrar uno o varios pagos (cuota, matrícula o producto)
export const createPayment = async (req: Request, res: Response) => {
    try {
        const { studentId, pagos } = req.body;
        // Si viene un solo pago (compatibilidad)
        if (!pagos) {
            const { concepto, feeId, enrollmentId, productId, monto, descuento = 0 } = req.body;
            const montoReal = Number(monto) - Number(descuento);
            let payment;
            if (concepto === 'cuota' && feeId) {
                payment = await Payment.create({ studentId, concepto, feeId, monto, descuento, montoReal });
                const fee = await Fee.findByPk(feeId);
                if (fee) await fee.update({ pagado: true, fechaPago: new Date() });
            } else if (concepto === 'matricula' && enrollmentId) {
                payment = await Payment.create({ studentId, concepto, enrollmentId, monto, descuento, montoReal });
                const enrollment = await Enrollment.findByPk(enrollmentId);
                if (enrollment) {
                    const nuevoPagado = Number(enrollment.get('montoPagado')) + montoReal;
                    const saldo = Number(enrollment.get('montoTotal')) - nuevoPagado;
                    await enrollment.update({ montoPagado: nuevoPagado, saldo });
                } 
            } else if (concepto === 'producto' && productId) {
                payment = await Payment.create({ studentId, concepto, productId, monto, descuento, montoReal });
                // Aquí podrías descontar stock si lo deseas
            } else {
                return res.status(400).json({ msg: 'Datos insuficientes o concepto inválido.' });
            }
            return res.status(201).json(payment);
        }
        // Si viene un array de pagos
        const resultados = [];
        for (const pago of pagos) {
            const { concepto, feeId, enrollmentId, productId, monto, descuento = 0 } = pago;
            const montoReal = Number(monto) - Number(descuento);
            let payment;
            if (concepto === 'cuota' && feeId) {
                payment = await Payment.create({ studentId, concepto, feeId, monto, descuento, montoReal });
                const fee = await Fee.findByPk(feeId);
                if (fee) await fee.update({ pagado: true, fechaPago: new Date() });
            } else if (concepto === 'matricula' && enrollmentId) {
                payment = await Payment.create({ studentId, concepto, enrollmentId, monto, descuento, montoReal });
                const enrollment = await Enrollment.findByPk(enrollmentId);
                if (enrollment) {
                    const nuevoPagado = Number(enrollment.get('montoPagado')) + montoReal;
                    const saldo = Number(enrollment.get('montoTotal')) - nuevoPagado;
                    await enrollment.update({ montoPagado: nuevoPagado, saldo });
                }
            } else if (concepto === 'producto' && productId) {
                payment = await Payment.create({ studentId, concepto, productId, monto, descuento, montoReal });
                // Aquí podrías descontar stock si lo deseas
            } else {
                resultados.push({ error: 'Datos insuficientes o concepto inválido', pago });
                continue;
            }
            resultados.push(payment);
        }
        res.status(201).json(resultados);
    } catch (error) {
        res.status(400).json({ error });
    }
};

// Listar pagos de un estudiante
export const getPaymentsByStudent = async (req: Request, res: Response) => {
    const { studentId } = req.params;
    const payments = await Payment.findAll({ where: { studentId } });
    res.json(payments);
};

// Obtener las cuotas (fees) del estudiante en el año actual
export const getCurrentYearFeesByStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const currentYear = new Date().getFullYear();

        // Buscar el talonario del año actual
        const paymentBook = await PaymentBook.findOne({
            where: { studentId, year: currentYear }
        });

        if (!paymentBook) {
            return res.status(404).json({ msg: 'Talonario no encontrado para el año actual.' });
        }

        // Buscar las cuotas asociadas al talonario
        const fees = await Fee.findAll({
            where: { paymentBookId: paymentBook.get('id') }
        });

        res.json(fees);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las cuotas del año actual.' });
    }
};

// Obtener cuotas (fees) por studentId y año (opcional), solo las no pagadas
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
        // Buscar solo las cuotas NO pagadas asociadas a esos talonarios
        const fees = await Fee.findAll({
            where: { paymentBookId: paymentBookIds, pagado: false },
            attributes: ['id', 'mes', 'monto', 'pagado', 'fechaPago', 'year', 'paymentBookId']
        });
        res.json(fees);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las cuotas', details: (error as Error).message });
    }
};

// Registrar un pago mixto (cuotas, productos, descuentos)
export const registerMixedPayment = async (req: Request, res: Response) => {
    try {
        const { studentId, year, items, total } = req.body;
        let monto = 0;
        let descuento = 0;
        let montoReal = 0;
        const detalles: any[] = [];
        const productosRegistrados: any[] = []; 

        // Procesar cada item
        for (const item of items) {
            if (item.type === 'cuota') {
                const fee = await Fee.findByPk(item.id);
                if (fee) {
                    await fee.update({ pagado: true, fechaPago: new Date() });
                    monto += Number(item.amount);
                    detalles.push({ tipo: 'cuota', id: item.id, status: 'pagado' });
                } else {
                    detalles.push({ tipo: 'cuota', id: item.id, status: 'no encontrado' });
                }
            } else if (item.type === 'product') {
                // Registrar el producto como pago individual
                const cantidad = item.cantidad || 1;
                const montoProducto = Number(item.amount) * cantidad;
                const pagoProducto = await Payment.create({
                    studentId,
                    concepto: 'producto',
                    productId: item.id,
                    monto: item.amount,
                    descuento: 0,
                    montoReal: montoProducto,
                    fecha: new Date(),
                });
                monto += montoProducto;
                productosRegistrados.push(pagoProducto);
                detalles.push({ tipo: 'producto', id: item.id, cantidad, status: 'registrado', pagoId: pagoProducto.get('id') });
            } else if (item.type === 'discount') {
                descuento += Number(item.amount); // debe ser negativo
                detalles.push({ tipo: 'descuento', id: item.id, monto: item.amount });
            }
        }

        montoReal = monto + descuento;

        // Registrar el pago general mixto
        const payment = await Payment.create({
            studentId,
            concepto: 'mixto',
            monto,
            descuento,
            montoReal,
            fecha: new Date(),
        });

        res.status(201).json({ payment, productosRegistrados, detalles });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};


