const db = require('../database'); // MySQL database connection


 // Get account numbers for a given NIC.
exports.getAccountsByNIC = (request, response) => {
  const { NIC } = request.params;
  const sql = `SELECT account_no FROM bank_accounts WHERE customer_id = (SELECT CustomerID FROM customers WHERE NIC = ?)`;

  db.query(sql, [NIC], (err, results) => {
    if (err) return response.status(500).send({ error: 'Database Error' });
    if (results.length === 0) return response.status(404).send({ error: 'No accounts found for the given NIC' });
    response.send({ accountNumbers: results.map(row => row.account_no) });
  });
};


 //Get customer and account details for a given account number.
exports.getAccountDetails = (request, response) => {
  const { accountNo } = request.params;
  const sql = `
    SELECT c.Name, c.NIC, c.Signature, a.balance, at.account_type_name 
    FROM bank_accounts a
    INNER JOIN customers c ON a.customer_id = c.CustomerID
    INNER JOIN account_type at ON a.account_type = at.account_type_id
    WHERE a.account_no = ?
  `;

  db.query(sql, [accountNo], (err, results) => {
    if (err) return response.status(500).send({ error: 'Database Error' });
    if (results.length === 0) return response.status(404).send({ error: 'No details found for the given account number' });
    response.send(results[0]);
  });
};

//handle the delete operation.
exports.depositAmount = (request, response) => {
  const { accountNo, amount, employeeId } = request.body;
  
  // 1. Update the bank account balance
  const updateBalanceSQL = `UPDATE bank_accounts SET balance = balance + ? WHERE account_no = ?`;

  db.query(updateBalanceSQL, [amount, accountNo], (err, result) => {
    if (err) return response.status(500).send({ error: 'Failed to update balance' });

    // 2. Create a new transaction record
    const insertTransactionSQL = `
      INSERT INTO transactions (transaction_type, amount, transaction_date, description, status, account_no, employee_id) 
      VALUES ('Deposit', ?, NOW(), 'Deposit of amount', 'Completed', ?, ?)
    `;

    db.query(insertTransactionSQL, [amount, accountNo, employeeId], (err, transactionResult) => {
      if (err) return response.status(500).send({ error: 'Failed to create transaction record' });
      response.send({ message: 'Deposit successful', transactionId: transactionResult.insertId });
    });
  });
};

//handle the withdrawal operation.
exports.withdrawAmount = (request, response) => {
  const { accountNo, amount, employeeId } = request.body;

  // 1. Check if there are sufficient funds
  const getBalanceSQL = `SELECT balance FROM bank_accounts WHERE account_no = ?`;

  db.query(getBalanceSQL, [accountNo], (err, results) => {
    if (err) return response.status(500).send({ error: 'Database Error' });
    if (results.length === 0) return response.status(404).send({ error: 'Account not found' });
    
    const currentBalance = results[0].balance;
    if (currentBalance < amount) return response.status(400).send({ error: 'Insufficient funds' });

    // 2. Update the bank account balance
    const updateBalanceSQL = `UPDATE bank_accounts SET balance = balance - ? WHERE account_no = ?`;

    db.query(updateBalanceSQL, [amount, accountNo], (err, result) => {
      if (err) return response.status(500).send({ error: 'Failed to update balance' });

      // 3. Create a new transaction record
      const insertTransactionSQL = `
        INSERT INTO transactions (transaction_type, amount, transaction_date, description, status, account_no, employee_id) 
        VALUES ('Withdrawal', ?, NOW(), 'Withdrawal of amount', 'Completed', ?, ?)
      `;

      db.query(insertTransactionSQL, [amount, accountNo, employeeId], (err, transactionResult) => {
        if (err) return response.status(500).send({ error: 'Failed to create transaction record' });
        response.send({ message: 'Withdrawal successful', transactionId: transactionResult.insertId });
      });
    });
  });
};
