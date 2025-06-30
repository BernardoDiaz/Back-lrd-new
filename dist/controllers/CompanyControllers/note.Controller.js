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
exports.updateNote = exports.deleteNote = exports.getNotes = exports.newNote = void 0;
const note_1 = require("../../models/CompanyModels/note");
const newNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { noteText, companyId } = req.body;
        if (!companyId || !noteText) {
            return res.status(400).json({ message: "Faltan datos" });
        }
        const newNote = yield note_1.note.create({
            companyId,
            noteText
        });
        return res.status(201).json({ message: "Nota creada correctamente" });
    }
    catch (error) {
        console.error("Error al crear la nota:", error);
        return res.status(500).json({ message: "Error al crear la nota" });
    }
});
exports.newNote = newNote;
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyId } = req.params;
        if (!companyId) {
            return res.status(400).json({ message: "Falta el ID de la empresa" });
        }
        const notes = yield note_1.note.findAll({
            attributes: ['id', 'noteText'],
            where: { companyId: companyId },
        });
        return res.status(200).json(notes);
    }
    catch (error) {
        console.error("Error al obtener las notas:", error);
        return res.status(500).json({ message: "Error al obtener las notas" });
    }
});
exports.getNotes = getNotes;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Falta el ID de la nota" });
        }
        const noteToDelete = yield note_1.note.findByPk(id);
        if (!noteToDelete) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }
        yield noteToDelete.destroy();
        return res.status(200).json({ message: "Nota eliminada correctamente" });
    }
    catch (error) {
        console.error("Error al eliminar la nota:", error);
        return res.status(500).json({ message: "Error al eliminar la nota" });
    }
});
exports.deleteNote = deleteNote;
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { noteText } = req.body;
        if (!id || !noteText) {
            return res.status(400).json({ message: "Faltan datos" });
        }
        const noteToUpdate = yield note_1.note.findByPk(id);
        if (!noteToUpdate) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }
        noteToUpdate.set('noteText', noteText);
        yield noteToUpdate.save();
        return res.status(200).json(noteToUpdate);
    }
    catch (error) {
        console.error("Error al actualizar la nota:", error);
        return res.status(500).json({ message: "Error al actualizar la nota" });
    }
});
exports.updateNote = updateNote;
