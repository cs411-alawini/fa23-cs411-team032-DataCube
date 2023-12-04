const db = require('../conf/database');
const UserModel = {};

async function getNextId() {
    try {
        const [results, fields] =  await db.execute(`
            SELECT MAX(userID) AS maxID FROM TuberInsights.User;
        `);

        if (results.length > 0 && results[0].maxID != null) {
           
            return results[0].maxID + 1;
        } else {
            // Handle the case where no IDs are found
            console.log("No existing user IDs found.");
            return 1; // Assuming you want to start from 1 if no users exist
        }
    } catch (err) {
        console.error("Error: ", err);
        throw err; // Rethrow the error or handle it as needed
    }
}

UserModel.createUser =async (user) => {

    let nextid = await getNextId();
    const baseQuery = `
        INSERT INTO User (userID, username, password, userType)
        VALUES (?, ?, ?, ?);
    `;
    return db.execute(baseQuery, [
        nextid,
        user.username,
        user.password,
        user.userType? user.userType : 'default'
    ]).then(([results, fields]) => {
        return Promise.resolve(results && results.affectedRows);
    }).catch((err) => Promise.reject(err));
}

UserModel.usernameExists = (username) => {
    return db.execute("SELECT * FROM User WHERE username=?",[username])
    .then(([results, fields]) =>{
        return Promise.resolve(!(results && results.length == 0));
    })
    .catch((err) => Promise.reject(err));
}

UserModel.authenticate = (username, password) => {
    let userId;
    let baseSQL = "SELECT id, username, password FROM User WHERE username=?;";
    return db
        .execute(baseSQL, [username])
        .then(([results, fields]) => {
            if (results && results.length == 1) {
                userId = results[0].id;
                return password == results[0].password;
            }else{
                return Promise.reject(-1);
            }
        })
        .then((passwordsMatch) => {
            if (passwordsMatch) {
                return Promise.resolve(userId);
            }else{
                return Promise.resolve(-1);
            }
        })
        .catch((err) => Promise.reject(err));
};



UserModel.updateUser = (userID, user) => {
    const baseQuery = `
        UPDATE User SET username = ?, password = ?
        WHERE userID = ?;
    `;
    return db.execute(baseQuery, [
        user.username,
        user.password,
        userID
    ]).then(([results, fields]) => {
        return Promise.resolve(results && results.affectedRows);
    }).catch((err) => Promise.reject(err));
}

module.exports  = UserModel;