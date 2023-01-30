import { TodoEntity } from "../entities/todo";

export interface TodoRepository {
    addTodo(title: string): Promise<TodoEntity>;
    removeTodo(id: number): Promise<void>;
    updateTodo(changedTodo: TodoEntity): Promise<void>;
    getAllTodos(): Promise<TodoEntity[]>;
    getTodo(id: number): Promise<TodoEntity | null>;
}
