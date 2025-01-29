import { InitializeApp } from '@shared/infra/http/app';

export default InitializeApp().then(app =>
  app.listen(process.env.PORT || 4000, () => {
    console.log(`🚀 Server listening on port ${process.env.PORT || 4000}.`);
  })
);
