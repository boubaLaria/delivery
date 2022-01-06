module.exports = {
  env: {
    BASE_URL: 'http://localhost:3000',
    MONGODB_URL: 'mongodb://127.0.0.1:27017/amazona',
    JWT_SECRET: 'somethingsecret',
    PAYPAL_CLIENT_ID:'AZ6mWjOD0D1YsKBsz2sfnm5LNORvIIPDKCA-jyBjIRDaY0hAchpguyop649N-k3h-gGpvjYCqP9mNrnE',
    CLOUDINARY_API_KEY: '743595615995582',
    CLOUDINARY_CLOUD_NAME: 'dpf15ksjc',
    CLOUDINARY_API_SECRET: 'G0AEA9GrErE3V3KA_D11zf9JDWw',
  },
  reactStrictMode: true,
  images: { domains: ['res.cloudinary.com'] },
};
