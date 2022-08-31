import { CommentDto } from './../../dto/comment.dto';
import { CommentEntity } from './../../DAL/entities/comment.entity';
import { TargetDto } from './../../dto/target.dto';
import { TargetEntity } from './../../DAL/entities/target.entity';
import { ClientInfoDto } from './../../dto/client-info.dto';
import { ClientInfoEntity } from './../../DAL/entities/client-info.entity';

export class MapperUtil {
    static mapClientInfo(info: ClientInfoEntity[]): ClientInfoDto[] {
        return info.map(item => {
            const result = new ClientInfoDto()
            result.id = item.id;
            result.phoneNumber = item.phoneNumber;
            result.name = item.name;
            result.email = item.email;
            result.birthDay = item.birthDay;
            result.contraindications = item.contraindications;
            result.updateAt = item.updateAt;
            result.createAt = item.createdAt;
            result.status = item.status;
            return result;
        })
    }

    static mapTarget(targets: TargetEntity[]): TargetDto[] {
        return targets.map(item => {
            const result = new TargetDto();

            result.id = item.id;
            result.desire = item.desire;
            result.status = item.status;
            result.createdAt = item.createdAt;

            return result;
        })
    }

    static mapComment(comments: CommentEntity[]): CommentDto[] {
        return comments.map(item => {
            const result = new CommentDto();

            result.id = item.id;
            result.content = item.content;
            result.createdAt = item.createdAt;
            result.commentType = item.commentType;
            return result;
        })
    }
}