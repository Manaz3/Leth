import { OneReservation } from './OneReservation';
import { Tables } from './Tables';

export type ReservationState = {
  tablesList: Tables[];
  reservationList: OneReservation[];
  loadingAdminPages: boolean;
};
