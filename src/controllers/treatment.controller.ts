import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { TreatmentService } from '../services/treatment.service';
import { Treatment } from '../schema/treatment.schema';
import { CreateTreatmentDto } from 'src/dto/treatments.dto';
import { Api } from 'src/helper/api';

@Controller('api/treatment') // Adjust the route as needed
export class TreatmentController {
  constructor(private readonly treatmentService: TreatmentService) {}

  @Get()
  async getAllTreatments(@Res() response: Response) {
    try {
      const treatments: Treatment[] =
        await this.treatmentService.getAllTreatments();
      return Api.ok(response, treatments);
    } catch (error) {
      return Api.serverError(response, error);
    }
  }

  @Get(':id')
  async getTreatmentById(@Res() response: Response, @Param('id') id: string) {
    try {
      const treatment: Treatment =
        await this.treatmentService.getTreatmentById(id);
      if (!treatment) {
        throw new NotFoundException(`Treatment with id ${id} not found`);
      }
      return Api.ok(response, treatment);
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: 'Error retrieving treatment by id',
        error: error.message,
      });
    }
  }

  @Post()
  async createTreatment(
    @Res() response: Response,
    @Body() createTreatmentDto: CreateTreatmentDto,
  ) {
    try {
      const newTreatment: Treatment =
        await this.treatmentService.createTreatment(createTreatmentDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Treatment created successfully',
        data: newTreatment,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error creating treatment',
        error: error.message,
      });
    }
  }

  @Put(':id') // Define the route for updating treatment by ID
  async updateTreatment(
    @Res() response: Response,
    @Param('id') id: string,
    @Body() updateTreatmentDto: CreateTreatmentDto, // Use the DTO for updating treatment
  ) {
    try {
      const updatedTreatment: Treatment =
        await this.treatmentService.updateTreatment(id, updateTreatmentDto);
      if (!updatedTreatment) {
        throw new NotFoundException(`Treatment with id ${id} not found`);
      }
      return response.status(HttpStatus.OK).json({
        message: 'Treatment updated successfully',
        data: updatedTreatment,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error updating treatment',
        error: error.message,
      });
    }
  }
}
