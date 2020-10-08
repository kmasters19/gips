import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'improvement_details' })
export class ImprovementDetailEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  clientId: string;

  @Column()
  accountNumber: string;

  @Column()
  accountStatus: string;

  @Column()
  appraisalType: string;

  @Column()
  parcelNumber: string;

  @Column({ type: 'integer' })
  units: number;

  @Column()
  detailDescription: string;

  @Column()
  detailType: string;

  @Column()
  improvementNumber: string;
}
