"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(404).send('Not permitted');
}
const router = (0, express_1.Router)();
exports.router = router;
router.get('/login', (req, res) => {
    res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <button>Submit</button>
    </form>
  `);
});
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email &&
        password &&
        email === 'email@email.com' &&
        password === 'password') {
        req.session = { loggedIn: true };
        res.redirect('/');
    }
    else
        res.send('Invalid email or password');
});
router.get('/', (req, res) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
      <div>You are logged in </div>
      <a href='/logout'>Logout</a>
    `);
    }
    else {
        res.send(`
    <div>You are not logged in </div>
    <a href='/login'>Login</a>
  `);
    }
});
router.get('/logout', (req, res) => {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, (req, res) => {
    res.send('Welcome to the Protected lands. Speak friend and enter');
});
