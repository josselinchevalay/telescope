export enum PERSISTENCE_MODE {
    EVENT_SYNC,
    EVENT_ASYNC
}

export interface IDaoFactory<T> {
    getDao(mode : PERSISTENCE_MODE) : T
}
