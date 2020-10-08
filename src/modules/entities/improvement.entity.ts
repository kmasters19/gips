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

  @Column({ nullable: true })
  propertyType: string;

  @Column({ type: 'float', nullable: true })
  bathCount: number;

  @Column({ type: 'integer', default: 0, nullable: true })
  bedroomCount: number;

  @Column({ type: 'integer', default: 0, nullable: true })
  improvementNo: number;

  @Column({ nullable: true })
  builtAsDescription: string;

  @Column({ default: 0, nullable: true })
  builtAsSqFt: number;

  @Column({ type: 'integer', default: 0, nullable: true })
  builtAsYearBuilt: number;

  @Column({ nullable: true })
  hvacType: string;

  @Column({ nullable: true })
  exterior: string;

  @Column({ nullable: true })
  interior: string;

  @Column({ type: 'integer', default: 0, nullable: true })
  units: number;

  @Column({ nullable: true })
  detailType: string;

  @Column({ nullable: true })
  improvementNumber: string;
}
