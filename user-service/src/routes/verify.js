const express = require('express');
const router = express.Router();
const { updateUser } = require('../dependencies/userStore');
const { publishUserVerified } = require('../dependencies/kafka');

router.get('/verify', async (req, res) => {
  const token  = req.query.t;

  if (!token) {
    return res.status(400).json({ error: 'unknown' });
  }

  const user = await updateUser(token, {verified: true});

  if (!user) {
    return res.status(404).json({ error: 'unknown' });
  }

  try {
    await publishUserVerified((({name, email, verified})=>({name, email, verified}))(user));
    res.status(200).json({ message: 'User verified successfully' });
  } catch (error) {
    console.error('Kafka error:', error);
    res.status(500).json({ error: 'Verification succeeded, but Kafka notification failed' });
  }
});

module.exports = router;