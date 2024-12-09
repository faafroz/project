import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Joke } from "./joke.model";

@Injectable({ providedIn: "root" })
export class JokeService {
  private joke: Joke = { type: "", setup: "", punchline: "", id: 0 };
  private jokeUpdated = new Subject<Joke>();

  constructor(private http: HttpClient) {}

  getJoke() {
    // Use the `type=twopart` query parameter to ensure only two-part jokes are fetched
    this.http.get<any>("https://jokeapi.dev/joke/Any?type=twoparv2t").subscribe((payLoad) => {
      this.joke = {
        type: payLoad.type,
        setup: payLoad.setup,
        punchline: payLoad.delivery,
        id: payLoad.id || 0, // Fallback for ID if the API doesn't provide it
      };
      this.jokeUpdated.next(this.joke);
    });
  }

  getUpdatedJoke() {
    return this.jokeUpdated.asObservable();
  }
}
