const bcrypt = require('bcrypt');

const { Admin, Reservation, Certificate, Review } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    await Admin.bulkCreate([
      {
        login: 'admin',
        password: await bcrypt.hash('1234', 5),
      },
    ]);
    await Reservation.bulkCreate([
      {
        name: 'Рыжков Иван Александрович',
        phoneNumber: +79213506343,
        email: 'vanya.ruzhcov@gmail.com',
        date: new Date(2023, 4, 22, 14, 30),
        guests: 2,
        table: 1,
        comment: 'гд',
        status: true,
      },
      {
        name: 'Рыжков Иан Александрович',
        phoneNumber: +79213506333,
        email: 'vanya.ruzhcov@gmail.com',
        date: new Date(2023, 4, 22, 13, 30),
        table: 4,
        guests: 2,
        comment: 'гуууу',
        status: false,
      },
      {
        name: 'Рыков Иван Александрович',
        phoneNumber: +79213506341,
        email: 'vanya.ruzhcov@gmail.com',
        date: new Date(2023, 4, 22, 15, 30),
        guests: 2,
        table: 9,
        comment: 'гууууд',
        status: false,
      },
    ]);
    await Certificate.bulkCreate([
      {
        name: 'Ivan',
        phoneNumber: +89213506343,
        email: 'vanya@gamail.com',
        numberCertificates: 'dofvsnfepfk[amfpamsfipnepifm',
        amount: 10000,
        status: true,
      },
    ]);
    await Review.bulkCreate([
      {
        name: 'Ivan',
        review: 'крутяк пушка бомба',
      },
    ]);
  },

  async down() {
    await Admin.destroy({ truncate: { cascade: true } });
    await Reservation.destroy({ truncate: { cascade: true } });
    await Certificate.destroy({ truncate: { cascade: true } });
    await Review.destroy({ truncate: { cascade: true } });
  },
};
