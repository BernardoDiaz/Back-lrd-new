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
exports.deleteCliente = exports.updateCliente = exports.getCliente = exports.getClientes = exports.newCliente = void 0;
const Clientes_1 = require("../../models/MonitoreoModels/Clientes");
const newCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { empresa, contacto, telefonoFijo, celular, correo, pais } = req.body;
    try {
        //Guardando usuario en base de datos
        yield Clientes_1.Clientes.create({
            empresa: empresa,
            contacto: contacto,
            telefonoFijo: telefonoFijo,
            celular: celular,
            correo: correo,
            pais: pais
        });
        res.json({
            msg: `El contacto ${contacto} de la empresa "${empresa}" ha sido creado exitosamente`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.newCliente = newCliente;
const getClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientes = yield Clientes_1.Clientes.findAll({
            attributes: ['id', 'empresa', 'contacto', 'telefonoFijo', 'celular', 'correo', 'pais'],
        });
        res.json(clientes);
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
    ;
});
exports.getClientes = getClientes;
const getCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cliente = yield Clientes_1.Clientes.findAll({
            attributes: ['id', 'empresa', 'contacto'],
        });
        if (cliente) {
            res.json(cliente);
        }
        else {
            return res.status(404).json({
                msg: `El registro no existe`,
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.getCliente = getCliente;
const updateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield Clientes_1.Clientes.findOne({ where: { id: id } });
    const { empresa, contacto, telefonoFijo, celular, correo, pais } = req.body;
    try {
        if (one) {
            yield Clientes_1.Clientes.update({ empresa, contacto, telefonoFijo, celular, correo, pais }, { where: { id: id } });
        }
        else {
            return res.status(404).json({
                msg: `El registro no existe`,
            });
        }
        res.json({
            msg: `El contacto ${contacto} de la empresa "${empresa}" ha sido actualizado exitosamente`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.updateCliente = updateCliente;
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield Clientes_1.Clientes.findOne({ where: { id: id } });
    try {
        if (one) {
            yield Clientes_1.Clientes.destroy({ where: { id: id } });
        }
        else {
            return res.status(404).json({
                msg: `El registro no existe o fue eliminado`,
            });
        }
        res.json({
            msg: `El contacto ha sido eliminado exitosamente`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.deleteCliente = deleteCliente;
