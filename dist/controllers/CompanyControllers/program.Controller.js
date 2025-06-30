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
exports.updateProgram = exports.deleteProgram = exports.getPrograms = exports.newProgram = void 0;
const program_1 = require("../../models/CompanyModels/program");
const newProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { programActivity, programDate, programTimeStart, programTimeEnd, programDescription, programLocation, companyId } = req.body;
        if (!companyId || !programActivity || !programDate || !programTimeStart ||
            !programTimeEnd || !programDescription || !programLocation) {
            return res.status(400).json({ message: "Faltan datos" });
        }
        const newProgram = yield program_1.program.create({
            companyId,
            programActivity,
            programDate,
            programTimeStart,
            programTimeEnd,
            programDescription,
            programLocation
        });
        return res.status(201).json(newProgram);
    }
    catch (error) {
        console.error("Error al crear el programa:", error);
        return res.status(500).json({ message: "Error al crear el programa" });
    }
});
exports.newProgram = newProgram;
const getPrograms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyId } = req.params;
        if (!companyId) {
            return res.status(400).json({ message: "Falta el ID de la empresa" });
        }
        const programs = yield program_1.program.findAll({
            attributes: ['id', 'programActivity', 'programDate',
                'programTimeStart', 'programTimeEnd', 'programDescription',
                'programLocation'],
            where: { companyId: companyId }
        });
        return res.status(200).json(programs);
    }
    catch (error) {
        console.error("Error al obtener los programas:", error);
        return res.status(500).json({ message: "Error al obtener los programas" });
    }
});
exports.getPrograms = getPrograms;
const deleteProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Falta el ID del programa" });
        }
        const programToDelete = yield program_1.program.findByPk(id);
        if (!programToDelete) {
            return res.status(404).json({ message: "Programa no encontrado" });
        }
        yield programToDelete.destroy();
        return res.status(200).json({ message: "Programa eliminado correctamente" });
    }
    catch (error) {
        console.error("Error al eliminar el programa:", error);
        return res.status(500).json({ message: "Error al eliminar el programa" });
    }
});
exports.deleteProgram = deleteProgram;
const updateProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { programActivity, programDate, programTimeStart, programTimeEnd, programDescription, programLocation } = req.body;
        if (!id || !programActivity || !programDate || !programTimeStart ||
            !programTimeEnd || !programDescription || !programLocation) {
            return res.status(400).json({ message: "Faltan datos" });
        }
        const programToUpdate = yield program_1.program.findByPk(id);
        if (!programToUpdate) {
            return res.status(404).json({ message: "Programa no encontrado" });
        }
        yield programToUpdate.update({
            programActivity,
            programDate,
            programTimeStart,
            programTimeEnd,
            programDescription,
            programLocation
        });
        return res.status(200).json(programToUpdate);
    }
    catch (error) {
        console.error("Error al actualizar el programa:", error);
        return res.status(500).json({ message: "Error al actualizar el programa" });
    }
});
exports.updateProgram = updateProgram;
