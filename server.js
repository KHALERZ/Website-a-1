const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

const USERS = {
  admin: {
    password: 'admin#20211024',
    role: 'مؤسس',
    name: 'Test Name',
    email: 'test@example.com',
    phone: '0000000000'
  }
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = USERS[username];

  if (user && user.password === password) {
    res.send(`
      <html lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>لوحة التحكم</title>
        <style>
          body { font-family: Arial; text-align: center; margin-top: 80px; background: #f4f4f4; }
          .container {
            background: white; padding: 20px; border-radius: 10px;
            width: 90%; max-width: 500px; margin: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          .info { text-align: right; direction: rtl; margin-top: 20px; }
          a {
            text-decoration: none; color: white; background: red;
            padding: 10px 20px; display: inline-block; border-radius: 5px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>مرحبًا بك في لوحة إدارة الفريق!</h1>
          <p>تم تسجيل الدخول بصلاحية: <strong>${user.role}</strong></p>
          <div class="info">
            <p><strong>اسم المستخدم:</strong> ${username}</p>
            <p><strong>الاسم الكامل:</strong> ${user.name}</p>
            <p><strong>البريد الإلكتروني:</strong> ${user.email}</p>
            <p><strong>رقم الجوال:</strong> ${user.phone}</p>
            <p><strong>الرتبة:</strong> ${user.role}</p>
          </div>
          <a href="/">تسجيل الخروج</a>
        </div>
      </body>
      </html>
    `);
  } else {
    res.send('<p>بيانات الدخول خاطئة.</p><a href="/">حاول مرة أخرى</a>');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});