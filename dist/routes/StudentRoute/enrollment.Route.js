"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enrollement_Controller_1 = require("../../controllers/EnrollementController/enrollement.Controller");
const router = (0, express_1.Router)();
// Ruta para obtener los años de matrícula disponibles (debe ir ANTES de las rutas con parámetros)
router.get("/years/all", enrollement_Controller_1.getEnrollmentYears);
// Ruta para consultar matrícula por studentId y opcionalmente por año (query o body)
router.get("/:studentId", enrollement_Controller_1.getEnrollmentByStudentId);
// Ruta para consultar matrícula por studentId y año específico como parámetro
router.get("/:studentId/:year", enrollement_Controller_1.getEnrollmentByStudentId);
// Ruta para actualizar montoPagado y saldo
router.put("/student/:studentId", enrollement_Controller_1.updateEnrollmentPayment);
// Ruta para crear matrícula y cuotas para un año específico
router.post("/:studentId", enrollement_Controller_1.createEnrollmentAndFeesForYear);
exports.default = router;
