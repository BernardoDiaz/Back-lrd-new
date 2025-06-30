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
exports.updateQuoteStatusById = exports.updateQuoteTotal = exports.updateQuote = exports.deleteQuote = exports.getQuote = exports.createQuoteWithDetails = void 0;
const quote_1 = require("../../models/Quote/quote");
const quoteDetails_1 = require("../../models/Quote/quoteDetails");
const createQuoteWithDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyId, concept, total, status, products } = req.body;
        if (!companyId || !concept || !total || !status || !products || products.length === 0) {
            return res.status(400).json({ message: "Faltan datos o la lista de productos está vacía" });
        }
        // Crear la cotización y obtener su ID  
        const newQuote = yield quote_1.quote.create({ companyId, concept, total, status });
        // Obtener el ID de la cotización creada
        const quoteId = newQuote.getDataValue('id');
        // Insertar los productos asociados a la cotización
        yield Promise.all(products.map(({ product, quantity, price, subtotal }) => quoteDetails_1.quoteDetails.create({ companyId, quoteId, product, quantity, price, subtotal })));
        return res.status(201).json({ message: "Cotización y productos creados correctamente" });
    }
    catch (error) {
        console.error("Error al crear la cotización con productos:", error);
        return res.status(500).json({ message: "Error al crear la cotización y sus productos" });
    }
});
exports.createQuoteWithDetails = createQuoteWithDetails;
const getQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyId } = req.params;
        if (!companyId) {
            return res.status(400).json({ message: "Falta el ID de la empresa" });
        }
        const quotes = yield quote_1.quote.findAll({
            attributes: ['id', 'concept', 'total', 'status', 'createdAt'],
            where: { companyId: companyId },
        });
        return res.status(200).json(quotes);
    }
    catch (error) {
        console.error("Error al obtener:", error);
        return res.status(500).json({ message: "Error al obtener" });
    }
});
exports.getQuote = getQuote;
const deleteQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Falta el ID" });
        }
        const quoteToDelete = yield quote_1.quote.findByPk(id);
        if (!quoteToDelete) {
            return res.status(404).json({ message: "No encontrada" });
        }
        // Eliminar los quoteDetails asociados a la cotización
        yield quoteDetails_1.quoteDetails.destroy({ where: { quoteId: id } });
        // Eliminar la cotización
        yield quoteToDelete.destroy();
        return res.status(200).json({ message: "Eliminado correctamente" });
    }
    catch (error) {
        console.error("Error al eliminar:", error);
        return res.status(500).json({ message: "Error al eliminar" });
    }
});
exports.deleteQuote = deleteQuote;
const updateQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { companyId, concept, total } = req.body;
        if (!companyId || !concept || !total) {
            return res.status(400).json({ message: "Faltan datos" });
        }
        const Update = yield quote_1.quote.findByPk(id);
        if (!Update) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }
        Update.set({ companyId, concept, total });
        yield Update.save();
        return res.status(200).json(Update);
    }
    catch (error) {
        console.error("Error al actualizar la nota:", error);
        return res.status(500).json({ message: "Error al actualizar la nota" });
    }
});
exports.updateQuote = updateQuote;
const updateQuoteTotal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { total } = req.body;
        if (total === undefined) {
            return res.status(400).json({ message: "Falta el total" });
        }
        const quoteToUpdate = yield quote_1.quote.findByPk(id);
        if (!quoteToUpdate) {
            return res.status(404).json({ message: "Cotización no encontrada" });
        }
        quoteToUpdate.set({ total });
        yield quoteToUpdate.save();
        return res.status(200).json(quoteToUpdate);
    }
    catch (error) {
        console.error("Error al actualizar el total de la cotización:", error);
        return res.status(500).json({ message: "Error al actualizar el total de la cotización" });
    }
});
exports.updateQuoteTotal = updateQuoteTotal;
const updateQuoteStatusById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!id || status === undefined) {
            return res.status(400).json({ message: "Faltan datos requeridos" });
        }
        const quoteToUpdate = yield quote_1.quote.findByPk(id);
        if (!quoteToUpdate) {
            return res.status(404).json({ message: "Cotización no encontrada" });
        }
        quoteToUpdate.set({ status });
        yield quoteToUpdate.save();
        return res.status(200).json({ message: "Status actualizado correctamente", quote: quoteToUpdate });
    }
    catch (error) {
        console.error("Error al actualizar el status:", error);
        return res.status(500).json({ message: "Error al actualizar el status" });
    }
});
exports.updateQuoteStatusById = updateQuoteStatusById;
