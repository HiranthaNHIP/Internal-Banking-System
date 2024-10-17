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
  const { account_no, amount, employee_id, branch_id } = request.body;
  
  // 1. Update the bank account balance
  const updateBalance = `UPDATE bankaccount SET balance = balance + ? WHERE Account_no = ?`;

  db.query(updateBalance, [amount, account_no], (err, result) => {
    if (err) return response.status(500).send({ error: 'Failed to update balance' });

    // 3. Get the last transaction_id and increment it
    const getLastTransactionId = `SELECT MAX(transaction_id) as lastTransactionId FROM transaction`;

    db.query(getLastTransactionId, (err, transactionResult) => {
      if (err) return response.status(500).send({ error: 'Failed to get last transaction ID' });
      
      const lastTransactionId = transactionResult[0].lastTransactionId || 0;
      const newTransactionId = lastTransactionId + 1;

      // 4. Create a new transaction record with the incremented ID
      const insertTransaction = `
        INSERT INTO transaction (transaction_id, Account_no, transaction_type, amount, transaction_date, employee_id, branch_id, status) 
        VALUES (?, ?, 'Deposit', ?, CURDATE(), ?, ?, 'Completed')
      `;

      db.query(insertTransaction, [newTransactionId, account_no, amount, employee_id, branch_id], (err, insertResult) => {
        if (err) return response.status(500).send({ error: 'Failed to create transaction record' });
        response.send({ message: 'Withdrawal successful', transactionId: newTransactionId });
      });
    });
  });
};

exports.withdrawAmount = (request, response) => {
  console.log(request.body);
  const { account_no, amount, employee_id, branch_id } = request.body;

  // 1. Check if there are sufficient funds
  const getBalance = `SELECT balance FROM bankaccount WHERE Account_no = ?`;

  db.query(getBalance, [account_no], (error, results) => {
    if (error) return response.status(500).send({ error: 'Database Error' });
    if (results.length === 0) return response.status(404).send({ error: 'Account not found' });
    
    const currentBalance = results[0].balance;
    if (currentBalance < amount) return response.status(400).send({ error: 'Insufficient funds' });

    // 2. Update the bank account balance
    const updateBalance = `UPDATE bankaccount SET balance = balance - ? WHERE Account_no = ?`;

    db.query(updateBalance, [amount, account_no], (error, result) => {
      if (error) return response.status(500).send({ error: 'Failed to update balance' });

      // 3. Get the last transaction_id and increment it
      const getLastTransactionId = `SELECT MAX(transaction_id) as lastTransactionId FROM transaction`;

      db.query(getLastTransactionId, (err, transactionResult) => {
        if (err) return response.status(500).send({ error: 'Failed to get last transaction ID' });
        
        const lastTransactionId = transactionResult[0].lastTransactionId || 0;
        const newTransactionId = lastTransactionId + 1;

        // 4. Create a new transaction record with the incremented ID
        const insertTransaction = `
          INSERT INTO transaction (transaction_id, Account_no, transaction_type, amount, transaction_date, employee_id, branch_id, status) 
          VALUES (?, ?, 'Withdrawal', ?, CURDATE(), ?, ?, 'Completed')
        `;

        db.query(insertTransaction, [newTransactionId, account_no, amount, employee_id, branch_id], (err, insertResult) => {
          if (err) return response.status(500).send({ error: 'Failed to create transaction record' });
          response.send({ message: 'Withdrawal successful', transactionId: newTransactionId });
        });
      });
    });
  });
};


