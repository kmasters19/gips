import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'value_details' })
export class ValueDetailEntity {
  @PrimaryGeneratedColumn('uuid')
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
  abstractCode: string;

  @Column()
  abstractDescription: string;

  @Column({ type: 'decimal' })
  actualValue: number;

  @Column({ type: 'decimal' })
  assessedValue: number;

  @Column({ type: 'decimal' })
  netAcres: number;

  @Column({ type: 'decimal' })
  landNetSqFt: number;

  @Column()
  taxDistrict: string;
}
