// treatment.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Treatment } from '../schema/treatment.schema';

import { CreateTreatmentDto } from '../dto/treatments.dto';

@Injectable()
export class TreatmentService {
  constructor(
    @InjectModel(Treatment.name) private treatmentModel: Model<Treatment>,
  ) {}

  async getAllTreatments(): Promise<Treatment[]> {
    return this.treatmentModel.find().exec();
  }

  async getTreatmentById(projectId: string): Promise<Treatment> {
    console.log(projectId, 'id');
    const treatment = await this.treatmentModel
      .findOne({ projectId: projectId })
      .exec();
    if (!treatment) {
      throw new NotFoundException(`Treatment with id ${projectId} not found`);
    }
    return treatment;
  }

  async createTreatment(
    createTreatmentDto: CreateTreatmentDto,
  ): Promise<Treatment> {
    const newTreatment = new this.treatmentModel(createTreatmentDto);
    return newTreatment.save();
  }

  async updateTreatment(
    projectId: string,
    updateTreatmentDto: CreateTreatmentDto,
  ): Promise<Treatment> {
    try {
      const existingTreatment = await this.treatmentModel.findOneAndUpdate(
        { projectId: projectId },
        updateTreatmentDto,
        { new: true }, // This option ensures that the updated document is returned
      );

      if (!existingTreatment) {
        throw new NotFoundException(`Treatment with id ${projectId} not found`);
      }

      return existingTreatment;
    } catch (error) {
      throw new Error(`Error updating treatment: ${error.message}`);
    }
  }
}
