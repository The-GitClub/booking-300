import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-staff-notification',
  templateUrl: './staff-notification.component.html',
  styleUrls: ['./staff-notification.component.css']
})
export class StaffNotificationComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {}
  
  closeDialog() {
    this.dialog.closeAll();
  }
}
