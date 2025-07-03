"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FeeConfig_Controller_1 = require("../../controllers/PaymentsControllers/FeeConfig.Controller");
const validate_token_1 = __importDefault(require("../../routes/UserRoute/validate-token"));
const authorizeRole_1 = require("../../middlewares/authorizeRole");
const router = (0, express_1.Router)();
router.post('/', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudian'), FeeConfig_Controller_1.createFeeConfig);
router.get('/', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudian'), FeeConfig_Controller_1.getAllFeeConfigs);
router.get('/:id', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudian'), FeeConfig_Controller_1.getFeeConfigById);
router.put('/:id', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudian'), FeeConfig_Controller_1.updateFeeConfig);
router.delete('/:id', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudian'), FeeConfig_Controller_1.deleteFeeConfig);
exports.default = router;
