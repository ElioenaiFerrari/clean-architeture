import { MongoGateway } from '@infra/database/mongo';

const gateway = new MongoGateway('mongodb://localhost:27017');
const cleanArchitetureConnection = gateway.connect('clean-architeture', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

export { cleanArchitetureConnection };
