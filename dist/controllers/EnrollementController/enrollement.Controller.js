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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeesByStudentId = exports.getEnrollmentYears = exports.createEnrollmentAndFeesForYear = exports.updateEnrollmentPayment = exports.getEnrollmentByStudentId = void 0;
const enrollment_1 = require("../../models/paymentsModels/enrollment");
const fee_1 = require("../../models/paymentsModels/fee");
const feeConfig_1 = require("../../models/paymentsModels/feeConfig");
const student_1 = require("../../models/studentsModels/student");
const paymentBook_1 = require("../../models/paymentsModels/paymentBook");
// Consultar información de matrícula por studentId y año (si se envía)
const getEnrollmentByStudentId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, year: yearParam } = req.params;
        const { year: yearQuery } = req.query;
        // El año puede venir como parámetro de la URL o como query parameter
        const year = yearParam || yearQuery;
        let where = { studentId };
        if (year) {
            where.year = year;
        }
        const enrollments = yield enrollment_1.Enrollment.findAll({
            attributes: ['id', 'montoTotal', 'montoPagado', 'saldo', 'descuento', 'year'],
            where
        });
        res.json(enrollments);
    }
    catch (error) {
        res.status(500).json({ error: "Error al consultar la matrícula", details: error.message });
    }
});
exports.getEnrollmentByStudentId = getEnrollmentByStudentId;
// Actualizar montoPagado, saldo y descuento de la matrícula por studentId y registrar la cuota pagada
const updateEnrollmentPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const { montoPagado, feeId, descuento = 0 } = req.body;
        const currentYear = new Date().getFullYear();
        // Buscar todas las matrículas del estudiante
        const enrollments = yield enrollment_1.Enrollment.findAll({ where: { studentId, id: feeId } });
        // Filtrar por año usando createdAt
        const enrollment = enrollments.find(e => {
            const createdAt = e.get("createdAt");
            if (!createdAt)
                return false;
            const year = new Date(createdAt).getFullYear();
            return year === currentYear;
        });
        if (!enrollment) {
            return res.status(404).json({ msg: "Matrícula no encontrada para el año actual" });
        }
        // El montoPagado incluye el valor total que se aplica al saldo
        let montoPagadoActual = enrollment.get("montoPagado");
        if (typeof montoPagadoActual !== "number") {
            montoPagadoActual = parseFloat(montoPagadoActual);
        }
        let montoTotal = enrollment.get("montoTotal");
        if (typeof montoTotal !== "number") {
            montoTotal = parseFloat(montoTotal);
        }
        let descuentoActual = enrollment.get("descuento") || 0;
        if (typeof descuentoActual !== "number") {
            descuentoActual = parseFloat(descuentoActual);
        }
        // montoPagado viene como lo realmente pagado
        // El total efectivo se reduce por el descuento aplicado
        const pagoReal = Number(montoPagado) - Number(descuento);
        const nuevoPagado = montoPagadoActual + pagoReal;
        const nuevoDescuento = descuentoActual + Number(descuento);
        // El total efectivo es el original menos todos los descuentos
        const nuevoMontoTotal = montoTotal - Number(descuento);
        // Saldo = total efectivo - pagado
        let saldo = nuevoMontoTotal - nuevoPagado;
        if (saldo < 0)
            saldo = 0;
        yield enrollment.update({
            montoPagado: nuevoPagado,
            saldo,
            descuento: nuevoDescuento,
            montoTotal: nuevoMontoTotal // Actualizar también el montoTotal
        });
        // Si se envía feeId, marcar la cuota como pagada
        if (feeId) {
            const fee = yield fee_1.Fee.findByPk(feeId);
            if (fee) {
                yield fee.update({ pagado: true, fechaPago: new Date() });
            }
        }
        res.json({ msg: "Matrícula actualizada" });
    }
    catch (error) {
        // Mostrar el error real en la respuesta para depuración
        res.status(500).json({ error: "Error al actualizar la matrícula", details: error.message, stack: error.stack });
    }
});
exports.updateEnrollmentPayment = updateEnrollmentPayment;
// Crear matrícula y talonario para un año específico
const createEnrollmentAndFeesForYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId } = req.params;
        const { year, nivel, grado, descuento = 0 } = req.body; // Permitir descuento opcional
        if (!year || !nivel || !grado) {
            return res.status(400).json({ msg: "Datos incompletos: year, nivel y grado son requeridos" });
        }
        // Verificar si ya existe matrícula para ese año
        const existing = yield enrollment_1.Enrollment.findOne({ where: { studentId, year } });
        if (existing) {
            return res.status(409).json({ msg: "Ya existe matrícula para ese año" });
        }
        // Buscar configuración de montos por nivel
        const config = yield feeConfig_1.FeeConfig.findOne({ where: { nivel } });
        if (!config) {
            return res.status(400).json({ msg: 'No existe configuración de montos para el nivel especificado.' });
        }
        const cuotaFinal = config.get('montoCuota');
        const matriculaFinal = config.get('montoMatricula');
        // Actualizar nivel y grado del estudiante
        const student = yield student_1.Student.findOne({ where: { studentID: studentId } });
        if (!student) {
            return res.status(404).json({ msg: "Estudiante no encontrado" });
        }
        yield student.update({ nivel, grado });
        // Crear matrícula con saldo que considera descuento inicial
        const saldoInicial = Number(matriculaFinal) - Number(descuento);
        const enrollment = yield enrollment_1.Enrollment.create({
            studentId,
            montoTotal: matriculaFinal,
            montoPagado: 0,
            saldo: saldoInicial,
            year,
            descuento // Guardar descuento si se envía
        });
        // Verificar si ya existe un talonario para este año
        let paymentBook = yield paymentBook_1.PaymentBook.findOne({
            where: { studentId, year }
        });
        // Si no existe, crear uno nuevo
        if (!paymentBook) {
            paymentBook = yield paymentBook_1.PaymentBook.create({
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
            paymentBookId: paymentBook.get('id'),
            studentId,
            mes,
            monto: cuotaFinal,
            pagado: false,
            year
        }));
        const fees = yield fee_1.Fee.bulkCreate(cuotas);
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
    }
    catch (error) {
        res.status(500).json({
            error: "Error al crear matrícula y cuotas",
            details: error.message
        });
    }
});
exports.createEnrollmentAndFeesForYear = createEnrollmentAndFeesForYear;
// ...puedes agregar aquí otros métodos CRUD como en los otros controladores...
const getEnrollmentYears = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const years = yield enrollment_1.Enrollment.findAll({
            attributes: [[enrollment_1.Enrollment.sequelize.fn('DISTINCT', enrollment_1.Enrollment.sequelize.col('year')), 'year']],
            raw: true,
            order: [['year', 'DESC']]
        });
        // Convertir a formato que Angular pueda consumir: [{ year: 2025 }, { year: 2024 }]
        const yearList = years.map((y) => ({ year: y.year }));
        res.json(yearList);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener los años de matrícula", details: error.message });
    }
});
exports.getEnrollmentYears = getEnrollmentYears;
// Obtener cuotas (fees) por studentId y año (opcional)
const getFeesByStudentId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, year: yearParam } = req.params;
        const { year: yearQuery } = req.query;
        const year = yearParam || yearQuery;
        // Buscar los talonarios del estudiante (filtrar por año si se proporciona)
        let paymentBookWhere = { studentId };
        if (year)
            paymentBookWhere.year = year;
        const paymentBooks = yield paymentBook_1.PaymentBook.findAll({ where: paymentBookWhere });
        if (!paymentBooks || paymentBooks.length === 0) {
            return res.status(404).json({ msg: 'No se encontró talonario para el estudiante' });
        }
        // Obtener los IDs de los talonarios
        const paymentBookIds = paymentBooks.map(pb => pb.get('id'));
        // Buscar las cuotas asociadas a esos talonarios
        const fees = yield fee_1.Fee.findAll({
            where: { paymentBookId: paymentBookIds },
            attributes: ['id', 'mes', 'monto', 'pagado', 'fechaPago', 'year', 'paymentBookId']
        });
        res.json(fees);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener las cuotas', details: error.message });
    }
});
exports.getFeesByStudentId = getFeesByStudentId;
