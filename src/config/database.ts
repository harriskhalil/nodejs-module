export default () => ({
  database: {
    connection: process.env.DATABASE_CONNECTION || 'mongodb',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    name: process.env.DATABASE || 'test',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '27017', 10),
  },
});
