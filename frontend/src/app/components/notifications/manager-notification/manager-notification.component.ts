import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-manager-notification",
  templateUrl: "./manager-notification.component.html",
  styleUrls: ["./manager-notification.component.css"],
})
export class ManagerNotificationComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  
  closeDialog() {
    this.dialog.closeAll();
  }
}
