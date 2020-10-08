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

  @Column({ type: 'integer'})
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

  @Column({ type: 'integer'})
  actualValue: number;

  @Column({ type: 'integer'})
  assessedValue: number;

  @Column({ type: 'integer'})
  millLevy: number;

  @Column({ type: 'integer'})
  taxYear: number;

  @Column({ type: 'decimal' })
  totalTax: number;
}
