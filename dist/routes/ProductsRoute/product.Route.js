"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_Controller_1 = require("../../controllers/ProductsControllers/Product.Controller");
const validate_token_1 = __importDefault(require("../../routes/UserRoute/validate-token"));
const authorizeRole_1 = require("../../middlewares/authorizeRole");
const router = (0, express_1.Router)();
router.post('/', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudian'), Product_Controller_1.createProduct);
router.get('/', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudian'), Product_Controller_1.getAllProducts);
router.get('/:id', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudian'), Product_Controller_1.getProductById);
router.put('/:id', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudian'), Product_Controller_1.updateProduct);
router.delete('/:id', validate_token_1.default, (0, authorizeRole_1.authorizeRole)('Administrador', 'Colecturia', 'Atencion al estudian'), Product_Controller_1.deleteProduct);
exports.default = router;
