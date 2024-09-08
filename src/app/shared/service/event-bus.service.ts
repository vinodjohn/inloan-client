import {Injectable} from '@angular/core';
import {filter, map, Subject, Subscription} from "rxjs";
import {EventData} from "../model/EventData";


@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private subject$ = new Subject<EventData>();

  emit(event: EventData) {
    this.subject$.next();
  }

  on(eventName: string, action: any): Subscription {
    return this.subject$.pipe(
      filter((e: EventData) => e.name === eventName),
      map((e: EventData) => e["value"])).subscribe(action);
  }
}
