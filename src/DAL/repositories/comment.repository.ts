import { EntityRepository } from '@mikro-orm/postgresql';

import { CommentEntity } from './../entities/comment.entity';

export class CommentRepository extends EntityRepository<CommentEntity>{ }