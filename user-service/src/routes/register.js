const express = require('express');
const router = express.Router();
const { userExists, addUser } = require('../dependencies/userStore');
const { publishUserRegistered } = require('../dependencies/kafka');
const User = require('../models/user');
const {v4: uuid} = require('uuid');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (await userExists(email)) {
    return res.status(409).json({ error: 'User already exists' });
  }

  const user = new User(name, email, password);
  user.verificationToken = uuid();
  user.verified = false;

  await addUser(user);

  try {
    await publishUserRegistered((({name, email, verificationToken, verified})=>({name, email, verificationToken, verified}))(user));
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Kafka error:', error);
    res.status(500).json({ error: 'Registration succeeded, but Kafka notification failed' });
  }
});

module.exports = router;