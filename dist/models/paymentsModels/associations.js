"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = exports.Enrollment = exports.Fee = exports.PaymentBook = exports.Student = void 0;
// Definición de relaciones entre modelos de pagos y estudiantes
const student_1 = require("../studentsModels/student");
Object.defineProperty(exports, "Student", { enumerable: true, get: function () { return student_1.Student; } });
const paymentBook_1 = require("./paymentBook");
Object.defineProperty(exports, "PaymentBook", { enumerable: true, get: function () { return paymentBook_1.PaymentBook; } });
const fee_1 = require("./fee");
Object.defineProperty(exports, "Fee", { enumerable: true, get: function () { return fee_1.Fee; } });
const enrollment_1 = require("./enrollment");
Object.defineProperty(exports, "Enrollment", { enumerable: true, get: function () { return enrollment_1.Enrollment; } });
const payment_1 = require("./payment");
Object.defineProperty(exports, "Payment", { enumerable: true, get: function () { return payment_1.Payment; } });
// Un estudiante tiene un talonario (PaymentBook)
student_1.Student.hasOne(paymentBook_1.PaymentBook, { foreignKey: 'studentId', sourceKey: 'studentID' });
paymentBook_1.PaymentBook.belongsTo(student_1.Student, { foreignKey: 'studentId', targetKey: 'studentID' });
// Un talonario tiene muchas cuotas (Fee)
paymentBook_1.PaymentBook.hasMany(fee_1.Fee, { foreignKey: 'paymentBookId' });
fee_1.Fee.belongsTo(paymentBook_1.PaymentBook, { foreignKey: 'paymentBookId' });
// Un estudiante tiene una matrícula (Enrollment)
student_1.Student.hasOne(enrollment_1.Enrollment, { foreignKey: 'studentId', sourceKey: 'studentID' });
enrollment_1.Enrollment.belongsTo(student_1.Student, { foreignKey: 'studentId', targetKey: 'studentID' });
// Un estudiante tiene muchos pagos (Payment)
student_1.Student.hasMany(payment_1.Payment, { foreignKey: 'studentId', sourceKey: 'studentID' });
payment_1.Payment.belongsTo(student_1.Student, { foreignKey: 'studentId', targetKey: 'studentID' });
