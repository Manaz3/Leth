/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
// const { v4: uuidv4 } = require('uuid');

const certificateRoute = require('express').Router();

const { Certificate } = require('../../db/models');

const mailer = require('../../nodemailer');

certificateRoute.post('/', async (req, res) => {
  try {
    const data = req.body;
    const certificateList = await Certificate.create({
      name: data.name,
      email: data.email,
      amount: data.amount,

      numberCertificates: Math.floor(Math.random() * 10000),
      status: true,
    });

    const message = {
      to: req.body.email,
      subject: 'Сертификат в Ресторан Leth',
      html: ` <h1>Поздравляем с приобретением сертификата</h1>

      <p><b>${req.body.name}</b> вам предоставляется сертификат на посещение нашего ресторана.</p>
      <p>
      <div><p>На сумму ${req.body.amount}</p></div>
      Это прекрасная возможность насладиться отличной кухней и атмосерой нашего заведения.
      Мы гарантируем, что вы будете удовлетворены нашим сервисом и качеством блюд.
      Пожалуйста, свяжитесь с нами, чтобы заброниров столик и воспользоваться своим сертификатом.</p>
      <p>Номер вашего сертификата: <b>${certificateList.numberCertificates}</b></p>
      
      <p>С уважением,
      Команда ресторана <a href='http://localhost:3000/'>Leth</a>.</p>
      
      `,
    };

    mailer(message);
    // console.log(mailer(message));
    
    res.status(200).json(certificateList);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

certificateRoute.get('/', async (req, res) => {
  try {
    const certificateList = await Certificate.findAll();
    if (certificateList) {
      res.status(200).json(certificateList);
    } else {
      res
        .status(400)
        .json({ success: false, message: 'Сертификаты не найдены' });
    }
  } catch (error) {
    console.erroror(error);
    res.status(500).json(error);
  }
});

certificateRoute.put('/:id', async (req, res) => {
  try {
    const currentCert = await Certificate.findByPk(Number(req.params.id));

    const {
      id, name, email, amount, numberCertificates,
    } = req.body;
    if (!currentCert) {
      res
        .status(404)
        .json({ success: false, message: 'Нет такого сертификата' });
      return;
    }
    if (currentCert) {
      (currentCert.id = id),
      (currentCert.name = name),
      (currentCert.email = email),
      (currentCert.amount = amount),
      (currentCert.numberCertificates = numberCertificates),
      (currentCert.status = false);
      await currentCert.save();
      res.status(200).json(currentCert);
    }
  } catch (error) {
    console.erroror(error);
    res.status(500).json(error);
  }
});

module.exports = certificateRoute;
