import { Component, OnInit } from "@angular/core";
import { ServicesService } from "../services/services.service";
import { identifierModuleUrl } from "@angular/compiler";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"],
})
export class TodoComponent implements OnInit {
  constructor(private api: ServicesService) {}
  todo = [];
  newItem;

  public addTodo(title, description, dueDate) {
    var id = this.todo.length + 1;
    const newItem = {
      id: id,
      title: title,
      description: description,
      status: "New",
      dueDate: dueDate,
    };
    this.todo.push(newItem);
    this.addItem(newItem);
  }
  ngOnInit() {
    this.getTodoItems();
  }

  public getTodoItems = () => {
    this.api.getItems().subscribe(
      (data) => {
        this.todo = data;
        console.log(this.todo);
      },
      (error) => {
        console.log(error.error);
      }
    );
  };

  public addItem = (item) => {
    this.api.addItem(item).subscribe(
      () => {
        console.log("Added succesfully");
      },
      (error) => {
        console.log(error);
      }
    );
  };

  public deleteItem(item) {
    this.todo = this.todo.filter((t) => t.title !== item.title);
  }
}
