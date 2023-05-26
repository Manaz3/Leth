import { OneReservation, ReservId } from './types/OneReservation';
import { ReservationState } from './types/ReservationState';

// На этом фече приходит 500 статус, но не всегда
export async function apiInitTable(): Promise<ReservationState> {
  const res = await fetch('/api/admin/reservation');
  const data = await res.json();
  console.log('res', res);

  if (res.status >= 400) {
    throw data.error;
  }
  return data;
}

export async function apiCreateReserv(
  reserv: OneReservation
): Promise<OneReservation> {
  const res = await fetch('/api/admin/reservation', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(reserv),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }
  return res.json();
}

export async function apiUpdateTable(
  reserv: OneReservation
): Promise<OneReservation> {
  const res = await fetch(`/api/admin/reservation/${reserv.id}/update`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(reserv),
  });
  if (res.status >= 400) {
    const { error } = await res.json();
    throw error;
  }

  return res.json();
}

export async function apiSendMessage(reserv: OneReservation): Promise<string> {
  const res = await fetch(`/api/admin/reservation/${reserv.id}/sendmail`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(reserv),
  });

  if (res.status >= 400) {
    const { error } = await res.json();
    throw error;
  }
  return res.json();
}

export async function apiDeleteReserv(id: ReservId): Promise<void> {
  console.log('id fetch', id);

  await fetch(`/api/admin/reservation/${id}/deletereserv`, {
    method: 'DELETE',
  });
}
