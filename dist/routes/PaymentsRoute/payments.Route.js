"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Payments_Controller_1 = require("../../controllers/PaymentsControllers/Payments.Controller");
const validate_token_1 = __importDefault(require("../../routes/UserRoute/validate-token"));
const authorizeRole_1 = require("../../middlewares/authorizeRole");
const router = (0, express_1.Router)();
router.post('/', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudian'), Payments_Controller_1.createPayment);
router.post('/mixed', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudian'), Payments_Controller_1.registerMixedPayment);
router.get('/student/:studentId', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudian'), Payments_Controller_1.getPaymentsByStudent);
router.get('/student/:studentId/fees/current', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudian'), Payments_Controller_1.getCurrentYearFeesByStudent);
router.get('/student/:studentId/fees', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudian'), Payments_Controller_1.getFeesByStudentId);
exports.default = router;
