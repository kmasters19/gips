import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'owner_addresses' })
export class OwnerAddressEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  clientId: string;

  @Column()
  accountNumber: string;

  @Column()
  accountType: string;

  @Column()
  appraisalType: string;

  @Column()
  accountStatus: string;

  @Column()
  parcelNumber: string;

  @Column()
  address1: string;

  @Column()
  address2: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip: string;

  @Column()
  name1: string;

  @Column()
  name2: string;
}
