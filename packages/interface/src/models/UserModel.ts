import { ObjectCopier } from './ObjectCopier';

export class UserModel extends ObjectCopier {
    constructor(
        public readonly id: string = '',
        public readonly isOwnAuditBook: boolean = false
    ) {
        super();
    }
}
