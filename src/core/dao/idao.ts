export interface IDao<T> {
    getAll() : Array<T>;
    findById(id: number): T;
    update(object: T) : T;
    remove(object: T) : void;
}