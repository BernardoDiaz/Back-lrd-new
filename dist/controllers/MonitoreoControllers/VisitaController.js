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
exports.deleteVisita = exports.updateVisita = exports.getVisitasAgendadas = exports.getVisitas = exports.newVisita = void 0;
const Visita_1 = require("../../models/MonitoreoModels/Visita");
const Clientes_1 = require("../../models/MonitoreoModels/Clientes");
const newVisita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCliente, asunto, fecha, hora, objetivo } = req.body;
    try {
        yield Visita_1.Visitas.create({
            idCliente: idCliente,
            asunto: asunto,
            fecha: fecha,
            hora: hora,
            objetivo: objetivo
        });
        res.json({
            msg: `La visita ha sido creada exitosamente`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.newVisita = newVisita;
const getVisitas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const visitas = yield Visita_1.Visitas.findAll({
            attributes: ['id', 'idCliente', 'asunto', 'fecha', 'hora', 'objetivo'],
        });
        res.json(visitas);
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.getVisitas = getVisitas;
const getVisitasAgendadas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultados = yield Visita_1.Visitas.findAll({
            attributes: ['idCliente'],
            include: [{
                    model: Clientes_1.Clientes,
                    as: 'cliente',
                    attributes: ['empresa', 'contacto'],
                    required: true // Realiza un INNER JOIN (relación obligatoria)
                }]
        });
        res.json(resultados);
    }
    catch (error) {
        console.error('Error al realizar la consulta:', error);
        res.status(500).json({
            msg: 'Error al obtener los clientes con visitas',
            error: (error instanceof Error) ? error.message : 'Unknown error'
        });
    }
});
exports.getVisitasAgendadas = getVisitasAgendadas;
const updateVisita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield Visita_1.Visitas.findOne({ where: { id: id } });
    const { idCliente, asunto, fecha, hora, observaciones } = req.body;
    try {
        if (one) {
            yield Visita_1.Visitas.update({ idCliente: idCliente, asunto: asunto, fecha: fecha, hora: hora, observaciones: observaciones }, { where: { id: id } });
        }
        else {
            return res.status(404).json({
                msg: `El registro no existe`,
            });
        }
        res.json({
            msg: `La visita ha sido actualizada exitosamente`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.updateVisita = updateVisita;
const deleteVisita = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield Visita_1.Visitas.findOne({ where: { id: id } });
    try {
        if (one) {
            yield Visita_1.Visitas.destroy({ where: { id: id } });
        }
        else {
            return res.status(404).json({
                msg: `El registro no existe`,
            });
        }
        res.json({
            msg: `La visita ha sido eliminada exitosamente`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.deleteVisita = deleteVisita;
