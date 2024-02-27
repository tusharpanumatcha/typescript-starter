import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../schema/project.schema'; // Import your Project schema/entity

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('Project') private readonly projectModel: Model<Project>,
  ) {}

  async getAllProjects(): Promise<Project[]> {
    try {
      const projects: Project[] = await this.projectModel.find().exec();
      return projects;
    } catch (error) {
      throw new Error(`Error retrieving projects: ${error.message}`);
    }
  }

  async findProjectByProjectId(projectId: string): Promise<Project | null> {
    try {
      const project: Project | null = await this.projectModel
        .findById({ _id: projectId })
        .exec();

      if (!project) {
        throw new NotFoundException(
          `Project with projectId ${projectId} not found`,
        );
      }

      return project;
    } catch (error) {
      throw new Error(`Error finding project by projectId: ${error.message}`);
    }
  }

  async deleteProjectByProjectId(projectId: string): Promise<void> {
    try {
      const deletedProject = await this.projectModel
        .findOneAndDelete({ _id: projectId })
        .exec();

      if (!deletedProject) {
        throw new NotFoundException(
          `Project with projectId ${projectId} not found`,
        );
      }
    } catch (error) {
      throw new Error(`Error deleting project by projectId: ${error.message}`);
    }
  }
}
