const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: process.env.DB_TYPE,
    define: {
        freezeTableName: true,
    },
});

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

module.exports = {
    sequelize,
    connectDb,
};
