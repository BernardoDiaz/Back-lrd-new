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
exports.EliminarSeguimiento = exports.ActualizarSeguimiento = exports.NuevoSeguimiento = exports.getSeguimiento = void 0;
const Seguimiento_1 = require("../../models/MonitoreoModels/Seguimiento");
const getSeguimiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seguimiento = yield Seguimiento_1.Seguimientos.findAll();
        res.json(seguimiento);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los seguimientos" });
    }
});
exports.getSeguimiento = getSeguimiento;
const NuevoSeguimiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idCliente, idNuevaVisita, resultadoVisita, comentariosVisita, cotizacion, numeroCotizacion, proximosPasos, estadoSeguimiento } = req.body;
        const nuevoSeguimiento = yield Seguimiento_1.Seguimientos.create({
            idClientes: idCliente,
            idNuevaVisita: idNuevaVisita,
            resultadoVisita: resultadoVisita,
            comentariosVisita: comentariosVisita,
            cotizacion: cotizacion,
            numeroCotizacion: numeroCotizacion,
            proximosPasos: proximosPasos,
            estadoSeguimiento: estadoSeguimiento
        });
        res.status(201).json(nuevoSeguimiento);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el seguimiento" });
    }
});
exports.NuevoSeguimiento = NuevoSeguimiento;
const ActualizarSeguimiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idSeguimiento } = req.params;
        const { idCliente, idNuevaVisita, resultadoVisita, comentariosVisita, cotizacion, numeroCotizacion, proximosPasos, estadoSeguimiento } = req.body;
        const seguimiento = yield Seguimiento_1.Seguimientos.findByPk(idSeguimiento);
        if (!seguimiento) {
            return res.status(404).json({ error: "Seguimiento no encontrado" });
        }
        yield Seguimiento_1.Seguimientos.update({
            idClientes: idCliente,
            idNuevaVisita: idNuevaVisita,
            resultadoVisita: resultadoVisita,
            comentariosVisita: comentariosVisita,
            cotizacion: cotizacion,
            numeroCotizacion: numeroCotizacion,
            proximosPasos: proximosPasos,
            estadoSeguimiento: estadoSeguimiento
        }, {
            where: { id: idSeguimiento }
        });
        res.json({ message: "Seguimiento actualizado correctamente" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el seguimiento" });
    }
});
exports.ActualizarSeguimiento = ActualizarSeguimiento;
const EliminarSeguimiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idSeguimiento } = req.params;
        const seguimiento = yield Seguimiento_1.Seguimientos.findByPk(idSeguimiento);
        if (!seguimiento) {
            return res.status(404).json({ error: "Seguimiento no encontrado" });
        }
        yield Seguimiento_1.Seguimientos.destroy({
            where: { id: idSeguimiento }
        });
        res.json({ message: "Seguimiento eliminado correctamente" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el seguimiento" });
    }
});
exports.EliminarSeguimiento = EliminarSeguimiento;
