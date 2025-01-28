import app from './shared/infra/http/app';

export default app.listen(process.env.PORT || 4000, () => {
  console.log(`🚀 Server listening on port ${process.env.PORT || 4000}.`);
});
