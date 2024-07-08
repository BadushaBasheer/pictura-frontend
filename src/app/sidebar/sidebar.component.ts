import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PopupComponent} from "./popup/popup.component";
import {ModalComponent} from "../components/modal/modal.component";

@Component({
  selector: 'app-sample',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

    constructor(private dialog: MatDialog) {}

    dropDown() {
        this.dialog.open(PopupComponent, {
            panelClass: 'custom-dialog-container',
            position: {left:'3px', bottom: '85px'}
        });
    }
    openBar() {
        const sidebar = document.querySelector('.sidebar') as HTMLElement;
        if (sidebar) {
            sidebar.classList.toggle('left-[-300px]');
        }
    }


    modalOpen() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        this.dialog.open(ModalComponent, dialogConfig);
    }
}
