import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CertificateState } from './type/CertificateState';
import { CertificateData } from './type/CertificateData';
import {
  apiCertificate,
  apiFindCertificate,
  apiInitCertificate,
  apiUpdateCertificate,
} from './api';
import { Certificate } from './type/Certificate';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';

const initialState: CertificateState = {
  certificateList: [],
  currentCertificate: undefined,
  oneCertificate: undefined,
  certificateError: undefined,
};

export const addCertificate = createAsyncThunk(
  'certificate/addCertificate',
  async (certificate: CertificateData) => {
    const newCertificate = await apiCertificate(certificate);
    if (!newCertificate) {
      throw new Error('Не удалось cоздать запись');
    }
    return newCertificate;
  }
);
export const initCertificate = createAsyncThunk(
  'certificate/initCertificate',
  async () => {
    const newCertificate = await apiInitCertificate();
    if (!newCertificate) {
      throw new Error('Записи не найдены');
    }
    return newCertificate;
  }
);
export const findeCertificate = createAsyncThunk(
  'certificate/findCertificate',
  async (inputVal: string) => {
    const certificate = await apiFindCertificate(inputVal);
    if (!certificate) {
      throw new Error('Запись не надена');
    }
    return certificate;
  }
);

export const updateCertificate = createAsyncThunk(
  'certificate/updateCertificate',
  async (certificate: Certificate) => {
    const changeCertificate = await apiUpdateCertificate(certificate);
    if (!changeCertificate) {
      throw new Error('Не удалось выполнить');
    }
    return changeCertificate;
  }
);

const certificateSlice = createSlice({
  name: 'certificates',
  initialState,
  reducers: {
    clearFindeCertificateError(state) {
      state.certificateError = undefined;
    },
    clearFindeCertificate(state) {
      state.oneCertificate = undefined;
    },
  },
  extraReducers(builder) {
    return builder
      .addCase(addCertificate.fulfilled, (state, action) => {
        state.certificateList.push(action.payload);
        state.currentCertificate = action.payload.amount;
      })
      .addCase(initCertificate.fulfilled, (state, action) => {
        state.certificateList = action.payload;
      })
      .addCase(findeCertificate.fulfilled, (state, action) => {
        state.oneCertificate = action.payload;
      })
      .addCase(findeCertificate.rejected, (state, action) => {
        state.certificateError = action.error.message;
      })
      .addCase(updateCertificate.fulfilled, (state, action) => {
        state.certificateList = state.certificateList.map((el) =>
          el.id === action.payload.id ? action.payload : el
        );
        if (state.oneCertificate?.status) {
          state.oneCertificate.status = false;
        }
      });
  },
});

export default certificateSlice.reducer;

export const { clearFindeCertificateError, clearFindeCertificate } =
  certificateSlice.actions;

export const selectErrorFindCertificate = (
  state: RootState
): string | undefined => state.certificates.certificateError;
