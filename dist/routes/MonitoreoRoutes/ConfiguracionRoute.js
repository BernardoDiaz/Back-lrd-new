"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("../UserRoute/validate-token"));
const ConfiguracionController_1 = require("../../controllers/MonitoreoControllers/ConfiguracionController");
const router = (0, express_1.Router)();
router.post("/", validate_token_1.default, ConfiguracionController_1.newConfiguracion);
router.get("/", validate_token_1.default, ConfiguracionController_1.getConfiguracion);
router.put("/:id", validate_token_1.default, ConfiguracionController_1.updateConfiguracion);
router.delete("/:id", validate_token_1.default, ConfiguracionController_1.deleteConfiguracion);
exports.default = router;
