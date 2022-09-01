import { join } from 'path';
import { path as rootPath } from 'app-root-path';

export class Constants {
    static readonly PATH_TO_STATIC_FOLDER = join(rootPath, "/public");
}