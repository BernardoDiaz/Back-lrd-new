import PaymentReceipt from '../../models/paymentsModels/paymentReceipt';
import { Request, Response } from 'express';
import { Op } from 'sequelize';

export const createReceipt = async (req: Request, res: Response) => {
  try {
    const { paymentId, amount, notes, metodoPago = 'efectivo', bancoDestino = null } = req.body;
    const receipt = await PaymentReceipt.create({
      paymentId,
      amount,
      notes,
      metodoPago,
      bancoDestino,
      status: 'emitido',
      issuedAt: new Date(),
    });
    res.status(201).json(receipt);
  } catch (error) {
    res.status(500).json({ message: 'Error creando recibo', error });
  }
};

export const listReceipts = async (_req: Request, res: Response) => {
  try {
    const receipts = await PaymentReceipt.findAll({
      where: {
        amount: { [Op.gt]: 0 },
      },
    });
    res.json(receipts);
  } catch (error) {
    res.status(500).json({ message: 'Error listando recibos', error });
  }
};

export const updateReceiptStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, updatedBy, notes } = req.body;
    const receipt = await PaymentReceipt.findByPk(id);
    if (!receipt) return res.status(404).json({ message: 'Recibo no encontrado' });
    await receipt.update({
      status,
      updatedBy,
      updatedAt: new Date(),
      ...(notes && { notes }),
    });
    res.json(receipt);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando estado', error });
  }
};

export const getReceiptById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const receipt = await PaymentReceipt.findByPk(id);
    if (!receipt) return res.status(404).json({ message: 'Recibo no encontrado' });
    res.json(receipt);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo recibo', error });
  }
};

export const getNextReceiptNumber = async (_req: Request, res: Response) => {
  try {
    const maxIdRaw = await PaymentReceipt.max('id');
    let maxId = 0;
    if (typeof maxIdRaw === 'number') {
      maxId = maxIdRaw;
    } else if (typeof maxIdRaw === 'string') {
      maxId = parseInt(maxIdRaw, 10) || 0;
    }
    const nextNumber = String(maxId + 1).padStart(7, '0');
    res.json({ nextReceiptNumber: nextNumber });
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo el próximo número de recibo', error });
  }
};
