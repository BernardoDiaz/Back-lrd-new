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
exports.getNextStudentIdSimple = exports.checkStudentEmailExists = exports.checkStudentIdExists = exports.getStudentEnrollment = exports.getStudentFees = exports.promoteToStudent = exports.deleteStudent = exports.updateStudent = exports.getStudentById = exports.getAllStudents = exports.createAspirant = void 0;
const student_1 = require("../../models/studentsModels/student");
const paymentBook_1 = require("../../models/paymentsModels/paymentBook");
const enrollment_1 = require("../../models/paymentsModels/enrollment");
const fee_1 = require("../../models/paymentsModels/fee");
const feeConfig_1 = require("../../models/paymentsModels/feeConfig");
const sequelize_1 = require("sequelize");
// Crear nuevo aspirante
const createAspirant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentID, nombres, apellidos, correo, telefono, fechaNacimiento, direccion, matricula, nivel, grado, nombreContactoEmergencia, telefonoContactoEmergencia, tipo, enrollmentYear } = req.body;
        // Buscar montos en FeeConfig por nivel
        const config = yield feeConfig_1.FeeConfig.findOne({ where: { nivel } });
        if (!config) {
            return res.status(400).json({ msg: 'No existe configuración de montos para el nivel especificado.' });
        }
        const cuotaFinal = config.get('montoCuota');
        const matriculaFinal = config.get('montoMatricula');
        const student = yield student_1.Student.create({
            studentID,
            nombres,
            apellidos,
            correo,
            telefono,
            fechaNacimiento,
            direccion,
            matricula,
            nivel,
            grado,
            nombreContactoEmergencia,
            telefonoContactoEmergencia,
            tipo,
            estado: 'activo',
            year: (enrollmentYear && !isNaN(Number(enrollmentYear))) ? Number(enrollmentYear) : null
        });
        if (tipo === 'estudiante') {
            // Crear talonario y matrícula solo si es estudiante
            let paymentBook = yield paymentBook_1.PaymentBook.findOne({ where: { studentId: student.get('studentID') } });
            let year = new Date().getFullYear();
            if (paymentBook) {
                year = paymentBook.get('year');
            }
            else {
                // Si no existe, usar el año de inscripción recibido o el actual
                year = (enrollmentYear && !isNaN(Number(enrollmentYear))) ? Number(enrollmentYear) : new Date().getFullYear();
                paymentBook = yield paymentBook_1.PaymentBook.create({ studentId: student.get('studentID'), year });
            }
            yield enrollment_1.Enrollment.create({ studentId: student.get('studentID'), montoTotal: matriculaFinal, year });
            // Generar automáticamente 11 cuotas (enero a noviembre)
            const meses = [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre'
            ];
            const cuotas = meses.map(mes => ({
                paymentBookId: paymentBook.get('id'),
                studentId: student.get('studentID'),
                mes,
                monto: cuotaFinal,
                pagado: false,
                year
            }));
            yield fee_1.Fee.bulkCreate(cuotas);
        }
        res.status(201).json(student);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.createAspirant = createAspirant;
// Listar todos los estudiantes/aspirantes
const getAllStudents = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield student_1.Student.findAll();
    res.json(students);
});
exports.getAllStudents = getAllStudents;
// Obtener un estudiante por ID
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const student = yield student_1.Student.findByPk(id);
    if (!student)
        return res.status(404).json({ msg: 'No encontrado' });
    res.json(student);
});
exports.getStudentById = getStudentById;
// Actualizar datos de estudiante
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombres, apellidos, correo, telefono, fechaNacimiento, direccion, matricula, nivel, grado, nombreContactoEmergencia, telefonoContactoEmergencia, tipo, estado } = req.body;
    const student = yield student_1.Student.findByPk(id);
    if (!student)
        return res.status(404).json({ msg: 'No encontrado' });
    yield student.update({
        nombres,
        apellidos,
        correo,
        telefono,
        fechaNacimiento,
        direccion,
        matricula,
        nivel,
        grado,
        nombreContactoEmergencia,
        telefonoContactoEmergencia,
        tipo,
        estado
    });
    res.json(student);
});
exports.updateStudent = updateStudent;
// Eliminar estudiante
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const student = yield student_1.Student.findOne({ where: { studentID: studentId } });
    if (!student)
        return res.status(404).json({ msg: 'No encontrado' });
    yield student.destroy();
    res.json({ msg: 'Eliminado' });
});
exports.deleteStudent = deleteStudent;
// Cambiar aspirante a estudiante
const promoteToStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    // Buscar el estudiante en la base de datos
    const student = yield student_1.Student.findOne({ where: { studentID: studentId } });
    if (!student)
        return res.status(404).json({ msg: 'No encontrado' });
    if (student.get('tipo') !== 'estudiante') {
        // Cambiar tipo a estudiante
        yield student.update({ tipo: 'estudiante' });
        // Buscar montos en FeeConfig por nivel
        const nivel = student.get('nivel');
        const config = yield feeConfig_1.FeeConfig.findOne({ where: { nivel } });
        if (!config) {
            return res.status(400).json({ msg: 'No existe configuración de montos para el nivel especificado.' });
        }
        const cuotaFinal = config.get('montoCuota');
        const matriculaFinal = config.get('montoMatricula');
        // Tomar el año desde el campo year del estudiante
        let year = student.get('year') ? Number(student.get('year')) : new Date().getFullYear();
        // Buscar el paymentBook existente para el estudiante
        let paymentBook = yield paymentBook_1.PaymentBook.findOne({ where: { studentId: student.get('studentID') } });
        if (!paymentBook) {
            paymentBook = yield paymentBook_1.PaymentBook.create({ studentId: student.get('studentID'), year });
        }
        yield enrollment_1.Enrollment.create({ studentId: student.get('studentID'), montoTotal: matriculaFinal, year });
        // Generar automáticamente 11 cuotas (enero a noviembre)
        const meses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre'
        ];
        const cuotas = meses.map(mes => ({
            paymentBookId: paymentBook.get('id'),
            studentId: student.get('studentID'),
            mes,
            monto: cuotaFinal,
            pagado: false,
            year
        }));
        yield fee_1.Fee.bulkCreate(cuotas);
    }
    res.json(student);
});
exports.promoteToStudent = promoteToStudent;
// Consultar cuotas de un estudiante
const getStudentFees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    // Buscar el talonario del estudiante
    const paymentBook = yield paymentBook_1.PaymentBook.findOne({ where: { studentId } });
    if (!paymentBook)
        return res.status(404).json({ msg: 'Talonario no encontrado' });
    const fees = yield fee_1.Fee.findAll({ where: { paymentBookId: paymentBook.get('id') } });
    res.json(fees);
});
exports.getStudentFees = getStudentFees;
// Consultar estado de matrícula
const getStudentEnrollment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId } = req.params;
    const enrollment = yield enrollment_1.Enrollment.findOne({ where: { studentId } });
    if (!enrollment)
        return res.status(404).json({ msg: 'Matrícula no encontrada' });
    res.json(enrollment);
});
exports.getStudentEnrollment = getStudentEnrollment;
// Verificar si un studentID existe
const checkStudentIdExists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string') {
            return res.status(400).json({ error: 'ID inválido' });
        }
        const exists = yield student_1.Student.findOne({ where: { studentID: id } });
        res.json({ exists: !!exists });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al verificar el ID' });
    }
});
exports.checkStudentIdExists = checkStudentIdExists;
// Verificar si un correo existe
const checkStudentEmailExists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        if (!email || typeof email !== 'string' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            return res.status(400).json({ error: 'Email inválido' });
        }
        const exists = yield student_1.Student.findOne({ where: { correo: email } });
        res.json({ exists: !!exists });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al verificar el email' });
    }
});
exports.checkStudentEmailExists = checkStudentEmailExists;
// Obtener el siguiente studentID sugerido a partir de año y apellidos
const getNextStudentIdSimple = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { year, lastName } = req.query;
        // Validaciones básicas
        if (!year || isNaN(Number(year)) || String(year).length !== 4) {
            return res.status(400).json({ error: 'El parámetro year es requerido y debe ser un año válido (YYYY)' });
        }
        if (!lastName || typeof lastName !== 'string') {
            return res.status(400).json({ error: 'lastName es requerido y debe ser una cadena válida' });
        }
        // Tomar las dos primeras iniciales de los apellidos (pueden ser compuestos)
        const apellidos = lastName.trim().split(/\s+/);
        let initials = '';
        if (apellidos.length >= 2) {
            initials = `${apellidos[0][0] || ''}${apellidos[1][0] || ''}`;
        }
        else if (apellidos.length === 1) {
            initials = `${apellidos[0][0] || ''}`;
        }
        initials = initials.toUpperCase();
        const cleanYear = String(year);
        const baseId = `${initials}${cleanYear}`;
        // Buscar IDs que empiecen con el baseId
        const students = yield student_1.Student.findAll({
            where: {
                studentID: {
                    [sequelize_1.Op.like]: `${baseId}%`
                }
            },
            attributes: ['studentID'],
            order: [['studentID', 'ASC']]
        });
        let maxNum = 0;
        const numericSuffixes = students
            .map(s => {
            const studentId = s.get('studentID');
            const match = studentId.match(new RegExp(`^${baseId}(\\d+)$`));
            return match ? parseInt(match[1], 10) : 0;
        })
            .filter(num => !isNaN(num) && num > 0);
        if (numericSuffixes.length > 0) {
            maxNum = Math.max(...numericSuffixes);
        }
        const nextNum = (maxNum + 1).toString().padStart(3, '0');
        const nextId = `${baseId}${nextNum}`;
        return res.json({ nextId });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error al calcular el siguiente ID' });
    }
});
exports.getNextStudentIdSimple = getNextStudentIdSimple;
