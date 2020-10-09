import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../entities/account.entity';
import { ImprovementEntity } from '../entities/improvement.entity';
import { ImprovementDetailEntity } from '../entities/improvement-detail.entity';
import { LandSizeEntity } from '../entities/land-size.entity';
import { LegalDescriptionEntity } from '../entities/legal-description.entity';
import { OwnerAddressEntity } from '../entities/owner-address.entity';
import { ValueDetailEntity } from '../entities/value-detail.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountEntity,
      ImprovementEntity,
      ImprovementDetailEntity,
      LandSizeEntity,
      LegalDescriptionEntity,
      OwnerAddressEntity,
      ValueDetailEntity
    ]),
    UsersModule
  ],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService]
})
export class SearchModule {}
