import {Group} from './group';
import {Roles} from './roles';

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    groups: Group[];
    roles: Roles[];
}