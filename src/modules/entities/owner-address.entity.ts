import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'owner_addresses' })
export class OwnerAddressEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  clientId: string;

  @Column()
  accountNumber: string;

  @Column({ nullable: true })
  accountType: string;

  @Column({ nullable: true })
  appraisalType: string;

  @Column({ nullable: true })
  accountStatus: string;

  @Column({ nullable: true })
  parcelNumber: string;

  @Column({ nullable: true })
  address1: string;

  @Column({ nullable: true })
  address2: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  zip: string;

  @Column({ nullable: true })
  name1: string;

  @Column({ nullable: true })
  name2: string;
}
