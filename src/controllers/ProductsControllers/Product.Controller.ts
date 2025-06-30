import { Request, Response } from "express";
import { Product } from "../../models/productsModels/product";
import { ProductCategory } from "../../models/productsModels/productCategory";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { nombre, descripcion, precio, stock, productCategoryId } = req.body;
        // Validar que exista la categoría
        const category = await ProductCategory.findByPk(productCategoryId);
        if (!category) return res.status(400).json({ msg: 'Categoría no encontrada' });
        const product = await Product.create({ nombre, descripcion, precio, stock, productCategoryId });
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error });
    }
};

export const getAllProducts = async (_req: Request, res: Response) => {
    const products = await Product.findAll({ include: [ProductCategory] });
    res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id, { include: [ProductCategory] });
    if (!product) return res.status(404).json({ msg: 'No encontrado' });
    res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, productCategoryId } = req.body;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ msg: 'No encontrado' });
    await product.update({ nombre, descripcion, precio, stock, productCategoryId });
    res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ msg: 'No encontrado' });
    await product.destroy();
    res.json({ msg: 'Eliminado' });
};
