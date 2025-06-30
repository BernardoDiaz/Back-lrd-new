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
exports.deleteCompany = exports.updateCompany = exports.getCompanyById = exports.getCompanys = exports.newCompany = void 0;
const company_1 = require("../../models/CompanyModels/company");
const newCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyName, companyEmail, companyPhone, companyCountry, LifeStage, TeamOwner, companyWeb, companyAddress, originContact } = req.body;
    try {
        //Guardando usuario en base de datos
        yield company_1.company.create({
            companyName,
            companyEmail,
            companyPhone,
            companyCountry,
            LifeStage,
            TeamOwner,
            companyWeb,
            companyAddress,
            originContact
        });
        res.json({
            msg: `La empresa ${companyName} ha sido creada exitosamente`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.newCompany = newCompany;
const getCompanys = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companys = yield company_1.company.findAll();
        res.json(companys);
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
    ;
});
exports.getCompanys = getCompanys;
const getCompanyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const companyData = yield company_1.company.findByPk(id);
        if (!companyData) {
            return res.status(404).json({
                msg: "Empresa no encontrada"
            });
        }
        res.json(companyData);
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.getCompanyById = getCompanyById;
const updateCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { companyName, companyEmail, companyPhone, companyCountry, LifeStage, TeamOwner, companyWeb, companyAddress, originContact } = req.body;
    try {
        const [updated] = yield company_1.company.update({
            companyName,
            companyEmail,
            companyPhone,
            companyCountry,
            LifeStage,
            TeamOwner,
            companyWeb,
            companyAddress,
            originContact
        }, {
            where: { id }
        });
        if (updated) {
            // const updatedCompany = await company.findByPk(id);
            res.json({
                msg: `La empresa ha sido actualizada exitosamente`
            });
        }
        else {
            res.status(404).json({
                msg: "Empresa no encontrada"
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.updateCompany = updateCompany;
const deleteCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield company_1.company.destroy({
            where: { id }
        });
        if (deleted) {
            res.json({
                msg: "Empresa eliminada exitosamente"
            });
        }
        else {
            res.status(404).json({
                msg: "Empresa no encontrada"
            });
        }
    }
    catch (error) {
        res.status(400).json({
            msg: "Ups ocurrio un error",
            error
        });
    }
});
exports.deleteCompany = deleteCompany;
