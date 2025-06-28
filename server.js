
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// الحساب الثابت
const USERS = {
  admin: {
    password: 'admin#20211024',
    role: 'مؤسس'
  }
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// صفحة تسجيل الدخول
app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/dashboard');
  } else {
    res.sendFile(__dirname + '/public/login.html');
  }
});

// التحقق من تسجيل الدخول
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = USERS[username];

  if (user && user.password === password) {
    req.session.user = {
      username,
      role: user.role
    };
    res.redirect('/dashboard');
  } else {
    res.send('بيانات غير صحيحة <a href="/">رجوع</a>');
  }
});

// لوحة التحكم
app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  res.sendFile(__dirname + '/public/dashboard.html');
});

// تسجيل الخروج
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
