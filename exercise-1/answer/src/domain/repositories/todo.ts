import { TodoEntity } from "../entities/todo";

export interface TodoRepository {
    addTask(title: string): Promise<TodoEntity>;
    removeTask(id: number): Promise<void>;
    updateTask(id: number, todo: TodoEntity): Promise<TodoEntity>;
    getAllTasks(): Promise<TodoEntity[]>;
    getTask(id: number): Promise<TodoEntity>;
}
