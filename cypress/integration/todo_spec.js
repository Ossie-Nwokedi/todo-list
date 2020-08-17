describe("Todo list", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Starts with an empty todo list", () => {
    cy.contains("No tasks for today!");
    cy.contains("Put your feet up and relax");
  });

  it("Adds a todo", () => {
    const todo = "Buy milk";
    cy.addTodo(todo);

    cy.get("input[name='todoItem']").should("contain.value", todo);
  });

  it("Adds two todos and deletes the first", () => {
    cy.addTodo("Buy milk");
    cy.addTodo("Feed the cat");

    cy.get('[data-testid="delete-button"]').eq(1).click();

    cy.get("[data-testid='todo-row']").should("have.length", 1);
    cy.get("input[name='todoItem']").should("contain.value", "Feed the cat");
  });

  it("Marks a todo as complete", () => {
    cy.addTodo("Buy milk");

    // TODO: Figure out how to target the checkbox in a todo row
  });
});
