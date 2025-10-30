const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

console.log('Testing SMTP Configuration...');
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_PORT:', process.env.SMTP_PORT);
console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SECURE:', process.env.SECURE);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

async function testEmail() {
  try {
    console.log('\n🔍 Testing SMTP connection...');
    
    // Test connection
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');
    
    // Send test email
    console.log('\n📧 Sending test email...');
    const result = await transporter.sendMail({
      from: `"Test Email" <${process.env.EMAIL_FROM || process.env.SMTP_USER}>`,
      to: 'berekettade7@gmail.com',
      subject: 'Test Email from GVG Marketplace',
      text: 'This is a test email to verify SMTP configuration.',
      html: '<h1>Test Email</h1><p>This is a test email to verify SMTP configuration.</p>'
    });
    
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', result.messageId);
    console.log('Response:', result.response);
    console.log('Accepted:', result.accepted);
    console.log('Rejected:', result.rejected);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Error code:', error.code);
    console.error('Error response:', error.response);
  }
}

testEmail();
