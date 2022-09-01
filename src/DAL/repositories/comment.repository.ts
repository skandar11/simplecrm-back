import { EntityRepository } from '@mikro-orm/postgresql';

import { CommentEntity } from './../entities/comment.entity';

export class CommentRepository extends EntityRepository<CommentEntity>{
    public async getUserTargetComments(userId: string, targetId: string): Promise<CommentEntity[]> {
        return await this.find({ target: { id: targetId, clientInfo: { user: { createdBy: userId } } } });
    }
}