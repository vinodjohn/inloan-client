import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Person} from "../shared/model/Person";
import {StorageService} from "../shared/service/storage.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  currentPerson!: any;

  constructor(private storageService: StorageService) {
  }
  ngOnInit(): void {
    this.currentPerson = this.storageService.getPerson();
  }

}
