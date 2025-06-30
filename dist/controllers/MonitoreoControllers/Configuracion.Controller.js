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
exports.deleteConfiguracion = exports.updateConfiguracion = exports.newConfiguracion = exports.getConfiguracion = void 0;
const Configuracion_1 = require("../../models/MonitoreoModels/Configuracion");
const sequelize_1 = require("sequelize");
const getConfiguracion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const configuracion = yield Configuracion_1.Configuracions.findAll({
            attributes: ['id', 'pais', 'metaEconomica', 'metaClientes']
        });
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
const newConfiguracion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pais, yearConfiguracion, metaEconomica, metaClientes } = req.body;
    try {
        const existingConfiguracion = yield Configuracion_1.Configuracions.findOne({
            where: {
                pais: {
                    [sequelize_1.Op.like]: pais
                }
            }
        });
        if (existingConfiguracion) {
            return res.status(400).json({
                msg: "El país ya ha sido ingresado"
            });
        }
        const configuracion = yield Configuracion_1.Configuracions.create({
            pais,
            yearConfiguracion,
            metaEconomica,
            metaClientes
        });
        res.json(configuracion);
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.newConfiguracion = newConfiguracion;
const updateConfiguracion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { pais, yearConfiguracion, metaEconomica, metaClientes } = req.body;
    try {
        const valid = yield Configuracion_1.Configuracions.findByPk(id);
        if (!valid) {
            return res.status(404).json({
                msg: "Configuración no encontrada"
            });
        }
        const configuracion = yield Configuracion_1.Configuracions.update({
            pais,
            yearConfiguracion,
            metaEconomica,
            metaClientes
        }, {
            where: {
                id
            }
        });
        res.json(configuracion);
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
    try {
        const valid = yield Configuracion_1.Configuracions.findByPk(id);
        if (!valid) {
            return res.status(404).json({
                msg: "Configuración no encontrada"
            });
        }
        const configuracion = yield Configuracion_1.Configuracions.destroy({
            where: {
                id
            }
        });
        res.json(configuracion);
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.deleteConfiguracion = deleteConfiguracion;
