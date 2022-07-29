module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'c43a5cc6f9cfda59681641ac5b231268'),
  },
});
