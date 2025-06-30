import { Request, Response } from "express";
import { FeeConfig } from "../../models/paymentsModels/feeConfig";

// Crear configuración de montos por nivel
export const createFeeConfig = async (req: Request, res: Response) => {
    try {
        const { nivel, montoCuota, montoMatricula } = req.body;
        const config = await FeeConfig.create({ nivel, montoCuota, montoMatricula });
        res.status(201).json(config);
    } catch (error) {
        res.status(400).json({ error });
    }
};

// Listar todas las configuraciones
export const getAllFeeConfigs = async (_req: Request, res: Response) => {
    const configs = await FeeConfig.findAll();
    res.json(configs);
};

// Obtener configuración por ID
export const getFeeConfigById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const config = await FeeConfig.findByPk(id);
    if (!config) return res.status(404).json({ msg: 'No encontrado' });
    res.json(config);
};

// Actualizar configuración
export const updateFeeConfig = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nivel, montoCuota, montoMatricula } = req.body;
    const config = await FeeConfig.findByPk(id);
    if (!config) return res.status(404).json({ msg: 'No encontrado' });
    await config.update({ nivel, montoCuota, montoMatricula });
    res.json(config);
};

// Eliminar configuración
export const deleteFeeConfig = async (req: Request, res: Response) => {
    const { id } = req.params;
    const config = await FeeConfig.findByPk(id);
    if (!config) return res.status(404).json({ msg: 'No encontrado' });
    await config.destroy();
    res.json({ msg: 'Eliminado' });
};
