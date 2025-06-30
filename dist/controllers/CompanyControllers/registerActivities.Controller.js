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
exports.updateActivity = exports.deleteActivity = exports.getActivities = exports.newActivity = void 0;
const registerActivities_1 = require("../../models/CompanyModels/registerActivities");
const newActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activityType, activityDate, activityDescription, companyId } = req.body;
        // Validar que se reciban todos los campos necesarios
        if (!activityType || !activityDate || !activityDescription || !companyId) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }
        // Crear la nueva actividad
        const newActivity = yield registerActivities_1.registerActivities.create({
            activityType,
            activityDate,
            activityDescription,
            companyId
        });
        return res.status(201).json(newActivity);
    }
    catch (error) {
        console.error("Error al crear la actividad:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.newActivity = newActivity;
const getActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyId } = req.params;
        // Validar que se reciba el ID de la empresa
        if (!companyId) {
            return res.status(400).json({ message: "Falta el ID de la empresa" });
        }
        // Obtener las actividades asociadas a la empresa
        const activities = yield registerActivities_1.registerActivities.findAll({
            attributes: ['id', 'activityType', 'activityDate',
                'activityDescription'],
            where: { companyId: companyId },
        });
        return res.status(200).json(activities);
    }
    catch (error) {
        console.error("Error al obtener las actividades:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.getActivities = getActivities;
const deleteActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Validar que se reciba el ID de la actividad
        if (!id) {
            return res.status(400).json({ message: "Falta el ID de la actividad" });
        }
        // Buscar la actividad por su ID
        const activityToDelete = yield registerActivities_1.registerActivities.findByPk(id);
        if (!activityToDelete) {
            return res.status(404).json({ message: "Actividad no encontrada" });
        }
        // Eliminar la actividad
        yield activityToDelete.destroy();
        return res.status(200).json({ message: "Actividad eliminada correctamente" });
    }
    catch (error) {
        console.error("Error al eliminar la actividad:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.deleteActivity = deleteActivity;
const updateActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { activityType, activityDate, activityDescription } = req.body;
        // Validar que se reciban todos los campos necesarios
        if (!id || !activityType || !activityDate || !activityDescription) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }
        // Buscar la actividad por su ID
        const activityToUpdate = yield registerActivities_1.registerActivities.findByPk(id);
        if (!activityToUpdate) {
            return res.status(404).json({ message: "Actividad no encontrada" });
        }
        // Actualizar la actividad
        activityToUpdate.set({
            activityType,
            activityDate,
            activityDescription
        });
        yield activityToUpdate.save();
        return res.status(200).json({ message: "Actividad actualizada correctamente" });
    }
    catch (error) {
        console.error("Error al actualizar la actividad:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.updateActivity = updateActivity;
