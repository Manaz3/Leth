/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Timeline, {
  TimelineMarkers,
  CustomMarker,
  TodayMarker,
  CursorMarker,
} from 'react-calendar-timeline';
import moment from 'moment';
import { selectReservationList, selectTablesList } from './reservaionSlice';
import 'react-calendar-timeline/lib/Timeline.css';
import styles from './styles.module.css';

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setActivModalReserv: React.Dispatch<React.SetStateAction<number>>;
};

function ReservationTable({
  setShowModal,
  setActivModalReserv,
}: Props): JSX.Element {
  const tablesList = useSelector(selectTablesList);
  const reservationList = useSelector(selectReservationList);

  console.log('столы', tablesList);
  console.log('резервы', reservationList);

  // это формируется левая колонка со столами
  const groups = tablesList.map((table) => ({
    id: table.id,
    title: `Стол ${table.number}`,
  }));

  // Тут резерву делается продолжительность брони, на 2 часа
  const addHours = (originalDate: Date, hoursToAdd = 2): Date => {
    const newDate = new Date(originalDate);
    const newHours = newDate.getHours() + hoursToAdd;
    newDate.setHours(newHours);
    return newDate;
  };

  // это формируются элементы резервов в таблице
  const items = reservationList.map((reserv) => ({
    id: reserv.id,
    group: reserv.table,
    title: reserv.name,
    start_time: new Date(reserv.date),
    end_time: addHours(new Date(reserv.date)),
    // цвет текста так не назначается
    color: 'rgb(0, 0, 0)',
  }));

  // const itemRenderer = ({ getItemProps }) => {const color = itemContext.selected && itemContext.};

  const today = Date.now();

  // Открытие модалки выбранного элемента в таблице
  const handleModal = (itemId: number): void => {
    setShowModal(true);
    setActivModalReserv(itemId);
  };

  return (
    <Timeline
      groups={groups}
      items={items}
      defaultTimeStart={moment().add(-6, 'hour')}
      defaultTimeEnd={moment().add(6, 'hour')}
      onItemClick={handleModal}
      className={styles.myItem}
    >
      <TimelineMarkers className="text-dark">
        <TodayMarker />
        <CustomMarker date={today} className="text-dark" />

        <CursorMarker />
      </TimelineMarkers>
    </Timeline>
  );
}

export default memo(ReservationTable);
