// treatment.module.ts

import { Module } from '@nestjs/common';
import { NotesController } from 'src/controllers/notes.controller';
// import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [],
  controllers: [NotesController],
  providers: [],
  exports: [], // Export the service if needed in other modules
})
export class NotesModule {}
