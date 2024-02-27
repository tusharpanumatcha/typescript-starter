import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ProjectService } from '../services/project.service'; // Import your ProjectService
import { Project } from '../schema/project.schema'; // Import your Project schema/entity

@Controller('api/project') // Adjust the route as needed
export class ProjectController {
  projectModel: any;
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getAllProjects(@Res() response: Response) {
    try {
      const projects: Project[] = await this.projectService.getAllProjects();
      return response.status(HttpStatus.OK).json({
        message: 'All projects retrieved successfully',
        data: projects,
      });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error retrieving projects',
        error: error.message,
      });
    }
  }

  @Get(':projectId')
  async getProjectByProjectId(
    @Res() response: Response,
    @Param('projectId') projectId: string,
  ) {
    try {
      const project: Project | null =
        await this.projectService.findProjectByProjectId(projectId);

      return response.status(HttpStatus.OK).json({
        message: 'Project retrieved successfully',
        data: project,
      });
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: 'Error retrieving project by projectId',
        error: error.message,
      });
    }
  }

  @Delete(':projectId')
  async deleteProjectByProjectId(
    @Res() response: Response,
    @Param('projectId') projectId: string,
  ) {
    try {
      await this.projectService.deleteProjectByProjectId(projectId);

      return response.status(HttpStatus.NO_CONTENT).send(); // 204 No Content for successful deletion
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: 'Error deleting project by projectId',
        error: error.message,
      });
    }
  }
}
