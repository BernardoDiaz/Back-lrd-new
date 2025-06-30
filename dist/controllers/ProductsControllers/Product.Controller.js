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
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const product_1 = require("../../models/productsModels/product");
const productCategory_1 = require("../../models/productsModels/productCategory");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, descripcion, precio, stock, productCategoryId } = req.body;
        // Validar que exista la categoría
        const category = yield productCategory_1.ProductCategory.findByPk(productCategoryId);
        if (!category)
            return res.status(400).json({ msg: 'Categoría no encontrada' });
        const product = yield product_1.Product.create({ nombre, descripcion, precio, stock, productCategoryId });
        res.status(201).json(product);
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.createProduct = createProduct;
const getAllProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.Product.findAll({ include: [productCategory_1.ProductCategory] });
    res.json(products);
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_1.Product.findByPk(id, { include: [productCategory_1.ProductCategory] });
    if (!product)
        return res.status(404).json({ msg: 'No encontrado' });
    res.json(product);
});
exports.getProductById = getProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, productCategoryId } = req.body;
    const product = yield product_1.Product.findByPk(id);
    if (!product)
        return res.status(404).json({ msg: 'No encontrado' });
    yield product.update({ nombre, descripcion, precio, stock, productCategoryId });
    res.json(product);
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_1.Product.findByPk(id);
    if (!product)
        return res.status(404).json({ msg: 'No encontrado' });
    yield product.destroy();
    res.json({ msg: 'Eliminado' });
});
exports.deleteProduct = deleteProduct;
