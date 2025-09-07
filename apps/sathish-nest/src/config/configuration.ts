export default () => ({
  jwtSecret: process.env.JWT_SECRET,
  mongoUrlPrefix: process.env.MONGO_URL_PREFIX,
});
