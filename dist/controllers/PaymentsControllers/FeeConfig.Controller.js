"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFeeConfig = exports.updateFeeConfig = exports.getFeeConfigById = exports.getAllFeeConfigs = exports.createFeeConfig = void 0;
const feeConfig_1 = require("../../models/paymentsModels/feeConfig");
// Crear configuración de montos por nivel
const createFeeConfig = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nivel, montoCuota, montoMatricula } = req.body;
        const config = yield feeConfig_1.FeeConfig.create({ nivel, montoCuota, montoMatricula });
        res.status(201).json(config);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.createFeeConfig = createFeeConfig;
// Listar todas las configuraciones
const getAllFeeConfigs = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const configs = yield feeConfig_1.FeeConfig.findAll();
    res.json(configs);
});
exports.getAllFeeConfigs = getAllFeeConfigs;
// Obtener configuración por ID
const getFeeConfigById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const config = yield feeConfig_1.FeeConfig.findByPk(id);
    if (!config)
        return res.status(404).json({ msg: 'No encontrado' });
    res.json(config);
});
exports.getFeeConfigById = getFeeConfigById;
// Actualizar configuración
const updateFeeConfig = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nivel, montoCuota, montoMatricula } = req.body;
    const config = yield feeConfig_1.FeeConfig.findByPk(id);
    if (!config)
        return res.status(404).json({ msg: 'No encontrado' });
    yield config.update({ nivel, montoCuota, montoMatricula });
    res.json(config);
});
exports.updateFeeConfig = updateFeeConfig;
// Eliminar configuración
const deleteFeeConfig = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const config = yield feeConfig_1.FeeConfig.findByPk(id);
    if (!config)
        return res.status(404).json({ msg: 'No encontrado' });
    yield config.destroy();
    res.json({ msg: 'Eliminado' });
});
exports.deleteFeeConfig = deleteFeeConfig;
