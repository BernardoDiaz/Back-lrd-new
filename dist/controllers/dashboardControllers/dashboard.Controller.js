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
exports.getQuoteStatusPercentages = exports.getUserManagedSoldQuotes = exports.getMonthlySales = exports.getSalesPercentageByCountry = exports.getUserManagedProgramsThisWeek = exports.getUserManagedPendingTasksCount = exports.getUserManagedQuotesCount = exports.getUserManagedCompaniesCount = exports.getUserManagedTasks = void 0;
const task_1 = require("../../models/CompanyModels/task");
const company_1 = require("../../models/CompanyModels/company");
const quote_1 = require("../../models/Quote/quote");
const sequelize_1 = require("sequelize");
const moment_1 = __importDefault(require("moment"));
const program_1 = require("../../models/CompanyModels/program");
const getUserManagedTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: "Falta el ID de usuario para la consulta" });
        }
        const tasks = yield task_1.task.findAll({
            attributes: ["id", "taskName", "taskStatus"],
            where: { taskStatus: "Pendiente" },
            include: [
                {
                    model: company_1.company,
                    attributes: ["companyName"],
                    required: true,
                    where: { TeamOwner: userId } // Filtramos por empresas administradas por el usuario
                }
            ]
        });
        return res.status(200).json(tasks);
    }
    catch (error) {
        console.error("Error al obtener tareas:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.getUserManagedTasks = getUserManagedTasks;
const getUserManagedCompaniesCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: "Falta el ID de usuario para la consulta" });
        }
        const companiesCount = yield company_1.company.count({
            where: { TeamOwner: userId }
        });
        return res.status(200).json({ managedCompanies: companiesCount });
    }
    catch (error) {
        console.error("Error al obtener el conteo de empresas:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.getUserManagedCompaniesCount = getUserManagedCompaniesCount;
const getUserManagedQuotesCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: "Falta el ID de usuario para la consulta" });
        }
        // Buscar IDs de empresas administradas por el usuario
        const companies = yield company_1.company.findAll({
            attributes: ["id"],
            where: { TeamOwner: userId }
        });
        const companyIds = companies.map((c) => c.id);
        // Contar cotizaciones asociadas a esas empresas
        const quotesCount = yield quote_1.quote.count({
            where: { companyId: companyIds }
        });
        return res.status(200).json({ managedQuotes: quotesCount });
    }
    catch (error) {
        console.error("Error al obtener el conteo de cotizaciones:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.getUserManagedQuotesCount = getUserManagedQuotesCount;
const getUserManagedPendingTasksCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: "Falta el ID de usuario para la consulta" });
        }
        // Buscar IDs de empresas administradas por el usuario
        const companies = yield company_1.company.findAll({
            attributes: ["id"],
            where: { TeamOwner: userId }
        });
        const companyIds = companies.map((c) => c.id);
        // Contar tareas pendientes asociadas a esas empresas
        const pendingTasksCount = yield task_1.task.count({
            where: {
                companyId: companyIds,
                taskStatus: "Pendiente"
            }
        });
        return res.status(200).json({ pendingTasks: pendingTasksCount });
    }
    catch (error) {
        console.error("Error al obtener el conteo de tareas pendientes:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.getUserManagedPendingTasksCount = getUserManagedPendingTasksCount;
const getUserManagedProgramsThisWeek = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: "Falta el ID de usuario para la consulta" });
        }
        // Buscar IDs de empresas administradas por el usuario
        const companies = yield company_1.company.findAll({
            attributes: ["id"],
            where: { TeamOwner: userId }
        });
        const companyIds = companies.map((c) => c.id);
        // Calcular inicio y fin de la semana actual
        const startOfWeek = (0, moment_1.default)().startOf('isoWeek').toDate();
        const endOfWeek = (0, moment_1.default)().endOf('isoWeek').toDate();
        // Buscar eventos programados esta semana para esas empresas usando programDate
        const programs = yield program_1.program.findAll({
            attributes: [
                "programDescription",
                "programDate",
                "programTimeStart",
                "programTimeEnd",
                "programLocation"
            ],
            where: {
                companyId: companyIds,
                programDate: {
                    [sequelize_1.Op.between]: [startOfWeek, endOfWeek]
                }
            },
            include: [
                {
                    model: company_1.company,
                    attributes: ["id", "companyName"]
                }
            ]
        });
        return res.status(200).json({ programs });
    }
    catch (error) {
        console.error("Error al obtener los eventos programados de la semana:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.getUserManagedProgramsThisWeek = getUserManagedProgramsThisWeek;
const getSalesPercentageByCountry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: "Falta el ID de usuario para la consulta" });
        }
        // Obtener solo las empresas administradas por el usuario y sus países
        const companies = yield company_1.company.findAll({
            attributes: ["id", "companyCountry"],
            where: { TeamOwner: userId }
        });
        // Agrupar empresas por país
        const countryCompanyMap = {};
        companies.forEach((c) => {
            if (!countryCompanyMap[c.companyCountry]) {
                countryCompanyMap[c.companyCountry] = [];
            }
            countryCompanyMap[c.companyCountry].push(c.id);
        });
        // Para cada país, contar cotizaciones totales y vendidas
        const result = [];
        for (const country in countryCompanyMap) {
            const companyIds = countryCompanyMap[country];
            const totalQuotes = yield quote_1.quote.count({
                where: { companyId: companyIds }
            });
            const soldQuotes = yield quote_1.quote.count({
                where: {
                    companyId: companyIds,
                    status: "Vendido"
                }
            });
            const salesPercentage = totalQuotes > 0 ? (soldQuotes / totalQuotes) * 100 : 0;
            result.push({
                country,
                totalQuotes,
                soldQuotes,
                salesPercentage: parseFloat(salesPercentage.toFixed(2))
            });
        }
        return res.status(200).json({ salesByCountry: result });
    }
    catch (error) {
        console.error("Error al calcular el porcentaje de ventas por país:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.getSalesPercentageByCountry = getSalesPercentageByCountry;
const getMonthlySales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: "Falta el ID de usuario para la consulta" });
        }
        // Buscar IDs de empresas administradas por el usuario
        const companies = yield company_1.company.findAll({
            attributes: ["id"],
            where: { TeamOwner: userId }
        });
        const companyIds = companies.map((c) => c.id);
        // Obtener ventas mensuales (solo cotizaciones vendidas)
        const sales = yield quote_1.quote.findAll({
            attributes: [
                [
                    // Agrupar por mes y año
                    // Formato: YYYY-MM
                    // Sequelize.literal para extraer año-mes de createdAt
                    // Esto depende de la base de datos, aquí se usa para MySQL y PostgreSQL
                    // Si usas otra base, ajusta el literal
                    // Para MySQL: DATE_FORMAT(createdAt, '%Y-%m')
                    // Para PostgreSQL: TO_CHAR("createdAt", 'YYYY-MM')
                    // Aquí se asume MySQL
                    // Si usas PostgreSQL, cambia a: Sequelize.literal(`TO_CHAR("createdAt", 'YYYY-MM')`)
                    // y pon alias 'month'
                    // Si usas SQLite, usa strftime('%Y-%m', createdAt)
                    // Ajusta según tu base de datos
                    // Ejemplo para MySQL:
                    // Sequelize.literal("DATE_FORMAT(createdAt, '%Y-%m')")
                    // Ejemplo para PostgreSQL:
                    // Sequelize.literal(`TO_CHAR("createdAt", 'YYYY-MM')`)
                    // Ejemplo para SQLite:
                    // Sequelize.literal("strftime('%Y-%m', createdAt)")
                    // Aquí se usa MySQL por defecto:
                    // Puedes cambiarlo si lo necesitas
                    // Si tienes dudas, dime qué base usas
                    // Por defecto:
                    // @ts-ignore
                    require('sequelize').literal("DATE_FORMAT(createdAt, '%Y-%m')"), 'month'
                ],
                [require('sequelize').fn('SUM', require('sequelize').col('total')), 'totalSales'],
                [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'salesCount']
            ],
            where: {
                companyId: companyIds,
                status: "Vendido"
            },
            group: [require('sequelize').literal("month")],
            order: [[require('sequelize').literal("month"), 'ASC']]
        });
        return res.status(200).json({ monthlySales: sales });
    }
    catch (error) {
        console.error("Error al obtener las ventas mensuales:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.getMonthlySales = getMonthlySales;
const getUserManagedSoldQuotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: "Falta el ID de usuario para la consulta" });
        }
        // Buscar IDs de empresas administradas por el usuario
        const companies = yield company_1.company.findAll({
            attributes: ["id"],
            where: { TeamOwner: userId }
        });
        const companyIds = companies.map((c) => c.id);
        // Fechas para los filtros
        const now = (0, moment_1.default)();
        const startOfThisMonth = now.clone().startOf('month').toDate();
        const endOfThisMonth = now.clone().endOf('month').toDate();
        const startOfLastMonth = now.clone().subtract(1, 'month').startOf('month').toDate();
        const endOfLastMonth = now.clone().subtract(1, 'month').endOf('month').toDate();
        const startOfYear = now.clone().startOf('year').toDate();
        const endOfYear = now.clone().endOf('year').toDate();
        // Suma de lo vendido este mes
        const soldThisMonth = yield quote_1.quote.sum('total', {
            where: {
                companyId: companyIds,
                status: "Vendido",
                createdAt: {
                    [sequelize_1.Op.between]: [startOfThisMonth, endOfThisMonth]
                }
            }
        });
        // Suma de lo vendido el mes anterior
        const soldLastMonth = yield quote_1.quote.sum('total', {
            where: {
                companyId: companyIds,
                status: "Vendido",
                createdAt: {
                    [sequelize_1.Op.between]: [startOfLastMonth, endOfLastMonth]
                }
            }
        });
        // Suma de lo vendido en el año
        const soldThisYear = yield quote_1.quote.sum('total', {
            where: {
                companyId: companyIds,
                status: "Vendido",
                createdAt: {
                    [sequelize_1.Op.between]: [startOfYear, endOfYear]
                }
            }
        });
        return res.status(200).json({
            soldThisMonth: soldThisMonth || 0,
            soldLastMonth: soldLastMonth || 0,
            soldThisYear: soldThisYear || 0
        });
    }
    catch (error) {
        console.error("Error al obtener sumas de cotizaciones vendidas:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
});
exports.getUserManagedSoldQuotes = getUserManagedSoldQuotes;
const getQuoteStatusPercentages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: "Falta el ID de usuario para la consulta" });
        }
        // Buscar IDs de empresas administradas por el usuario
        const companies = yield company_1.company.findAll({
            attributes: ["id"],
            where: { TeamOwner: userId }
        });
        const companyIds = companies.map((c) => c.id);
        if (companyIds.length === 0) {
            return res.status(200).json({ message: "El usuario no administra empresas", data: [] });
        }
        // Obtener solo las cotizaciones de las empresas administradas por el usuario
        const quotes = yield quote_1.quote.findAll({
            attributes: ['status', 'total'],
            where: { companyId: companyIds }
        });
        if (quotes.length === 0) {
            return res.status(200).json({ message: "No hay cotizaciones para este usuario", data: [] });
        }
        // Sumar los totales por status
        const totalsByStatus = {};
        let grandTotal = 0;
        quotes.forEach(q => {
            const status = q.getDataValue('status');
            const total = Number(q.getDataValue('total')) || 0;
            totalsByStatus[status] = (totalsByStatus[status] || 0) + total;
            grandTotal += total;
        });
        // Calcular el porcentaje por status
        const percentages = Object.entries(totalsByStatus).map(([status, total]) => ({
            status,
            total,
            percentage: grandTotal > 0 ? Number(((total / grandTotal) * 100).toFixed(2)) : 0
        }));
        return res.status(200).json({ data: percentages });
    }
    catch (error) {
        console.error("Error al calcular los porcentajes por status:", error);
        return res.status(500).json({ message: "Error al calcular los porcentajes por status" });
    }
});
exports.getQuoteStatusPercentages = getQuoteStatusPercentages;
