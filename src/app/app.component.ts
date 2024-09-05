import {Component, WritableSignal} from '@angular/core';
import {BooleanInput} from "@angular/cdk/coercion";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'loan-portal';
  opened: BooleanInput | WritableSignal<BooleanInput>;
}
