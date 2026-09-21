
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: 'postgres',
        logging: false,
    },
);

export default sequelize;

/*

- Sequelize recebe o nome da base de dados, utilizador e palavra-passe;
- host e port identificam onde está o PostgreSQL;
- dialect: 'postgres' escolhe o motor correto;
- logging: false evita mostrar cada consulta SQL no terminal;
- exportamos uma única instância para ser reutilizada pela aplicação.
Não usamos sequelize.sync(), porque as tabelas já foram criadas manualmente e não queremos que o ORM altere o esquema.


*/