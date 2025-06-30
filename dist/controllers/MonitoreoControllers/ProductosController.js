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
exports.deleteProducto = exports.updateProducto = exports.getProductos = exports.newProducto = void 0;
const Productos_1 = require("../../models/MonitoreoModels/Productos");
const newProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idcategoria, producto, precio } = req.body;
    try {
        yield Productos_1.Productos.create({
            idCategoria: idcategoria,
            producto: producto,
            precio: precio
        });
        res.json({
            msg: `El producto ${producto} ha sido creado exitosamente`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.newProducto = newProducto;
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield Productos_1.Productos.findAll({
            attributes: ['id', 'idCategoria', 'producto', 'precio'],
        });
        res.json(productos);
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.getProductos = getProductos;
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield Productos_1.Productos.findOne({ where: { id: id } });
    const { idcategoria, producto, precio } = req.body;
    try {
        if (one) {
            yield Productos_1.Productos.update({ idCategoria: idcategoria, producto: producto, precio: precio }, { where: { id: id } });
        }
        else {
            return res.status(404).json({
                msg: `El registro no existe`,
            });
        }
        res.json({
            msg: `El producto ha sido actualizado exitosamente`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.updateProducto = updateProducto;
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const one = yield Productos_1.Productos.findOne({ where: { id: id } });
    try {
        if (one) {
            yield Productos_1.Productos.destroy({ where: { id: id } });
        }
        else {
            return res.status(404).json({
                msg: `El registro no existe`,
            });
        }
        res.json({
            msg: `El producto ha sido eliminado exitosamente`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.deleteProducto = deleteProducto;
