import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

    constructor( public dialogRef: MatDialogRef<ModalComponent>,
                 @Inject(MAT_DIALOG_DATA) protected modalData: any,)
    {
        console.log(modalData);
    }

    ngOnInit() { }

    actionFunction() {
        this.closeModal();
    }

    closeModal() {
        this.dialogRef.close();
    }

}
