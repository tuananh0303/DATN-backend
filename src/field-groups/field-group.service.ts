import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IFieldGroupService } from './ifield-group.service';
import { UUID } from 'crypto';
import { FieldGroup } from './field-group.entity';
import { DataSource, EntityManager, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateManyFieldGroupsDto } from './dtos/request/craete-many-field-groups.dto';
import { FieldService } from 'src/fields/field.service';
import { FacilityService } from 'src/facilities/facility.service';
import { CreateFieldGroupDto } from './dtos/request/create-field-group.dto';
import { Sport } from 'src/sports/sport.entity';
import { Facility } from 'src/facilities/facility.entity';
import { UpdateFieldGroupDto } from './dtos/request/update-field-group.dto';
import { SportService } from 'src/sports/sport.service';

@Injectable()
export class FieldGroupService implements IFieldGroupService {
  constructor(
    /**
     * inject FieldGroupRepository
     */
    @InjectRepository(FieldGroup)
    private readonly fieldGroupRepository: Repository<FieldGroup>,
    /**
     * inject FieldService
     */
    @Inject(forwardRef(() => FieldService))
    private readonly fieldService: FieldService,
    /**
     * inject FacilityService
     */
    @Inject(forwardRef(() => FacilityService))
    private readonly facilityService: FacilityService,
    /**
     * inject DataSource
     */
    private readonly dataSource: DataSource,
    /**
     * inject SportService
     */
    private readonly sportService: SportService,
  ) {}

  public async findOneByIdAndOwnerId(
    fieldGroupId: UUID,
    ownerId: UUID,
  ): Promise<FieldGroup> {
    return await this.fieldGroupRepository
      .findOneOrFail({
        where: {
          id: fieldGroupId,
          facility: {
            owner: {
              id: ownerId,
            },
          },
        },
      })
      .catch(() => {
        throw new NotFoundException(
          `Not found field group with id: ${fieldGroupId} of owner: ${ownerId} `,
        );
      });
  }

  public async createMany(
    createManyFieldGroupsDto: CreateManyFieldGroupsDto,
    facilityId: UUID,
    ownerId: UUID,
  ): Promise<{ message: string }> {
    const facility = await this.facilityService.findOneByIdAndOwnerId(
      facilityId,
      ownerId,
    );

    await this.dataSource.transaction(async (manager) => {
      for (const fieldGroup of createManyFieldGroupsDto.fieldGroups) {
        await this.createWithTransaction(fieldGroup, facility, manager);
      }
    });

    return {
      message: 'Create many field groups successful',
    };
  }

  public async createWithTransaction(
    createFieldGroupDto: CreateFieldGroupDto,
    facility: Facility,
    manager: EntityManager,
  ): Promise<FieldGroup> {
    // get sports
    const sports = await manager.find(Sport, {
      where: {
        id: In(createFieldGroupDto.sportIds),
      },
    });

    const fieldGroup = manager.create(FieldGroup, {
      ...createFieldGroupDto,
      facility,
      sports,
    });

    await manager.save(fieldGroup);

    for (const field of createFieldGroupDto.fields) {
      await this.fieldService.createWithTransaction(field, fieldGroup, manager);
    }

    return fieldGroup;
  }

  public async update(
    updateFieldGroupDto: UpdateFieldGroupDto,
    fieldGroupId: UUID,
    ownerId: UUID,
  ): Promise<{ message: string }> {
    const fieldGroup = await this.findOneByIdAndOwnerId(fieldGroupId, ownerId);

    // update field group
    if (updateFieldGroupDto.name) fieldGroup.name = updateFieldGroupDto.name;

    if (updateFieldGroupDto.dimension)
      fieldGroup.dimension = updateFieldGroupDto.dimension;

    if (updateFieldGroupDto.surface)
      fieldGroup.surface = updateFieldGroupDto.surface;

    if (updateFieldGroupDto.basePrice)
      fieldGroup.basePrice = updateFieldGroupDto.basePrice;

    if (updateFieldGroupDto.peakEndTime1)
      fieldGroup.peakEndTime1 = updateFieldGroupDto.peakEndTime1;

    if (updateFieldGroupDto.peakStartTime1)
      fieldGroup.peakStartTime1 = updateFieldGroupDto.peakStartTime1;

    if (updateFieldGroupDto.priceIncrease1)
      fieldGroup.priceIncrease1 = updateFieldGroupDto.priceIncrease1;

    if (updateFieldGroupDto.peakEndTime2)
      fieldGroup.peakEndTime2 = updateFieldGroupDto.peakEndTime2;

    if (updateFieldGroupDto.peakStartTime2)
      fieldGroup.peakStartTime2 = updateFieldGroupDto.peakStartTime2;

    if (updateFieldGroupDto.priceIncrease2)
      fieldGroup.priceIncrease2 = updateFieldGroupDto.priceIncrease2;

    if (updateFieldGroupDto.peakEndTime3)
      fieldGroup.peakEndTime3 = updateFieldGroupDto.peakEndTime3;

    if (updateFieldGroupDto.peakStartTime3)
      fieldGroup.peakStartTime3 = updateFieldGroupDto.peakStartTime3;

    if (updateFieldGroupDto.priceIncrease3)
      fieldGroup.priceIncrease3 = updateFieldGroupDto.priceIncrease3;

    if (updateFieldGroupDto.sportIds) {
      const sports = await this.sportService.findManyByIds(
        updateFieldGroupDto.sportIds,
      );

      fieldGroup.sports = sports;
    }

    try {
      await this.fieldGroupRepository.save(fieldGroup);
    } catch {
      throw new BadRequestException(
        'An error occurred when update field group',
      );
    }

    return {
      message: 'Update field group successful',
    };
  }

  public async delete(
    fieldGroupId: UUID,
    ownerId: UUID,
  ): Promise<{ message: string }> {
    const fieldGroup = await this.findOneByIdAndOwnerId(fieldGroupId, ownerId);

    try {
      await this.fieldGroupRepository.remove(fieldGroup);
    } catch {
      throw new BadRequestException(
        'An error occurred when delete field group',
      );
    }

    return {
      message: 'Delete field group successful',
    };
  }

  public async getByFacilityId(facilityId: UUID): Promise<FieldGroup[]> {
    return await this.fieldGroupRepository.find({
      relations: {
        fields: true,
        sports: true,
      },
      where: {
        facility: {
          id: facilityId,
        },
      },
    });
  }
}
