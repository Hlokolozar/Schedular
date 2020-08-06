import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"],
})
export class TodoComponent implements OnInit {
  constructor() {}
  todo = [
    {
      title: "Buy Milk",
      description: "Buy 6pack of Milk at Shoprite",
      status: "done",
      dueDate: "01-09-2021",
    },
    {
      title: "Take car to Service",
      description: "Take Car to Service by 09:00am",
      status: "done",
      dueDate: "15-08-2021",
    },
    {
      title: "Cut Lawn",
      description: "Buy 6pack of Milk at Shoprite",
      status: "done",
      dueDate: "01-09-2021",
    },
  ];

  public addTodo(name) {
    var newItem = {
      title: name,
      description: "Not Set",
      status: "Not Set",
      dueDate: "Not Set",
    };
    this.todo.push(newItem);
  }
  ngOnInit() {}
}
