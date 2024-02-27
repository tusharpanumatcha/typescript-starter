// treatment.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TreatmentController } from '../controllers/treatment.controller';
import { TreatmentService } from '../services/treatment.service';
import { Treatment, TreatmentSchema } from '../schema/treatment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Treatment.name, schema: TreatmentSchema },
    ]),
  ],
  controllers: [TreatmentController],
  providers: [TreatmentService],
  exports: [TreatmentService], // Export the service if needed in other modules
})
export class TreatmentModule {}
