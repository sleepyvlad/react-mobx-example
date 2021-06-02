import { StoreState } from '../../global';
import { IRootStore } from '../RootStore';

export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
};

export interface IUsersStore {
    root: IRootStore;
    state: StoreState;
    users: Pick<User, 'id' | 'username'>[];
    fetchUsers: () => Promise<void>;
}
