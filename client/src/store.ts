import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import timeTableSlice from './features/adminReservation/reservaionSlice';
// eslint-disable-next-line import/no-cycle
import CertificateSlice from './components/Certificate/CertificateSlice';
import MainReservationSlice from './components/MainReservationForm/mainReservationFormSlice';
import AdminAuthorizationSlice from './components/AdminAuthorization/AdminAuthorizationSlice';

const store = configureStore({
  reducer: {
    adminReservation: timeTableSlice,
    certificates: CertificateSlice,
    mainReservationForm: MainReservationSlice,
    adminAuth: AdminAuthorizationSlice,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
