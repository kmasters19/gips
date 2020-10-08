import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'improvements' })
export class ImprovementEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  clientId: string;

  @Column()
  accountNumber: string;

  @Column()
  appraisalType: string;

  @Column()
  accountStatus: string;

  @Column()
  parcelNumber: string;

  @Column()
  propertyType: string;

  @Column({ type: 'float' })
  bathCount: number;

  @Column({ type: 'integer' })
  bedroomCount: number;

  @Column({ type: 'integer' })
  improvementNo: number;

  @Column()
  builtAsDescription: string;

  @Column()
  builtAsSqFt: number;

  @Column({ type: 'integer' })
  builtAsYearBuilt: number;

  @Column()
  hvacType: string;

  @Column()
  exterior: string;

  @Column()
  interior: string;

  @Column({ type: 'integer' })
  units: number;

  @Column()
  detailType: string;

  @Column()
  improvementNumber: string;
}
