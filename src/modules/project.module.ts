// treatment.module.ts

import { Module } from '@nestjs/common';
import { ProjectController } from '../controllers/project.controller';
import { ProjectService } from 'src/services/project.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from '../schema/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [], // Export the service if needed in other modules
})
export class ProjectModule {}
