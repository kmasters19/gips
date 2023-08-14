import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'accounts' })
export class AccountEntity {
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
  accountType: string;

  @Column()
  taxDistrict: string;

  @Column()
  parcelNumber: string;

  @Column()
  preDir: string;

  @Column()
  propertyCity: string;

  @Column()
  streetName: string;

  @Column()
  streetNumber: string;

  @Column()
  streetType: string;

  @Column({ type: 'integer', nullable: true })
  actualValue: number;

  @Column({ type: 'integer', nullable: true })
  assessedValue: number;

  @Column({ type: 'decimal', nullable: true })
  millLevy: number;

  @Column({ type: 'integer', nullable: true })
  taxYear: number;

  @Column({ type: 'decimal', nullable: true })
  totalTax: number;
}
