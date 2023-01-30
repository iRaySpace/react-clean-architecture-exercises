import { TodoEntity } from "../domain/entities/todo";
import { TodoRepository } from "../domain/repositories/todo";

let _id = 0;

export class TodoDataRepository implements TodoRepository {
    private todos: TodoEntity[] = [];

    addTodo(title: string): Promise<TodoEntity> {
        const entity = new TodoEntity(_id, title);
        this.todos.push(entity);
        _id = _id + 1;
        return Promise.resolve(entity);
    }

    removeTodo(id: number): Promise<void> {
        const filteredTodos = this.todos.filter((todo) => todo.getId() !== id);
        this.todos = filteredTodos;
        return Promise.resolve();
    }

    updateTodo(changedTodo: TodoEntity): Promise<void> {
        const oldTodo = this.todos.find((todo) => todo.getId() === changedTodo.getId());
        if (oldTodo) {
            oldTodo.replaceWith(changedTodo);
        }
        return Promise.resolve();
    }

    getAllTodos(): Promise<TodoEntity[]> {
        return Promise.resolve(this.todos);
    }

    getTodo(id: number): Promise<TodoEntity | null> {
        const existingTodo = this.todos.find((todo) => todo.getId() === id);
        return existingTodo ? Promise.resolve(existingTodo) : Promise.resolve(null);
    }

    reset(): Promise<void> {
        this.todos = [];
        _id = 0;
        return Promise.resolve();
    }
}