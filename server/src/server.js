import app from './app.js';
import sequelize from './config/database.js';

const port = Number(process.env.PORT) || 3000;

const startServer = async () => {
    try {
        await sequelize.authenticate();

        console.log('Database connection established successfully.');

        app.listen(port, () => {
    console.log(`Mission Control API running on http://localhost:${port}`);
});
    } catch(error) {
        console.error('Unable to connect to the database: ', error.message);
    }
}

startServer();




/* 

importamos a aplicação configurada em app.js;
lemos PORT do .env;
|| 3000 serve como alternativa se a variável não existir;
app.listen() coloca o servidor à escuta.


*/