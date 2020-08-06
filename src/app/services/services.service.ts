import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ServicesService {
  private baseUrl = "https://my-json-server.typicode.com/Hlokolozar/ToDoApp/";

  constructor(private http: HttpClient) {}

  public getItems(): Observable<any> {
    return this.http.get(this.baseUrl + "todo");
  }

  public addItem(item) {
    const body = {
      title: item.title,
      description: item.description,
      status: item.status,
      dueDate: item.dueDate,
    };

    return this.http.post(this.baseUrl + "todo", body);
  }
}
