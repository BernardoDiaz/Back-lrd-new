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
exports.deleteProductCategory = exports.updateProductCategory = exports.getProductCategoryById = exports.getAllProductCategories = exports.createProductCategory = void 0;
const productCategory_1 = require("../../models/productsModels/productCategory");
const createProductCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, descripcion } = req.body;
        const category = yield productCategory_1.ProductCategory.create({ nombre, descripcion });
        res.status(201).json(category);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.createProductCategory = createProductCategory;
const getAllProductCategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield productCategory_1.ProductCategory.findAll();
    res.json(categories);
});
exports.getAllProductCategories = getAllProductCategories;
const getProductCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield productCategory_1.ProductCategory.findByPk(id);
    if (!category)
        return res.status(404).json({ msg: 'No encontrado' });
    res.json(category);
});
exports.getProductCategoryById = getProductCategoryById;
const updateProductCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const category = yield productCategory_1.ProductCategory.findByPk(id);
    if (!category)
        return res.status(404).json({ msg: 'No encontrado' });
    yield category.update({ nombre, descripcion });
    res.json(category);
});
exports.updateProductCategory = updateProductCategory;
const deleteProductCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield productCategory_1.ProductCategory.findByPk(id);
    if (!category)
        return res.status(404).json({ msg: 'No encontrado' });
    yield category.destroy();
    res.json({ msg: 'Eliminado' });
});
exports.deleteProductCategory = deleteProductCategory;
