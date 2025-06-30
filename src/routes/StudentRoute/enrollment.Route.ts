import { Router } from "express";
import { getEnrollmentByStudentId, updateEnrollmentPayment, createEnrollmentAndFeesForYear, getEnrollmentYears } from "../../controllers/EnrollementController/enrollement.Controller";

const router = Router();

// Ruta para obtener los años de matrícula disponibles (debe ir ANTES de las rutas con parámetros)
router.get("/years/all", getEnrollmentYears);
// Ruta para consultar matrícula por studentId y opcionalmente por año (query o body)
router.get("/:studentId", getEnrollmentByStudentId);
// Ruta para consultar matrícula por studentId y año específico como parámetro
router.get("/:studentId/:year", getEnrollmentByStudentId);
// Ruta para actualizar montoPagado y saldo
router.put("/student/:studentId", updateEnrollmentPayment);
// Ruta para crear matrícula y cuotas para un año específico
router.post("/:studentId", createEnrollmentAndFeesForYear);

export default router;
