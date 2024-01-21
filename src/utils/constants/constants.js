const nodemailer = require('nodemailer');
const accountSid = 'AC544911cc83e96961922d9b413646c949';
const authToken = '309d74690d820914a35cac360d82e917';
const client = require('twilio')(accountSid, authToken);
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

const sendForgetPasswordSMS = async (to, code) => {
    try {
      const message = await client.messages.create({
        body: `You Password Reset Code is: ${code}`,
        from: '+12267842094',
        to: to,
      });
  
      console.log(`SMS sent with SID: ${message.sid}`);
    } catch (error) {
      console.error(`Error sending SMS: ${error.message}`);
    }
  };
const sendVerificationSMS = async (to, code) => {
    try {
      const message = await client.messages.create({
        body: `You Verification Code is: ${code}`,
        from: '+12267842094',
        to: to,
      });
  
      console.log(`SMS sent with SID: ${message.sid}`);
    } catch (error) {
      console.error(`Error sending SMS: ${error.message}`);
    }
  };
    
  // Example usage
const sendPasswordResetEmail = async (toEmail, resetLink) => {
  try {
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: toEmail,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: ${resetLink}`
    };

    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};
const sendVerificationEmail = async (toEmail, code) => {
    try {
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: toEmail,
        subject: 'Verifcation Code',
        text: `Use the following code to verify your Account: ${code}`
      };
  
      await transporter.sendMail(mailOptions);
      console.log('Verification email sent successfully');
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  };
const sendForgetPasswordEmail = async (toEmail, code) => {
    try {
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: toEmail,
        subject: 'Verifcation Code',
        text: `Use the following code to Reset your password: ${code}`
      };
  
      await transporter.sendMail(mailOptions);
      console.log('Verification email sent successfully');
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  };

module.exports = { sendForgetPasswordEmail,sendVerificationEmail,sendForgetPasswordSMS,sendVerificationSMS };