import { TodoLocalDataRepository } from "./todo_local";
import { TodoEntity } from "../domain/entities/todo";

test('add todo entity to data repository', async () => {
    const todoRepository = new TodoLocalDataRepository();
    const buyTodo = await todoRepository.addTodo("Buy");
    const addedBuyTodo = await todoRepository.getTodo(buyTodo.getId());
    expect(addedBuyTodo?.getId()).toBe(0);
    expect(addedBuyTodo?.getTitle()).toBe(buyTodo.getTitle());

    const sellTodo = await todoRepository.addTodo("Sell");
    const addedSellTodo = await todoRepository.getTodo(sellTodo.getId());
    expect(addedSellTodo?.getId()).toBe(1);
    expect(addedSellTodo?.getTitle()).toBe("Sell");

    await todoRepository.reset();
});

test('edit todo entity to data repository', async () => {
    const todoRepository = new TodoLocalDataRepository();
    const editedTodo = await todoRepository.addTodo("Buy");
    const addedTodo = await todoRepository.getTodo(editedTodo.getId());
    expect(addedTodo?.getId()).toBe(0);
    expect(addedTodo?.getTitle()).toBe("Buy");

    editedTodo.replaceWith(new TodoEntity(-1, "Sell"));
    expect(editedTodo?.getId()).toBe(0);
    expect(editedTodo?.getTitle()).toBe("Sell");

    await todoRepository.reset();
});

test('remove todo entity to data repository', async () => {
    const todoRepository = new TodoLocalDataRepository();
    const buyTodo = await todoRepository.addTodo("Buy");
    const addedBuyTodo = await todoRepository.getTodo(buyTodo.getId());
    expect(addedBuyTodo?.getId()).toBe(0);
    expect(addedBuyTodo?.getTitle()).toBe("Buy");

    const sellTodo = await todoRepository.addTodo("Sell");
    const addedSellTodo = await todoRepository.getTodo(sellTodo.getId());
    expect(addedSellTodo?.getId()).toBe(1);
    expect(addedSellTodo?.getTitle()).toBe("Sell");

    await todoRepository.removeTodo(buyTodo.getId());

    const removedTodo = await todoRepository.getTodo(0);
    expect(removedTodo).toBe(null);

    await todoRepository.reset();
});