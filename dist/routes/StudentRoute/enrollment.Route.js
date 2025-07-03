"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enrollement_Controller_1 = require("../../controllers/EnrollementController/enrollement.Controller");
const validate_token_1 = __importDefault(require("../../routes/UserRoute/validate-token"));
const authorizeRole_1 = require("../../middlewares/authorizeRole");
const router = (0, express_1.Router)();
// Ruta para obtener los años de matrícula disponibles (debe ir ANTES de las rutas con parámetros)
router.get("/years/all", validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudiante'), enrollement_Controller_1.getEnrollmentYears);
// Ruta para consultar matrícula por studentId y opcionalmente por año (query o body)
router.get("/:studentId", validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudiante'), enrollement_Controller_1.getEnrollmentByStudentId);
// Ruta para consultar matrícula por studentId y año específico como parámetro
router.get("/:studentId/:year", validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudiante'), enrollement_Controller_1.getEnrollmentByStudentId);
// Ruta para actualizar montoPagado y saldo
router.put("/student/:studentId", validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudiante'), enrollement_Controller_1.updateEnrollmentPayment);
// Ruta para crear matrícula y cuotas para un año específico
router.post("/:studentId", validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudiante'), enrollement_Controller_1.createEnrollmentAndFeesForYear);
exports.default = router;
