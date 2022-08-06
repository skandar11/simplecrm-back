import { EntityRepository } from '@mikro-orm/postgresql';

import { TargetEntity } from './../entities/target.entity';

export class TargetRepository extends EntityRepository<TargetEntity>{ }