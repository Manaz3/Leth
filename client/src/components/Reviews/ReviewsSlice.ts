import { createAsyncThunk } from "@reduxjs/toolkit";
import { Review } from "./type/Reviews";


const initialState: Review = {
    name: ,

  };
  
  export const addCertificate = createAsyncThunk(
    'review/addReview',
    async (review: Review) => {
      const newReview = await apiCertificate(review);
      if (!newReview) {
        throw new Error('Не удалось зоздать записть');
      }
      return newReview;
    }
  );