import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../entities/account.entity';
import { FindConditions, Raw, Repository } from 'typeorm';
import { ImprovementEntity } from '../entities/improvement.entity';
import { ImprovementDetailEntity } from '../entities/improvement-detail.entity';
import { LandSizeEntity } from '../entities/land-size.entity';
import { LegalDescriptionEntity } from '../entities/legal-description.entity';
import { OwnerAddressEntity } from '../entities/owner-address.entity';
import { ValueDetailEntity } from '../entities/value-detail.entity';
import { SearchRequestDto } from './dtos/search-request.dto';
import { SearchResultDto } from './dtos/search-result.dto';
import { SearchResultDetailDto } from './dtos/search-result-detail.dto';
import { AccountDetailDto } from './dtos/account-detail.dto';
import { AbstractItemDto } from './dtos/abstract-item.dto';
import { ImprovementSummaryDto } from './dtos/improvement-summary.dto';
import { ImprovementSummaryDetailDto } from './dtos/improvement-summary-detail.dto';
import { LoadAccountDto } from '../loader/dtos/load-account.dto';
import { LoadImprovementDetailsDto } from '../loader/dtos/load-improvement-detail.dto';
import { LoadImprovementsDto } from '../loader/dtos/load-improvements.dto';
import { LoadLandSizesDto } from '../loader/dtos/load-land-sizes.dto';
import { LoadLegalsDto } from '../loader/dtos/load-legals.dto';
import { LoadOwnerAddressesDto } from '../loader/dtos/load-owner-addresses.dto';
import { LoadValueDetailsDto } from '../loader/dtos/load-value-details.dto';
import * as _ from 'lodash';

@Injectable()
export class SearchService {
  // private logger = new Logger(SearchService.name);

  constructor(
    @InjectRepository(AccountEntity)
    private accountRepo: Repository<AccountEntity>,
    @InjectRepository(ImprovementEntity)
    private impRepo: Repository<ImprovementEntity>,
    @InjectRepository(ImprovementDetailEntity)
    private impDetRepo: Repository<ImprovementDetailEntity>,
    @InjectRepository(LandSizeEntity)
    private landSizeRepo: Repository<LandSizeEntity>,
    @InjectRepository(LegalDescriptionEntity)
    private legalDescRepo: Repository<LegalDescriptionEntity>,
    @InjectRepository(OwnerAddressEntity)
    private ownerAddrRepo: Repository<OwnerAddressEntity>,
    @InjectRepository(ValueDetailEntity)
    private valDetRepo: Repository<ValueDetailEntity>
  ) {}

  async search(request: SearchRequestDto) {
    const clientId = request.clientId.toLowerCase()
    const ownerAddressAccountNumbers: string[] = [];
    const accountAccountNumbers: string[] = [];

    const oaQuery = this.ownerAddrRepo.createQueryBuilder('o');
    oaQuery.where(`o.clientId ILIKE '%${clientId}%'`);

    if (request.accountNumber) {
      oaQuery.andWhere(`o.accountNumber ILIKE '%${request.accountNumber}%'`);
    }

    if (request.pin) {
      oaQuery.andWhere(`o.parcelNumber ILIKE '%${request.pin}%'`);
    }

    if (request.ownerName) {
      oaQuery.andWhere(
        `(o.name1 ILIKE '%${request.ownerName}%' OR o.name2 ILIKE '%${request.ownerName}%')`
      );
    }

    const ownerAddresses = await oaQuery
      .orderBy('o.accountNumber', 'ASC')
      .getMany();

    // this.logger.log('Owner Addresses:')
    // this.logger.log(ownerAddresses);

    for (const ownerAddress of ownerAddresses) {
      ownerAddressAccountNumbers.push(ownerAddress.accountNumber);
    }

    if (request.propertyAddress) {
      const accounts = await this.accountRepo
        .createQueryBuilder('a')
        .where(`a.clientId ilike '%${request.clientId}%'`)
        .andWhere(
          `a.streetNumber ||' '|| a.preDir ||' '|| a.streetName ||' '|| a.streetType ||' '|| a.propertyCity ILIKE '%${request.propertyAddress}%'`
        )
        .getMany();

      // this.logger.log('Accounts:')
      // this.logger.log(accounts);

      for (const account of accounts) {
        accountAccountNumbers.push(account.accountNumber);
      }
    }

    const results: SearchResultDto[] = [];
    let mergedAccountNumbers: string[] = [];

    if (request.propertyAddress) {
      mergedAccountNumbers = accountAccountNumbers;
    }
    if (request.accountNumber || request.ownerName || request.pin) {
      mergedAccountNumbers = this.uniqueArray([
        ...ownerAddressAccountNumbers,
        ...accountAccountNumbers
      ])
    }
    // this.logger.log(mergedAccountNumbers);
    for (const accountNumber of mergedAccountNumbers) {
      const ownerAddress = await this.ownerAddrRepo.findOne({ clientId, accountNumber });
      const account = await this.accountRepo.findOne({ clientId, accountNumber });
      const result = new SearchResultDto();
      result.accountNumber = accountNumber;
      result.ownerName = ownerAddress.name1;
      if (ownerAddress.name2) {
        result.ownerName = result.ownerName + '<br />' + ownerAddress.name2;
      }
      if (account) {
        result.propertyAddress = `${account.streetNumber} ${account.preDir} ${account.streetName} ${account.streetType}<br />${account.propertyCity}`;
      }
      results.push(result);
    }

    return results;
  }

  async detail(accountNumber: string, clientId: string) {
    clientId = clientId.toLowerCase()
    const ownerAccount = await this.ownerAddrRepo.findOne({
      accountNumber,
      clientId
    });
    const result = new SearchResultDetailDto();
    if (ownerAccount) {
      const accounts = await this.accountRepo.find({ clientId, accountNumber });
      const account = accounts[0];
      const abstracts = await this.valDetRepo.find({ where: { clientId, accountNumber }, order: { abstractCode: 'ASC' }});
      const legals = await this.legalDescRepo.findOne({
        clientId,
        accountNumber
      });
      const landSizes = await this.landSizeRepo.findOne({
        clientId,
        accountNumber
      });
      const improvementsList: number[] = [];

      const improvementQuery = await this.impRepo.find({
        where: {
          clientId,
          accountNumber
        },
        order: {
          improvementNumber: 'ASC'
        }
      });
      for (const improvement of improvementQuery) {
        if (improvementsList.includes(improvement.improvementNo) === false) {
          improvementsList.push(improvement.improvementNo);
        }
      }

      result.accountNumber = accountNumber;
      result.parcelNumber = account.parcelNumber || '';
      result.ownerName = ownerAccount.name1;
      if (ownerAccount.name2) {
        result.ownerName = result.ownerName + '<br />' + ownerAccount.name2;
      }
      result.mailingAddress = ownerAccount.address1;
      if (ownerAccount.address2) {
        result.mailingAddress =
          result.mailingAddress + '<br />' + ownerAccount.address2;
      }
      result.city = ownerAccount.city;
      result.state = ownerAccount.state;
      result.zip = ownerAccount.zip;
      result.legalDescription = legals?.description || '';
      result.locationAddress = `${account.streetNumber ||
        ''} ${account.preDir || ''} ${account.streetName ||
        ''} ${account.streetType || ''}`;
      result.locationCity = account.propertyCity || '';

      const accountDtos: AccountDetailDto[] = [];
      for (const acct of accounts) {
        const accountDto = new AccountDetailDto();
        accountDto.accountType = acct.accountType;
        accountDto.taxArea = acct.taxDistrict;
        accountDto.taxYear = acct.taxYear;
        accountDto.millLevy = acct.millLevy;
        accountDto.actualValue = acct.actualValue;
        accountDto.assessedValue = acct.assessedValue;
        accountDto.estimatedTax = acct.totalTax;
        accountDto.landGrossAcres = landSizes.grossAcres;
        accountDto.landGrossSqFt = landSizes.landGrossSqFt;
        accountDtos.push(accountDto);
      }
      result.accounts = _.uniqWith(accountDtos, _.isEqual);

      const abstractDtos: AbstractItemDto[] = [];
      for (const abstract of abstracts) {
        abstractDtos.push({
          abstractCode: abstract.abstractCode,
          abstractDescription: abstract.abstractDescription,
          acres: abstract.netAcres,
          sqFt: abstract.landNetSqFt
        });
      }
      result.abstractItems = abstractDtos;

      const improvements: ImprovementSummaryDto[] = [];
      if (improvementsList.length > 0) {
        for (const id of improvementsList) {
          const improvement = await this.impRepo.findOne({
            clientId,
            accountNumber,
            improvementNo: id
          });

          const improvementDto: ImprovementSummaryDto = {
            accountNumber: improvement.accountNumber,
            appraisalType: improvement.appraisalType,
            accountStatus: improvement.accountStatus,
            parcelNumber: improvement.parcelNumber || '',
            propertyType: improvement.propertyType,
            bathCount: improvement.bathCount || 0,
            bedroomCount: improvement.bedroomCount || 0,
            improvementNumber: improvement.improvementNo || 0,
            hvac: improvement.hvacType,
            exterior: improvement.exterior,
            interior: improvement.interior,
            units: improvement.units || 0,
            detailType: improvement.detailType,
            buildingId: improvement.improvementNo || 0,
            yearBuilt: improvement.builtAsYearBuilt || 0,
            description: improvement.builtAsDescription,
            sqFt: improvement.builtAsSqFt || 0,
            details: []
          };
          improvements.push(improvementDto);
        }
      }

      result.improvements = _.uniqWith(improvements, _.isEqual);

      // this.logger.log('Improvements before Detail DTO Builder:');
      // this.logger.log(result.improvements);

      const improvementDtos: ImprovementSummaryDto[] = [];
      for (const improvementDto of result.improvements) {
        const improvementDetailsQuery = await this.impDetRepo.find({
          where: {
            clientId,
            accountNumber,
            improvementNumber: improvementDto.improvementNumber
          }
        });
        const detailDtos: ImprovementSummaryDetailDto[] = [];
        for (const impDet of improvementDetailsQuery) {
          const detailDto: ImprovementSummaryDetailDto = {
            accountNumber: impDet.accountNumber,
            accountStatus: impDet.accountStatus,
            appraisalType: impDet.appraisalType,
            parcelNumber: impDet.parcelNumber,
            units: impDet.units,
            detailDescription: impDet.detailDescription,
            detailType: impDet.detailType,
            improvementNumber: impDet.improvementNumber
          };
          detailDtos.push(detailDto);
        }

        improvementDto.details = _.uniqWith(detailDtos, _.isEqual);
      }
    }
    result.improvements = _.orderBy(result.improvements, ['buildingId'], ['ASC'])
    // this.logger.log('Improvement DTOs after');
    // this.logger.log(result.improvements);
    return result;
  }

  async deleteClientAccounts(clientId: string) {
    await this.accountRepo.delete({ clientId: clientId });
  }

  async deleteClientImprovementDetails(clientId: string) {
    await this.impDetRepo.delete({ clientId });
  }

  async deleteClientImprovements(clientId: string) {
    await this.impRepo.delete({ clientId });
  }

  async deleteClientLandSizes(clientId: string) {
    await this.landSizeRepo.delete({ clientId });
  }

  async deleteClientLegals(clientId: string) {
    await this.legalDescRepo.delete({ clientId });
  }

  async deleteClientOwnerAddresses(clientId: string) {
    await this.ownerAddrRepo.delete({ clientId });
  }

  async deleteClientValueDetails(clientId: string) {
    return this.valDetRepo.delete({ clientId });
  }

  async createAccount(clientId: string, item: LoadAccountDto) {
    let entity = new AccountEntity();
    entity.clientId = clientId;
    entity.accountNumber = item.ACCOUNTNO;
    entity.accountStatus = item.ACCTSTATUSCODE;
    entity.parcelNumber = item.PARCELNO;
    entity.accountType = item.ACCTTYPE;
    entity.appraisalType = item.APPRAISALTYPE;
    entity.taxDistrict = item.DEFAULTTAXDISTRICT;
    entity.preDir = item.PREDIRECTION;
    entity.propertyCity = item.PROPERTYCITY;
    entity.streetName = item.STREETNAME;
    entity.streetNumber = item.STREETNO;
    entity.streetType = item.STREETTYPE;
    entity.actualValue = item.ACTUALVALUE;
    entity.assessedValue = item.ASSESSEDVALUE;
    entity.millLevy = item.MILLLEVY;
    entity.taxYear = item.TAXYEAR;
    entity.totalTax = item.TOTALTAXDOLLARS;
    entity = this.accountRepo.create(entity);
    await this.accountRepo.save(entity);
  }

  async createImprovementDetail(
    clientId: string,
    item: LoadImprovementDetailsDto
  ) {
    let entity = new ImprovementDetailEntity();
    entity.clientId = clientId;
    entity.accountNumber = item.ACCOUNTNO;
    entity.accountStatus = item.ACCTSTATUSCODE;
    entity.appraisalType = item.APPRAISALTYPE;
    entity.parcelNumber = item.PARCELNO;
    entity.units = item.DETAILUNITCOUNT || 0;
    entity.detailDescription = item.IMPDETAILDESCRIPTION;
    entity.detailType = item.IMPDETAILTYPE;
    entity.improvementNumber = item.IMPNO;
    entity = this.impDetRepo.create(entity);
    await this.impDetRepo.save(entity);
  }

  async createImprovement(clientId: string, item: LoadImprovementsDto) {
    let entity = new ImprovementEntity();
    entity.clientId = clientId;
    entity.accountNumber = item.ACCOUNTNO;
    entity.accountStatus = item.ACCTSTATUSCODE;
    entity.appraisalType = item.APPRAISALTYPE;
    entity.parcelNumber = item.PARCELNO;
    entity.improvementNo = item.IMPNO || 0;
    entity.improvementNumber = '';
    entity.propertyType = item.PROPERTYTYPE;
    entity.bathCount = item.BATHCOUNT || 0;
    entity.bedroomCount = item.BEDROOMCOUNT || 0;
    entity.builtAsDescription = item.BLTASDESCRIPTION;
    entity.builtAsSqFt = item.BLTASSF;
    entity.builtAsYearBuilt = item.BLTASYEARBUILT;
    entity.hvacType = item.HVACTYPE;
    entity.exterior = item.IMPEXTERIOR;
    entity.interior = item.IMPINTERIOR;
    entity.units = item.DETAILUNITCOUNT || 0;
    entity.detailType = item.IMPDETAILTYPE;
    entity = this.impRepo.create(entity);
    await this.impRepo.save(entity);
  }

  async createLandSize(clientId: string, item: LoadLandSizesDto) {
    let entity = new LandSizeEntity();
    entity.clientId = clientId;
    entity.accountNumber = item.ACCOUNTNO;
    entity.accountStatus = item.ACCTSTATUSCODE;
    entity.appraisalType = item.APPRAISALTYPE;
    entity.parcelNumber = item.PARCELNO;
    entity.grossAcres = item.LANDGROSSACRES || 0;
    entity.landGrossSqFt = item.LANDGROSSSF || 0;
    entity = this.landSizeRepo.create(entity);
    await this.landSizeRepo.save(entity);
  }

  async createLegal(clientId: string, item: LoadLegalsDto) {
    let entity = new LegalDescriptionEntity();
    entity.clientId = clientId;
    entity.accountNumber = item.ACCOUNTNO;
    entity.accountStatus = item.ACCTSTATUSCODE;
    entity.appraisalType = item.APPRAISALTYPE;
    entity.description = item.LEGAL;
    entity = this.legalDescRepo.create(entity);
    await this.legalDescRepo.save(entity);
  }

  async createOwnerAddress(clientId: string, item: LoadOwnerAddressesDto) {
    let entity = new OwnerAddressEntity();
    entity.clientId = clientId;
    entity.accountNumber = item.ACCOUNTNO;
    entity.accountStatus = item.ACCTSTATUSCODE;
    entity.appraisalType = item.APPRAISALTYPE;
    entity.parcelNumber = item.PARCELNO;
    entity.address1 = item.ADDRESS1;
    entity.address2 = item.ADDRESS2;
    entity.city = item.CITY;
    entity.state = item.STATECODE;
    entity.zip = item.ZIPCODE;
    entity.name1 = item.NAME1;
    entity.name2 = item.NAME2;
    entity = this.ownerAddrRepo.create(entity);
    await this.ownerAddrRepo.save(entity);
  }

  async createValueDetail(clientId: string, item: LoadValueDetailsDto) {
    let entity = new ValueDetailEntity();
    entity.clientId = clientId;
    entity.accountNumber = item.ACCOUNTNO;
    entity.accountStatus = item.ACCTSTATUSCODE;
    entity.appraisalType = item.APPRAISALTYPE;
    entity.parcelNumber = item.PARCELNO;
    entity.abstractCode = item.ABSTRACTCODE;
    entity.abstractDescription = item.ABSTRACTDESCRIPTION;
    entity.actualValue = item.ACTUALVALUE;
    entity.assessedValue = item.ASSESSEDVALUE;
    entity.netAcres = item.LANDACRES;
    entity.landNetSqFt = item.LANDSF;
    entity.taxDistrict = item.TAXDISTRICT;
    entity = this.valDetRepo.create(entity);
    await this.valDetRepo.save(entity);
  }

  private uniqueArray(src: string[]): string[] {
    const a = src.concat();
    for (let i = 0; i < a.length; i++) {
      for (let j = i + 1; j < a.length; j++) {
        if (a[i] === a[j]) {
          a.splice(j--, 1);
        }
      }
    }
    return a;
  }
}
