import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://winteriscoming164:Porababu.12@cluster0.qmfowsk.mongodb.net/Research-Pal',
    ),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
