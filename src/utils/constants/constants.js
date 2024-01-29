const nodemailer = require('nodemailer');
const accountSid = 'AC544911cc83e96961922d9b413646c949';
const authToken = '309d74690d820914a35cac360d82e917';
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, 
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, 
  },
});

const getRandomPassword = async ()=> {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 8;
  let randomStr = '';

  for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * characters.length);
    randomStr += characters[randomNum];
  }
  return randomStr;
};


  const newUserEmail = async (to,username,password) => {
      try {
        const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: to,
          subject: 'New User Created',
          text: `New User with following credentials is created:
          Username: ${username}
          Password: ${password}
          `
        };
        await transporter.sendMail(mailOptions);
        console.log('New User Creation email sent successfully');
      } catch (error) {
        console.error('Error sending email:', error);
      }
    }

    




module.exports = { newUserEmail,getRandomPassword };
