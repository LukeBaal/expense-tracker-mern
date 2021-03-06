const { db } = require('../server');
const moment = require('moment');
const { v4 } = require('uuid');

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public
exports.getTransactions = async (req, res, next) => {
  try {
    const weeks = Number(req.query.weeks) || 0;
    const months = Number(req.query.months) || 0;

    const start = moment().subtract({
      months,
      weeks
    });

    let transactions = await db.find({
      selector: { date: { $gte: start.toDate() } },
      sort: ['date']
    });

    transactions = await transactions.docs;

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @access  Public
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount, date } = req.body;
    const newTransaction = {
      _id: v4(),
      text,
      amount,
      date: date || Date.now(),
      createdAt: Date.now()
    };

    let transaction = await db.put(newTransaction);

    // Pouch only returns the status, _id, and _rev, so query for the new document and return it
    transaction = await db.get(transaction.id);

    return res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (err) {
    console.log(err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      console.log(`${err}`.red);
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
};

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await db.get(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      });
    }

    await db.remove(transaction);

    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
