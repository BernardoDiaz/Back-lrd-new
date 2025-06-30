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
exports.updateTasksBulk = exports.deleteTask = exports.getTasks = exports.newTask = void 0;
const task_1 = require("../../models/CompanyModels/task");
const newTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskName, taskStatus, companyId } = req.body;
        // Validar que se reciban todos los campos necesarios
        if (!taskName || !taskStatus || !companyId) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }
        // Crear la nueva tarea
        const newTask = yield task_1.task.create({
            taskName,
            taskStatus,
            companyId
        });
        return res.status(201).json(newTask);
    }
    catch (error) {
        console.error("Error al crear la tarea:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.newTask = newTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyId } = req.params;
        // Validar que se reciba el ID de la empresa
        if (!companyId) {
            return res.status(400).json({ message: "Falta el ID de la empresa" });
        }
        // Obtener las tareas asociadas a la empresa
        const tasks = yield task_1.task.findAll({
            attributes: ['id', 'taskName', 'taskStatus'],
            where: { companyId: companyId }
        });
        return res.status(200).json(tasks);
    }
    catch (error) {
        console.error("Error al obtener las tareas:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.getTasks = getTasks;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Validar que se reciba el ID de la tarea
        if (!id) {
            return res.status(400).json({ message: "Falta el ID de la tarea" });
        }
        // Buscar la tarea por su ID
        const taskToDelete = yield task_1.task.findByPk(id);
        if (!taskToDelete) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
        // Eliminar la tarea
        yield taskToDelete.destroy();
        return res.status(200).json({ message: "Tarea eliminada correctamente" });
    }
    catch (error) {
        console.error("Error al eliminar la tarea:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.deleteTask = deleteTask;
const updateTasksBulk = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tasks } = req.body;
        // Validar que se reciba un array de tareas
        if (!Array.isArray(tasks) || tasks.length === 0) {
            return res.status(400).json({ message: "Se requiere un array de tareas para actualizar" });
        }
        const updateResults = [];
        for (const t of tasks) {
            const { id, taskStatus } = t;
            if (!id || !taskStatus) {
                updateResults.push({ id, success: false, message: "Faltan campos obligatorios" });
                continue;
            }
            const taskToUpdate = yield task_1.task.findByPk(id);
            if (!taskToUpdate) {
                updateResults.push({ id, success: false, message: "Tarea no encontrada" });
                continue;
            }
            taskToUpdate.set({ taskStatus });
            yield taskToUpdate.save();
            updateResults.push({ id, success: true, message: "Tarea actualizada correctamente" });
        }
        return res.status(200).json({ results: updateResults });
    }
    catch (error) {
        console.error("Error al actualizar tareas:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.updateTasksBulk = updateTasksBulk;
