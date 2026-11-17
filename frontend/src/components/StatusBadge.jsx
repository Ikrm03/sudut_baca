import React from 'react';
import { Clock, RefreshCw, Truck, CheckCircle2, XCircle, CreditCard } from 'lucide-react';

const StatusBadge = ({ type = 'order', status }) => {
  if (type === 'payment') {
    const isPaid = status === 'paid';
    return (
      <span className={`badge ${isPaid ? 'badge-paid' : 'badge-unpaid'}`}>
        <CreditCard size={12} />
        {isPaid ? 'Lunas' : 'Belum Bayar (COD)'}
      </span>
    );
  }

  // Order status
  switch (status) {
    case 'pending':
      return (
        <span className="badge badge-pending">
          <Clock size={12} />
          Menunggu Konfirmasi
        </span>
      );
    case 'processing':
      return (
        <span className="badge badge-processing">
          <RefreshCw size={12} />
          Sedang Diproses
        </span>
      );
    case 'shipped':
      return (
        <span className="badge badge-shipped">
          <Truck size={12} />
          Dalam Pengiriman
        </span>
      );
    case 'completed':
      return (
        <span className="badge badge-completed">
          <CheckCircle2 size={12} />
          Pesanan Selesai
        </span>
      );
    case 'cancelled':
      return (
        <span className="badge badge-cancelled">
          <XCircle size={12} />
          Dibatalkan
        </span>
      );
    default:
      return <span className="badge badge-pending">{status}</span>;
  }
};

export default StatusBadge;
