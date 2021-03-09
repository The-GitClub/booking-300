import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-staff-or-manager',
  templateUrl: './staff-or-manager.component.html',
  styleUrls: ['./staff-or-manager.component.css']
})
export class StaffOrManagerComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
