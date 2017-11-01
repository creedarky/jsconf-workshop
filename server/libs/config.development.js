module.exports = {
  database: 'jsconf',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: 'jsconf.sqlite',
    logging: (sql) => {
      console.log(`[${new Date()}] ${sql}`);
    },
    define: {
      underscored: true,
    },
  },
  jwtSecret: 'jsconf-AP1',
  jwtSession: { session: false },
};
