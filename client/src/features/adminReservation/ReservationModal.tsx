/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { memo, useCallback, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { RootState, useAppDispatch } from '../../store';
import {
  transformFormDataToReservation,
  transformReservationToFormData,
} from '../../utils/date';
import styles from './styles.module.css';
import { ReservationData } from './types/ReservationData';
import {
  deleteReserv,
  selectReservationById,
  sendMail,
  updateReserv,
} from './reservaionSlice';
import { ReservId } from './types/OneReservation';

type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  activModalReserv: number;
};

function ReservationModal({
  showModal,
  setShowModal,
  activModalReserv,
}: Props): JSX.Element {
  const dispatch = useAppDispatch();

  // это Лиза знает что такое :)
  const activeReserv = useSelector((state: RootState) =>
    selectReservationById(state, activModalReserv)
  );

  const { register, handleSubmit, watch, reset } = useForm<ReservationData>({
    resetOptions: {
      keepDirtyValues: true, // user-interacted input will be retained
    },
  });
  const watch1 = watch();

  useEffect(() => {
    reset(activeReserv && transformReservationToFormData(activeReserv));
  }, [activModalReserv, activeReserv, reset]);

  // получаем данные из формы и отправляем в базу для редактирования резерва
  const formSubmit = (value: ReservationData): void => {
    value.table = Number(value.table);
    dispatch(updateReserv(transformFormDataToReservation(value)));
  };

  const onError = (errors: any, e: any): void => console.log(errors, 'evnt', e);

  // кнопка на отправку письма с уведомлением
  const handleSendMail = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    dispatch(sendMail(transformFormDataToReservation(watch1)));
  };

  // удаление резерва
  const handleDeleteReserv = useCallback(
    (id: ReservId): void => {
      dispatch(deleteReserv(id));
      setShowModal(false);
    },
    [dispatch]
  );

  return (
    <div
      onClick={() => setShowModal(false)}
      className={showModal ? styles.activ : styles.disable}
    >
      {activeReserv && (
        <Form
          onSubmit={handleSubmit(formSubmit, onError)}
          className={styles.modalform}
          onClick={(e) => e.stopPropagation()}
        >
          <Row className="mb-3 ">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                {...register('email', { required: true })}
                type="text"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Name</Form.Label>
              <Form.Control
                {...register('name', { required: true })}
                type="text"
                placeholder="Name"
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              {...register('phoneNumber', { required: true })}
              type="phone"
              placeholder="Phone"
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Date</Form.Label>
              <Form.Control
                {...register('date', { required: true })}
                type="date"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Time</Form.Label>
              <Form.Select {...register('time', { required: true })}>
                <option>12:00</option>
                <option>12:30</option>
                <option>13:00</option>
                <option>13:30</option>
                <option>14:00</option>
                <option>14:30</option>
                <option>15:00</option>
                <option>15:30</option>
                <option>16:00</option>
                <option>16:30</option>
                <option>17:00</option>
                <option>17:30</option>
                <option>18:00</option>
                <option>18:30</option>
                <option>19:00</option>
                <option>19:30</option>
                <option>20:00</option>
                <option>20:30</option>
                <option>21:00</option>
                <option>21:30</option>
                <option>22:00</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Table</Form.Label>
              <Form.Control
                {...register('table', {
                  required: true,
                })}
                type="text"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control
                {...register('comment', { required: true })}
                as="textarea"
                rows={3}
              />
            </Form.Group>

            <Button
              className=" my-2"
              onClick={() => setShowModal(false)}
              variant="primary"
              type="submit"
            >
              Подвердить бронь
            </Button>
            <Button
              className="my-2"
              style={{ backgroundColor: 'black' }}
              onClick={handleSendMail}
              variant="primary"
              type="button"
            >
              Отправить уведомление
            </Button>
            <Button
              style={{ backgroundColor: 'red' }}
              onClick={() => handleDeleteReserv(activeReserv.id)}
              variant="primary"
              type="button"
            >
              Удалить бронь
            </Button>
          </Row>
        </Form>
      )}
    </div>
  );
}

export default memo(ReservationModal);
