/* eslint-disable import/no-cycle */
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { type RootState } from '../../store';
import {
  apiCreateReserv,
  apiDeleteReserv,
  apiInitTable,
  apiSendMessage,
  apiUpdateTable,
} from './adminApi';
import { OneReservation, ReservId } from './types/OneReservation';
import { ReservationState } from './types/ReservationState';
import { Tables } from './types/Tables';

const initialState: ReservationState = {
  tablesList: [],
  reservationList: [],
  loadingAdminPages: false,
};

export const initReservationsTable = createAsyncThunk(
  'adminReservation/initTimeTable',
  async () => {
    const timeTable = await apiInitTable();
    if (!timeTable) {
      throw new Error('Не удолось загрузить данные');
    }

    return timeTable;
  }
);

export const createNewReserv = createAsyncThunk(
  'adminReservation/createNewReservation',
  async (reserv: OneReservation) => {
    const newReserv = await apiCreateReserv(reserv);
    if (!newReserv) {
      throw new Error('Ошибка создания резерва');
    }
    return newReserv;
  }
);

export const updateReserv = createAsyncThunk(
  'adminReservation/updateReserv',
  async (value: OneReservation) => {
    const newReserv = await apiUpdateTable(value);
    if (!newReserv) {
      throw new Error('Не удалось загрузить данные ');
    }
    return newReserv;
  }
);

export const sendMail = createAsyncThunk(
  'adminReservation/sendMail',
  async (reserv: OneReservation) => {
    const sendmail = await apiSendMessage(reserv);
    if (!sendmail) {
      throw new Error('Сообщение не отправлено');
    }
  }
);

export const deleteReserv = createAsyncThunk(
  'adminReservation/deleteReserv',
  async (id: ReservId) => {
    console.log('id thunk', id);

    await apiDeleteReserv(id);
    return id;
  }
);

const timeTableSlice = createSlice({
  name: 'timeTables',
  initialState,
  reducers: {},
  extraReducers(builder) {
    return builder
      .addCase(initReservationsTable.pending, (state) => {
        state.loadingAdminPages = true;
      })
      .addCase(initReservationsTable.fulfilled, (state, action) => {
        state.loadingAdminPages = false;
        state.tablesList = action.payload.tablesList;
        state.reservationList = action.payload.reservationList;
      })
      .addCase(initReservationsTable.rejected, (state) => {
        state.loadingAdminPages = false;
      })
      .addCase(createNewReserv.fulfilled, (state, action) => {
        state.reservationList.push(action.payload);
      })
      .addCase(updateReserv.fulfilled, (state, action) => {
        state.reservationList = state.reservationList.map((reserv) =>
          reserv.id === action.payload.id ? action.payload : reserv
        );
      })
      .addCase(deleteReserv.fulfilled, (state, action) => {
        state.reservationList = state.reservationList.filter(
          (reserv) => reserv.id !== action.payload
        );
      });
  },
});

export const selectTablesList = (state: RootState): Tables[] =>
  state.adminReservation.tablesList;

export const selectReservationList = (state: RootState): OneReservation[] =>
  state.adminReservation.reservationList;

export const selectReservationById = createSelector(
  [selectReservationList, (state: RootState, reservId: number) => reservId],
  (reservationList, reservId) =>
    reservationList.find((el) => el.id === reservId)
);

export const selectLoadingGif = (state: RootState): boolean =>
  state.adminReservation.loadingAdminPages;

export default timeTableSlice.reducer;
