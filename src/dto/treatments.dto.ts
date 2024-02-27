import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTreatmentDto {
  @IsNotEmpty()
  @IsString()
  readonly _id: string;

  @IsNotEmpty()
  @IsString()
  readonly projectId: string;

  @IsNotEmpty()
  @IsNumber()
  readonly treatments: number;

  @IsNotEmpty()
  @IsNumber()
  readonly replications: number;
}
