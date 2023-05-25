import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../store";
import { Review } from "./type/Reviews";
import { addCertificate } from "./ReviewsSlice";

function Reviews():JSX.Element {

  const {register , handleSubmit, reset} = useForm()
  const dispatch = useAppDispatch();

  const submitDataReviews = useCallback(
    async (values: Review): Promise<string> => {
      const dispatchResult = await dispatch(addCertificate(values));
      if (addCertificate.fulfilled.match(dispatchResult)) {
        reset();
      }
      // console.log(values.amount);
      const defaultInput = values.review;
      return defaultInput;
    },
    [dispatch]
  );

  return (
    <form action="" onSubmit={handleSubmit(submitDataReviews)}>
      <div>
        <input type="text" {...register("name", { required: true })}
              name="name"/>
      </div>
      <div>
        <div>
          <input type="text" {...register("reviews", { required: true })}
              name="reviews"/>
        </div>
        <div>
          <button type="submit">Отправить</button>
        </div>
      </div>
    </form>
  );
}

export default Reviews;
