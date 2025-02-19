const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /v1/api/example:
 *   get:
 *     summary: Example route
 *     description: Returns an example response
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/example', (req, res) => {
  res.json({ message: 'swagger route working!' });
});

module.exports = router;
