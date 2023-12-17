const dbPool = require('../config/database');

const getAllUsers = () => {
    const SQLQuery = 'SELECT * FROM users'; 

    return dbPool.execute(SQLQuery);
}

const createNewUser = (body) => {
    const SQLQuery = `INSERT INTO users (name, email)
                       VALUES ('${body.name}', '${body.email}') `

    return dbPool.execute(SQLQuery);
}

const updateUsers = (body,idUsers) => {
    const SQLQuery = `  UPDATE users 
                        SET name='${body.name}', email='${body.email}' 
                        WHERE id=${idUsers}`;

    return dbPool.execute(SQLQuery);
}

const deleteUsers = (idUsers) => {
    const SQLQuery =   `DELETE FROM users WHERE id=${idUsers}`;

    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUsers,
    deleteUsers,
}