// treatment.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Treatment extends Document {
  @Prop({ required: true })
  projectId: string;

  @Prop({ required: true })
  treatments: number;

  @Prop({ required: true })
  replications: number;
}

export const TreatmentSchema = SchemaFactory.createForClass(Treatment);
