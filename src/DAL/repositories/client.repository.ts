import { EntityRepository } from '@mikro-orm/postgresql';

import { ClientInfoEntity } from '../entities/client-info.entity';

export class ClientInfoRepository extends EntityRepository<ClientInfoEntity>{ }