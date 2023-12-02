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
module.exports  = UserModel;