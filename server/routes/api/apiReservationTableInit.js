const mainRouter = require('express').Router();

const { Table, Reservation } = require('../../db/models');
const mailer = require('../../nodemailer');

// запрос массива времени
mainRouter.get('/', async (req, res) => {
  try {
    const tablesList = await Table.findAll();
    const reservationList = await Reservation.findAll();
    if (tablesList && reservationList) {
      res.status(200).json({ tablesList, reservationList });
    } else {
      res.status(400).json({ success: false, message: 'Записи не найдены' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

mainRouter.put('/:id/update', async (req, res) => {
  try {
    const { name, phoneNumber, guests, email, date, table, comment, status } =
      req.body;
    const reservOne = await Reservation.findByPk(Number(req.params.id));
    // if (!reservOne || req.session.adminId) {
    //   res.status(404).json({ success: false, message: 'Запись не найдена' });
    //   return;
    // }
    if (reservOne) {
      reservOne.name = name;
      reservOne.phoneNumber = phoneNumber;
      reservOne.guests = guests;
      reservOne.email = email;
      reservOne.date = date;
      reservOne.table = table;
      reservOne.comment = comment;
      reservOne.status = status;
      await reservOne.save();
      res.status(200).json(reservOne);
    } else {
      res
        .status(400)
        .json({ success: false, message: 'Такая запись не найдена' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

mainRouter.post('/:id/sendmail', (req, res) => {
  try {
    console.log('req.body', req.body);
    const fromAdmin = req.body;
    const message = {
      to: fromAdmin.email,
      subject: 'Бронирование в ресторане Leth',

      html: `<h1>Бронирование в ресторане Leth</h1>
      <p>Здравствуйте, ${req.body.name}.</p>

      
      <p>Ваш зарпрос на бронирование <b>подтвержден</b>. Мы с нетерпение ждем встречи с вами.</p>


     <p> <b>Детали бронирования:</b>
     <br/>
     ${req.body.name}
     <br/>
     ${req.body.guests}
     <br/>
     ${req.body.date}
     </p>

      
      <p><i>Просим обратить внимание на то, что посещение ограничено 2 часами!</i></p>
      `,
    };

    console.log(message);

    mailer(message);
    console.log(mailer(message));
    res.status(200).json({ success: true, message: 'Письмо отправлено' });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

mainRouter.delete('/:id/deletereserv', async (req, res) => {
  try {
    console.log('req.params.id', req.params.id);
    let reservDel;
    if (req.session.adminId) {
      reservDel = await Reservation.destroy({
        where: {
          id: Number(req.params.id),
        },
      });
    }
    console.log('reservDel', reservDel);
    if (reservDel === 0) {
      res.status(400).json({ success: false, message: 'Нет такого резерва' });
    }
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

module.exports = mainRouter;
