import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import './CertificateItem.css';

function CertificateItem(): JSX.Element {
  const currentCertificates = useSelector(
    (state: RootState) => state.certificates.certificateList
  );

  return (
    <div className="all-certificate">
      <div className="title">
        <p>Активные сертификаты</p>
        <div className="activ-container">
          {currentCertificates.map(
            (el) =>
              el.status && (
                <div key={el.id} className="activ-certificate">
                  <div>
                    <div>Имя: {el.name}</div>
                    <div>Номер сертификата: {el.numberCertificates}</div>
                    <div>Сумма: {el.amount}</div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      <div className="title">
        <p>Использованные сертификаты</p>
        <div className="pasiv-container">
          {currentCertificates.map(
            (el) =>
              !el.status && (
                <div>
                  <div key={el.id} className="passiv-certificate">
                    <div>Имя: {el.name}</div>
                    <div>Номер сертификата: {el.numberCertificates}</div>
                    <div>Сумма: {el.amount}</div>
                    <div>Статус : использован</div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(CertificateItem);
