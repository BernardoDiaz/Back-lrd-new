import { Request, Response } from "express";
import { ProductCategory } from "../../models/productsModels/productCategory";

export const createProductCategory = async (req: Request, res: Response) => {
    try {
        const { nombre, descripcion } = req.body;
        const category = await ProductCategory.create({ nombre, descripcion });
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error });
    }
};

export const getAllProductCategories = async (_req: Request, res: Response) => {
    const categories = await ProductCategory.findAll();
    res.json(categories);
};

export const getProductCategoryById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await ProductCategory.findByPk(id);
    if (!category) return res.status(404).json({ msg: 'No encontrado' });
    res.json(category);
};

export const updateProductCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const category = await ProductCategory.findByPk(id);
    if (!category) return res.status(404).json({ msg: 'No encontrado' });
    await category.update({ nombre, descripcion });
    res.json(category);
};

export const deleteProductCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await ProductCategory.findByPk(id);
    if (!category) return res.status(404).json({ msg: 'No encontrado' });
    await category.destroy();
    res.json({ msg: 'Eliminado' });
};
