"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Student_Controller_1 = require("../../controllers/StudentControllers/Student.Controller");
const validate_token_1 = __importDefault(require("../../routes/UserRoute/validate-token"));
const authorizeRole_1 = require("../../middlewares/authorizeRole");
const router = (0, express_1.Router)();
// ¡IMPORTANTE! Primero las rutas más específicas:
router.get('/next-id', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudiante'), Student_Controller_1.getNextStudentIdSimple);
router.post('/', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudiante'), Student_Controller_1.createAspirant);
router.get('/', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudiante'), Student_Controller_1.getAllStudents);
router.get('/:id', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudiante'), Student_Controller_1.getStudentById);
router.put('/:id', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudiante'), Student_Controller_1.updateStudent);
router.delete('/:studentId', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudiante'), Student_Controller_1.deleteStudent);
router.post('/promote/:studentId', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudiante'), Student_Controller_1.promoteToStudent);
router.get('/:id/fees', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudiante'), Student_Controller_1.getStudentFees);
router.get('/:id/enrollment', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudiante'), Student_Controller_1.getStudentEnrollment);
router.get('/check-id/:id', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudiante'), Student_Controller_1.checkStudentIdExists);
router.get('/check-email/:email', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudiante'), Student_Controller_1.checkStudentEmailExists);
router.get('/generate-next-id/:baseId', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudiante'), Student_Controller_1.getNextStudentIdSimple);
exports.default = router;
