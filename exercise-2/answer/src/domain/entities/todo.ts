export class TodoEntity {
    private id: number;
    private title: string;

    constructor(id: number, title: string) {
        this.id = id;
        this.title = title;
    }

    getId(): number {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    replaceWith(todo: TodoEntity) {
        this.title = todo.title;
    }

    static fromJSON({ id, title }: any): TodoEntity {
        return new TodoEntity(id, title);
    }

    static toJSON(todo: TodoEntity) {
        return {
            id: todo.id,
            title: todo.title,
        };
    }
}
