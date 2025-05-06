export default abstract class ModelAPI<T> {
    abstract getById(id: number): Promise<T>;
    abstract getAll(): Promise<T[]>;
    abstract create(user: T): Promise<T>;
    abstract update(id: number, user: T): Promise<T>;
    abstract delete(id: number): Promise<number>;
}
