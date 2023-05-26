import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import ReservationTable from './ReservationTable';
import ReservationList from './ReservationList';
import ReservationModal from './ReservationModal';
import ReservationForm from './ReservationForm';
import styles from './styles.module.css';
import {
  initReservationsTable,
  selectReservationList,
} from './reservaionSlice';

function Reservation(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [activModalReserv, setActivModalReserv] = useState(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initReservationsTable());
  }, [dispatch]);
  const reservationList = useSelector(selectReservationList);
  return (
    <div>
      <div>
        <ReservationTable
          setShowModal={setShowModal}
          setActivModalReserv={setActivModalReserv}
        />
        <div className={styles.tableTwoCol}>
          <div className={styles.leftCol}>
            <h3>Список заявок на резерв</h3>
            {reservationList.length > 0
              ? reservationList.map((reserv) => (
                  <div key={reserv.id} data-id={reserv.id}>
                    {!reserv.table ? (
                      <ReservationList
                        oneReserv={reserv}
                        setShowModal={setShowModal}
                        setActivModalReserv={setActivModalReserv}
                      />
                    ) : (
                      []
                    )}
                  </div>
                ))
              : []}
          </div>
          <ReservationModal
            showModal={showModal}
            setShowModal={setShowModal}
            activModalReserv={activModalReserv}
          />
          <div className={styles.rightCol}>
            <ReservationForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Reservation);
