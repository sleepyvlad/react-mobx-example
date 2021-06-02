import React, { useContext } from 'react';
import RootStore from './RootStore';
import { createContext, ReactNode } from 'react';
import { IRootStore } from './RootStore.types';

let store: IRootStore;

const StoreContext = createContext<RootStore | undefined>(undefined);

export function RootStoreProvider({ children }: { children: ReactNode }) {
    const root = store ?? new RootStore();

    return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
}

// create the hook
export function useRootStore() {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useRootStore must be used within RootStoreProvider');
    }

    return context;
}
