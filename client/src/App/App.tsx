import React, { memo, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminNavBar from '../features/AdminNavBar/AdminNavBar';
import Reservation from '../features/adminReservation/Reservation';
import Layout from '../components/Layout/Layout';
import MenuList from '../components/MenuList/MenuList';
import AdminAuthorization from '../components/AdminAuthorization/AdminAuthorization';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';
import { getUser } from '../components/AdminAuthorization/AdminAuthorizationSlice';
import { RootState, useAppDispatch } from '../store';
import CertificatePage from '../features/adminCertificatePage/CertificatePage';
import './App.css';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  const admin = useSelector((state: RootState) => state.adminAuth.admin);
  return (
    // здесь нужно сделать редирект на форму авторизации если админ не авторизован
    <Routes>
      {/* {admin ? ( */}
      <Route path="/admin/" element={<AdminNavBar />}>
        <Route path="adminAuth" element={<AdminAuthorization />} />
        <Route path="reservation" element={<Reservation />} />
        <Route path="certificate" element={<CertificatePage />} />
      </Route>
      {/* ) : (
        <Route path="/adminAuth" element={<AdminAuthorization />} />
      )} */}

      <Route path="/" element={<Layout />} />
      <Route path="/menu" element={<MenuList />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default memo(App);
