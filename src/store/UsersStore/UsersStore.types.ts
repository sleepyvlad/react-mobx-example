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
    users: User[];
    activeUserId: number;
    fetchUsers: () => Promise<void>;
    setActiveUser: (id: number) => void;
    activeUser: User | undefined;
}
