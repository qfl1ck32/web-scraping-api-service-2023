export default () => ({
  app: {
    ip: process.env.APP_IP,
    port: parseInt(process.env.APP_PORT, 10),
  },
});
