// Definición de relaciones entre modelos de pagos y estudiantes
import { Student } from '../studentsModels/student';
import { PaymentBook } from './paymentBook';
import { Fee } from './fee';
import { Enrollment } from './enrollment';
import { Payment } from './payment';

// Un estudiante tiene un talonario (PaymentBook)
Student.hasOne(PaymentBook, { foreignKey: 'studentId', sourceKey: 'studentID' });
PaymentBook.belongsTo(Student, { foreignKey: 'studentId', targetKey: 'studentID' });

// Un talonario tiene muchas cuotas (Fee)
PaymentBook.hasMany(Fee, { foreignKey: 'paymentBookId' });
Fee.belongsTo(PaymentBook, { foreignKey: 'paymentBookId' });

// Un estudiante tiene una matrícula (Enrollment)
Student.hasOne(Enrollment, { foreignKey: 'studentId', sourceKey: 'studentID' });
Enrollment.belongsTo(Student, { foreignKey: 'studentId', targetKey: 'studentID' });

// Un estudiante tiene muchos pagos (Payment)
Student.hasMany(Payment, { foreignKey: 'studentId', sourceKey: 'studentID' });
Payment.belongsTo(Student, { foreignKey: 'studentId', targetKey: 'studentID' });

// Un pago puede estar asociado a una cuota o matrícula (referenciaId)
// La lógica de asociación se maneja en la aplicación según el concepto

export { Student, PaymentBook, Fee, Enrollment, Payment };
