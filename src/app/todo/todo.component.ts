import { Component, OnInit, Inject } from "@angular/core";
import { ServicesService } from "../services/services.service";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Todo } from "../interfaces/Todo";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"],
})
export class TodoComponent implements OnInit {
  constructor(private api: ServicesService) {}

  public todo: Todo[];
  public newItem: Todo;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todo, event.previousIndex, event.currentIndex);
  }
  public addTodo(title, description, dueDate) {
    var id = this.todo.length + 1;
    const newItem = {
      id: id,
      title: title,
      description: description,
      status: "New",
      editing: false,
      dueDate: dueDate,
    };
    this.todo.push(newItem);
    this.addItem(newItem);
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
  editItem(item): void {
    item.editing = true;
  }
  doneEditing(item) {
    item.editing = false;
  }
  public deleteItem(item) {
    this.todo = this.todo.filter((t) => t.title !== item.title);
  }

  ngOnInit() {
    this.getTodoItems();
  }
}
