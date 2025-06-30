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
exports.createQuoteDetails = exports.updateQuoteDetails = exports.deleteQuoteDetails = exports.getQuoteDetails = void 0;
const quoteDetails_1 = require("../../models/Quote/quoteDetails");
const quote_1 = require("../../models/Quote/quote");
const getQuoteDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quoteId } = req.params;
        if (!quoteId) {
            return res.status(400).json({ message: "Falta el ID de la cotizacion" });
        }
        const quotes = yield quoteDetails_1.quoteDetails.findAll({
            attributes: ['id', 'quoteId', 'product', 'quantity', 'price', 'subtotal'],
            where: { quoteId: quoteId },
        });
        return res.status(200).json(quotes);
    }
    catch (error) {
        console.error("Error al obtener:", error);
        return res.status(500).json({ message: "Error al obtener las notas" });
    }
});
exports.getQuoteDetails = getQuoteDetails;
const deleteQuoteDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Falta el ID" });
        }
        // Buscar el detalle a eliminar
        const detail = yield quoteDetails_1.quoteDetails.findByPk(id);
        if (!detail) {
            return res.status(404).json({ message: "no encontrada" });
        }
        // Guardar el quoteId antes de eliminar
        const quoteId = detail.getDataValue('quoteId');
        // Eliminar el detalle
        yield detail.destroy();
        // Recalcular el total sumando los subtotales restantes
        const remainingDetails = yield quoteDetails_1.quoteDetails.findAll({
            where: { quoteId }
        });
        const newTotal = remainingDetails.reduce((sum, d) => sum + Number(d.getDataValue('subtotal')), 0);
        // Actualizar el total en la tabla quote usando el modelo importado directamente
        const quoteInstance = yield quote_1.quote.findByPk(quoteId);
        if (quoteInstance) {
            quoteInstance.set({ total: newTotal });
            yield quoteInstance.save();
        }
        else {
            console.error("No se encontró la cotización para actualizar el total");
        }
        return res.status(200).json({ message: "Eliminado correctamente", newTotal });
    }
    catch (error) {
        console.error("Error al eliminar la nota:", error);
        return res.status(500).json({ message: "Error al eliminar", error });
    }
});
exports.deleteQuoteDetails = deleteQuoteDetails;
const updateQuoteDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { product, quantity, price, subtotal } = req.body;
        if (!product || !quantity || !price || !subtotal) {
            return res.status(400).json({ message: "Faltan datos" });
        }
        const Update = yield quoteDetails_1.quoteDetails.findByPk(id);
        if (!Update) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }
        Update.set({ product, quantity, price, subtotal });
        yield Update.save();
        // Obtener el quoteId del detalle actualizado
        const quoteId = Update.getDataValue('quoteId');
        // Recalcular el total sumando los subtotales restantes
        const remainingDetails = yield quoteDetails_1.quoteDetails.findAll({
            where: { quoteId }
        });
        const newTotal = remainingDetails.reduce((sum, d) => sum + Number(d.getDataValue('subtotal')), 0);
        // Actualizar el total en la tabla quote
        const quoteInstance = yield quote_1.quote.findByPk(quoteId);
        if (quoteInstance) {
            quoteInstance.set({ total: newTotal });
            yield quoteInstance.save();
        }
        else {
            console.error("No se encontró la cotización para actualizar el total");
        }
        return res.status(200).json(Update);
    }
    catch (error) {
        console.error("Error al actualizar la nota:", error);
        return res.status(500).json({ message: "Error al actualizar la nota" });
    }
});
exports.updateQuoteDetails = updateQuoteDetails;
const createQuoteDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyId, quoteId, product, quantity, price, subtotal } = req.body;
        if (!quoteId || !product || !quantity || !price || !subtotal) {
            return res.status(400).json({ message: "Faltan datos" });
        }
        const newQuoteDetail = yield quoteDetails_1.quoteDetails.create({
            companyId,
            quoteId,
            product,
            quantity,
            price,
            subtotal
        });
        // Recalcular el total sumando los subtotales restantes
        const remainingDetails = yield quoteDetails_1.quoteDetails.findAll({
            where: { quoteId }
        });
        const newTotal = remainingDetails.reduce((sum, d) => sum + Number(d.getDataValue('subtotal')), 0);
        // Actualizar el total en la tabla quote
        const quoteInstance = yield quote_1.quote.findByPk(quoteId);
        if (quoteInstance) {
            quoteInstance.set({ total: newTotal });
            yield quoteInstance.save();
        }
        else {
            console.error("No se encontró la cotización para actualizar el total");
        }
        return res.status(201).json(newQuoteDetail);
    }
    catch (error) {
        console.error("Error al crear el registro:", error);
        return res.status(500).json({ message: "Error al crear el registro", error });
    }
});
exports.createQuoteDetails = createQuoteDetails;
