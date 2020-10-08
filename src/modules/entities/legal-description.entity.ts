import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'legal_descriptions' })
export class LegalDescriptionEntity {
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
  description: string;
}
