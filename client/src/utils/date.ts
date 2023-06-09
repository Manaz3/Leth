import { OneReservation } from '../features/adminReservation/types/OneReservation';
import { ReservationData } from '../features/adminReservation/types/ReservationData';

export function formatDate(argumentDate: Date): string {
  const year = new Date(argumentDate).getFullYear();
  const month = String(new Date(argumentDate).getMonth() + 1).padStart(2, '0');
  const day = String(new Date(argumentDate).getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatTime(argumentDate: Date): string {
  const hours = String(argumentDate.getHours()).padStart(2, '0');
  const minutes = String(argumentDate.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}

export function formateDateServer(date: string, time: string): string {
  const [year, month, day] = date.split('-');
  const [hours, minutes] = time.split(':');
  const combineDate = `${year}-${month}-${day} ${hours}:${minutes}:00`;
  return combineDate;
}

export function transformReservationToFormData(
  reserv: OneReservation
): ReservationData {
  const { id, name, phoneNumber, email, guests, date, comment, table, status } =
    reserv;
  const formReserv: ReservationData = {
    id,
    name,
    phoneNumber,
    guests,
    email,
    date: formatDate(new Date(date)),
    time: formatTime(new Date(date)),
    comment,
    table,
    status,
  };

  return formReserv;
}

export function transformFormDataToReservation(
  value: ReservationData
): OneReservation {
  const {
    id,
    name,
    phoneNumber,
    guests,
    email,
    date,
    time,
    table,
    comment,
    status,
  } = value;
  const formToServer: OneReservation = {
    id,
    name,
    phoneNumber,
    guests,
    email,
    date: formateDateServer(date, time), // .toISOString()
    table,
    comment,
    status,
  };
  console.log('formToServer', formToServer);

  return formToServer;
}
