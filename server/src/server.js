import app from './app.js';
import sequelize from './config/database.js';

const port = Number(process.env.PORT) || 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        app.listen(port, () => {
            console.log(`Mission Control API running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
        process.exitCode = 1;
    }
}

startServer();
