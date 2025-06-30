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
exports.deleteConfiguracion = exports.updateConfiguracion = exports.getConfiguracion = exports.newConfiguracion = void 0;
const Configuracion_1 = require("../../models/MonitoreoModels/Configuracion");
const newConfiguracion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { metaEconomica, metaClientes, metaElSalvador, metaGuatemala, metaHonduras, metaNicaragua, metaCostaRica, metaPanama } = req.body;
        const newConfiguracion = yield Configuracion_1.Configuracions.create({
            metaEconomica: metaEconomica,
            metaClientes: metaClientes,
            metaElSalvador: metaElSalvador,
            metaGuatemala: metaGuatemala,
            metaHonduras: metaHonduras,
            metaNicaragua: metaNicaragua,
            metaCostaRica: metaCostaRica,
            metaPanama: metaPanama
        });
        res.status(201).json(newConfiguracion);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating configuracion" });
    }
});
exports.newConfiguracion = newConfiguracion;
const getConfiguracion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const configuracion = yield Configuracion_1.Configuracions.findAll();
        res.json(configuracion);
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.getConfiguracion = getConfiguracion;
const updateConfiguracion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield Configuracion_1.Configuracions.findOne({ where: { id: id } });
    const { metaEconomica, metaClientes, metaElSalvador, metaGuatemala, metaHonduras, metaNicaragua, metaCostaRica, metaPanama } = req.body;
    try {
        if (one) {
            yield Configuracion_1.Configuracions.update({ metaEconomica, metaClientes, metaElSalvador, metaGuatemala, metaHonduras,
                metaNicaragua, metaCostaRica, metaPanama }, { where: { id: id } });
        }
        else {
            return res.status(404).json({
                msg: `El registro no existe`,
            });
        }
        res.json({
            msg: `La configuración ha sido actualizado exitosamente`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.updateConfiguracion = updateConfiguracion;
const deleteConfiguracion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield Configuracion_1.Configuracions.findOne({ where: { id: id } });
    try {
        if (one) {
            yield Configuracion_1.Configuracions.destroy({ where: { id: id } });
        }
        else {
            return res.status(404).json({
                msg: `El registro no existe`,
            });
        }
        res.json({
            msg: `La configuración ha sido eliminado exitosamente`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.deleteConfiguracion = deleteConfiguracion;
