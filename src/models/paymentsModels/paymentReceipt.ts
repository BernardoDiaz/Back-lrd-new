import { DataTypes } from 'sequelize';
import sequelize from '../../db/connection';

const PaymentReceipt = sequelize.define('PaymentReceipt', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  paymentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'payments',
      key: 'id',
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('emitido', 'cancelado', 'anulado'),
    allowNull: false,
    defaultValue: 'emitido',
  },
  issuedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedBy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  metodoPago: {
    type: DataTypes.ENUM('efectivo', 'tarjeta'),
    allowNull: false,
    defaultValue: 'efectivo',
  },
  bancoDestino: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'payment_receipts',
  timestamps: false,
});

export default PaymentReceipt;
