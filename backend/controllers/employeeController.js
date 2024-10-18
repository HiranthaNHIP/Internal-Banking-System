const db = require('../database'); // MySQL database connection

exports.getEmployee = async (request, response) => {
    const sql = `SELECT e.employee_id, b.branch_name, e.first_name, e.last_name, e.Address, e.Gender, e.email, e.DOB, e.position, e.Username, e.phone_number, e.dateof_joined FROM employees e JOIN bankbranch b ON e.branch_id = b.branch_id WHERE b.branch_id = ?`;
    db.query(sql, [request.params.branchID], (err, results) => {
        if (err) return response.status(500).json({ error: 'Database Error' });
        if (results.length === 0) return response.status(404).json({ error: 'No details found for the given branch_id' });

            // Add 'id' attribute to each transaction
            const employeesWithId = results.map((employees, index) => ({
                id: index, // Start from 1, or you can use index if you want zero-based indexing
                ...employees
            }));
        return response.status(200).json({ employees: employeesWithId });
    });
};