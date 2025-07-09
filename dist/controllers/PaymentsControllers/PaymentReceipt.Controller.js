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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReceiptById = exports.updateReceiptStatus = exports.listReceipts = exports.createReceipt = void 0;
const paymentReceipt_1 = __importDefault(require("../../models/paymentsModels/paymentReceipt"));
const sequelize_1 = require("sequelize");
const createReceipt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { paymentId, amount, notes } = req.body;
        const receipt = yield paymentReceipt_1.default.create({
            paymentId,
            amount,
            notes,
            status: 'emitido',
            issuedAt: new Date(),
        });
        res.status(201).json(receipt);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creando recibo', error });
    }
});
exports.createReceipt = createReceipt;
const listReceipts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const receipts = yield paymentReceipt_1.default.findAll({
            where: {
                amount: { [sequelize_1.Op.gt]: 0 },
            },
        });
        res.json(receipts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error listando recibos', error });
    }
});
exports.listReceipts = listReceipts;
const updateReceiptStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status, updatedBy, notes } = req.body;
        const receipt = yield paymentReceipt_1.default.findByPk(id);
        if (!receipt)
            return res.status(404).json({ message: 'Recibo no encontrado' });
        yield receipt.update(Object.assign({ status,
            updatedBy, updatedAt: new Date() }, (notes && { notes })));
        res.json(receipt);
    }
    catch (error) {
        res.status(500).json({ message: 'Error actualizando estado', error });
    }
});
exports.updateReceiptStatus = updateReceiptStatus;
const getReceiptById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const receipt = yield paymentReceipt_1.default.findByPk(id);
        if (!receipt)
            return res.status(404).json({ message: 'Recibo no encontrado' });
        res.json(receipt);
    }
    catch (error) {
        res.status(500).json({ message: 'Error obteniendo recibo', error });
    }
});
exports.getReceiptById = getReceiptById;
