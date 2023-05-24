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

const initialState: CertificateState = {
  certificateList: [],
  currentCertificate: undefined,
  oneCertificate: undefined,
};

export const addCertificate = createAsyncThunk(
  'certificate/addCertificate',
  async (certificate: CertificateData) => {
    const newCertificate = await apiCertificate(certificate);
    if (!newCertificate) {
      throw new Error('Не удалось зоздать записть');
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
    const chengeCertificate = await apiUpdateCertificate(certificate);
    if (!chengeCertificate) {
      throw new Error('Не удалось выполнить');
    }
    return chengeCertificate;
  }
);

const certificateSlice = createSlice({
  name: 'certificates',
  initialState,
  reducers: {},
  extraReducers(builder) {
    return builder
      .addCase(addCertificate.fulfilled, (state, action) => {
        // console.log("slise ->", action.payload);

        state.certificateList.push(action.payload);
        state.currentCertificate = action.payload.amount;
        console.log('state', state.currentCertificate);
      })
      .addCase(initCertificate.fulfilled, (state, action) => {
        // console.log("slise init->", action.payload);
        state.certificateList = action.payload;
      })
      .addCase(findeCertificate.fulfilled, (state, action) => {
        // console.log("slise init->", action.payload);
        console.log(state.oneCertificate);
        state.oneCertificate = action.payload;
        console.log(state.oneCertificate);
      })
      .addCase(updateCertificate.fulfilled, (state, action) => {
        // console.log("slise init->", action.payload);
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
