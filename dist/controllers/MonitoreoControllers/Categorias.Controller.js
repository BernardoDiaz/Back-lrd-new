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
exports.deleteCategoria = exports.updateCategoria = exports.getCategorias = exports.newCategoria = void 0;
const Categorias_1 = require("../../models/MonitoreoModels/Categorias");
const newCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoria } = req.body;
    try {
        //Guardando usuario en base de datos
        yield Categorias_1.Categorias.create({
            categoria: categoria
        });
        res.json({
            msg: `La categoria "${categoria}" ha sido creada exitosamente`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.newCategoria = newCategoria;
const getCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categorias = yield Categorias_1.Categorias.findAll({
            attributes: ['id', 'categoria']
        });
        res.json(categorias);
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.getCategorias = getCategorias;
const updateCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield Categorias_1.Categorias.findOne({ where: { id: id } });
    const { categoria } = req.body;
    try {
        if (one) {
            yield Categorias_1.Categorias.update({ categoria }, { where: { id: id } });
        }
        else {
            return res.status(404).json({
                msg: `El registro no existe`,
            });
        }
        res.json({
            msg: `La categoria "${categoria}" ha sido actualizada exitosamente`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.updateCategoria = updateCategoria;
const deleteCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield Categorias_1.Categorias.findOne({ where: { id: id } });
    try {
        if (one) {
            yield Categorias_1.Categorias.destroy({ where: { id: id } });
        }
        else {
            return res.status(404).json({
                msg: `El registro no existe`,
            });
        }
        res.json({
            msg: `La categoria ha sido eliminada exitosamente`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.deleteCategoria = deleteCategoria;
