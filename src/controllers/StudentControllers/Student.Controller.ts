import { Request, Response } from "express";
import { Student } from "../../models/studentsModels/student";
import { PaymentBook } from "../../models/paymentsModels/paymentBook";
import { Enrollment } from "../../models/paymentsModels/enrollment";
import { Fee } from "../../models/paymentsModels/fee";
import { FeeConfig } from "../../models/paymentsModels/feeConfig";
import { Op } from "sequelize";

// Crear nuevo aspirante
export const createAspirant = async (req: Request, res: Response) => {
    try {
        const {
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
            enrollmentYear
        } = req.body;
        // Buscar montos en FeeConfig por nivel
        const config = await FeeConfig.findOne({ where: { nivel } });
        if (!config) {
            return res.status(400).json({ msg: 'No existe configuración de montos para el nivel especificado.' });
        }
        const cuotaFinal = config.get('montoCuota');
        const matriculaFinal = config.get('montoMatricula');
        const student = await Student.create({
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
            let paymentBook = await PaymentBook.findOne({ where: { studentId: student.get('studentID') } });
            let year = new Date().getFullYear();
            if (paymentBook) {
                year = paymentBook.get('year') as number;
            } else {
                // Si no existe, usar el año de inscripción recibido o el actual
                year = (enrollmentYear && !isNaN(Number(enrollmentYear))) ? Number(enrollmentYear) : new Date().getFullYear();
                paymentBook = await PaymentBook.create({ studentId: student.get('studentID'), year });
            }
            await Enrollment.create({ studentId: student.get('studentID'), montoTotal: matriculaFinal, year });
            // Generar automáticamente 11 cuotas (enero a noviembre)
            const meses = [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre'
            ];  
            const cuotas = meses.map(mes => ({
                paymentBookId: paymentBook!.get('id'),
                studentId: student.get('studentID'),
                mes,
                monto: cuotaFinal,
                pagado: false,
                year
            })); 
            await Fee.bulkCreate(cuotas); 
        }
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ error });
    }
};

// Listar todos los estudiantes/aspirantes
export const getAllStudents = async (_req: Request, res: Response) => {
    const students = await Student.findAll();
    res.json(students); 
}; 

// Obtener un estudiante por ID
export const getStudentById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    if (!student) return res.status(404).json({ msg: 'No encontrado' });
    res.json(student);  
};

// Actualizar datos de estudiante
export const updateStudent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
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
    } = req.body;
    const student = await Student.findByPk(id);
    if (!student) return res.status(404).json({ msg: 'No encontrado' });
    await student.update({
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
};


// Eliminar estudiante
export const deleteStudent = async (req: Request, res: Response) => {
    const { studentId } = req.params;
    const student = await Student.findOne({ where: { studentID: studentId } });
    if (!student) return res.status(404).json({ msg: 'No encontrado' });
    await student.destroy();
    res.json({ msg: 'Eliminado' });
};


// Cambiar aspirante a estudiante
export const promoteToStudent = async (req: Request, res: Response) => {
    const { studentId } = req.params;
    // Buscar el estudiante en la base de datos
    const student = await Student.findOne({ where: { studentID: studentId } });
    if (!student) return res.status(404).json({ msg: 'No encontrado' });
    if (student.get('tipo') !== 'estudiante') {
        // Cambiar tipo a estudiante
        await student.update({ tipo: 'estudiante' });
        // Buscar montos en FeeConfig por nivel
        const nivel = student.get('nivel');
        const config = await FeeConfig.findOne({ where: { nivel } });
        if (!config) {
            return res.status(400).json({ msg: 'No existe configuración de montos para el nivel especificado.' });
        }
        const cuotaFinal = config.get('montoCuota');
        const matriculaFinal = config.get('montoMatricula');
        // Tomar el año desde el campo year del estudiante
        let year = student.get('year') ? Number(student.get('year')) : new Date().getFullYear();
        // Buscar el paymentBook existente para el estudiante
        let paymentBook = await PaymentBook.findOne({ where: { studentId: student.get('studentID') } });
        if (!paymentBook) {
            paymentBook = await PaymentBook.create({ studentId: student.get('studentID'), year });
        } 
        await Enrollment.create({ studentId: student.get('studentID'), montoTotal: matriculaFinal, year });
        // Generar automáticamente 11 cuotas (enero a noviembre)
        const meses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre'
        ];  
        const cuotas = meses.map(mes => ({
            paymentBookId: paymentBook!.get('id'),
            studentId: student.get('studentID'),
            mes,
            monto: cuotaFinal,
            pagado: false,
            year
        })); 
        await Fee.bulkCreate(cuotas); 
    }
    res.json(student);
};

// Consultar cuotas de un estudiante
export const getStudentFees = async (req: Request, res: Response) => {
    const { studentId } = req.params;
    // Buscar el talonario del estudiante
    const paymentBook = await PaymentBook.findOne({ where: { studentId } });
    if (!paymentBook) return res.status(404).json({ msg: 'Talonario no encontrado' });
    const fees = await Fee.findAll({ where: { paymentBookId: paymentBook.get('id') } });
    res.json(fees);
};

// Consultar estado de matrícula
export const getStudentEnrollment = async (req: Request, res: Response) => {
    const { studentId } = req.params;
    const enrollment = await Enrollment.findOne({ where: { studentId } });
    if (!enrollment) return res.status(404).json({ msg: 'Matrícula no encontrada' });
    res.json(enrollment);
};

// Verificar si un studentID existe
export const checkStudentIdExists = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string') {
            return res.status(400).json({ error: 'ID inválido' });
        }
        const exists = await Student.findOne({ where: { studentID: id } });
        res.json({ exists: !!exists });
    } catch (error) {
        res.status(500).json({ error: 'Error al verificar el ID' });
    }
};

// Verificar si un correo existe
export const checkStudentEmailExists = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        if (!email || typeof email !== 'string' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            return res.status(400).json({ error: 'Email inválido' });
        }
        const exists = await Student.findOne({ where: { correo: email } });
        res.json({ exists: !!exists });
    } catch (error) {
        res.status(500).json({ error: 'Error al verificar el email' });
    }
};

// Obtener el siguiente studentID sugerido a partir de año y apellidos
export const getNextStudentIdSimple = async (req: Request, res: Response) => {
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
        } else if (apellidos.length === 1) {
            initials = `${apellidos[0][0] || ''}`;
        }
        initials = initials.toUpperCase();
        const cleanYear = String(year);
        const baseId = `${initials}${cleanYear}`;
        // Buscar IDs que empiecen con el baseId
        const students = await Student.findAll({
            where: {
                studentID: {
                    [Op.like]: `${baseId}%`
                }
            },
            attributes: ['studentID'],
            order: [['studentID', 'ASC']]
        });
        let maxNum = 0;
        const numericSuffixes = students
            .map(s => {
                const studentId = s.get('studentID') as string;
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
    } catch (error) {
        return res.status(500).json({ error: 'Error al calcular el siguiente ID' });
    }
};
