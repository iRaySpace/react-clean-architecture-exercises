import { TodoEntity } from "./todo";

test('todo entity', () => {
    const buyTodo = new TodoEntity(0, "Buy");
    expect(buyTodo.getTitle()).toBe("Buy");
});

test('todo entity not 1', () => {
    const sellTodo = new TodoEntity(1, "Sell");
    expect(sellTodo.getId()).not.toBe(0);
});
