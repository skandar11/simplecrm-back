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
}