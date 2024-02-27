import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface ProjectTreatment {
  projectTitle: string;
  location: string;
  replications: number;
  treatments: number;
}

@Schema()
export class Project extends Document {
  @Prop({ required: true })
  userMail: string;

  @Prop({ required: true })
  _id: string;

  @Prop({ type: [Object], required: true })
  projects: ProjectTreatment[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
