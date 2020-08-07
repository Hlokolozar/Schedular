import { Component, OnInit, Inject } from "@angular/core";
import { ServicesService } from "../services/services.service";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Todo } from "../interfaces/Todo";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"],
})
export class TodoComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private api: ServicesService
  ) {}

  todo: Todo[];
  newItem;
  movies = [
    "Episode I - The Phantom Menace",
    "Episode II - Attack of the Clones",
    "Episode III - Revenge of the Sith",
    "Episode IV - A New Hope",
    "Episode V - The Empire Strikes Back",
    "Episode VI - Return of the Jedi",
    "Episode VII - The Force Awakens",
    "Episode VIII - The Last Jedi",
    "Episode IX – The Rise of Skywalker",
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
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
