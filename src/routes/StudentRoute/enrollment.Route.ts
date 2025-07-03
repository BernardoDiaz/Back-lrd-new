import { Router } from "express";
import { getEnrollmentByStudentId, updateEnrollmentPayment, createEnrollmentAndFeesForYear, getEnrollmentYears } from "../../controllers/EnrollementController/enrollement.Controller";
import validateToken from '../../routes/UserRoute/validate-token';
import { authorizeRole } from '../../middlewares/authorizeRole';

const router = Router();

// Ruta para obtener los años de matrícula disponibles (debe ir ANTES de las rutas con parámetros)
router.get("/years/all", validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudiante'), getEnrollmentYears);
// Ruta para consultar matrícula por studentId y opcionalmente por año (query o body)
router.get("/:studentId", validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudiante'), getEnrollmentByStudentId);
// Ruta para consultar matrícula por studentId y año específico como parámetro
router.get("/:studentId/:year", validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudiante'), getEnrollmentByStudentId);
// Ruta para actualizar montoPagado y saldo
router.put("/student/:studentId", validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudiante'), updateEnrollmentPayment);
// Ruta para crear matrícula y cuotas para un año específico
router.post("/:studentId", validateToken, authorizeRole('Administrador', 'Colecturia', 'Atencion al estudiante'), createEnrollmentAndFeesForYear);

export default router;
