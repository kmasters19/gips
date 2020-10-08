import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'land_sizes'})
export class LandSizeEntity {
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

  @Column({ type: 'decimal' })
  grossAcres: number;

  @Column({ type: 'decimal' })
  landGrossSqFt: number;
}
