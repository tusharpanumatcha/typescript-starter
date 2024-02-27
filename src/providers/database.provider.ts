import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      try {
        const connection = await mongoose.connect(
          'mongodb+srv://winteriscoming164:Porababu.12@cluster0.qmfowsk.mongodb.net/Research-Pal',
        );
        console.log('connection set');
        return connection;
      } catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Unable to connect to the database');
      }
    },
  },
];
