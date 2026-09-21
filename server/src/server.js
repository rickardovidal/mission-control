import app from './app.js';

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
    console.log(`Mission Control API running on http://localhost:${port}`);
});

/* 

importamos a aplicação configurada em app.js;
lemos PORT do .env;
|| 3000 serve como alternativa se a variável não existir;
app.listen() coloca o servidor à escuta.


*/