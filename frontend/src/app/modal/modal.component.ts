import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  lastName: string;
  firstName: string;
  cnp: string;
  birthDate: string;
  sex: string;
  phoneNumber: string;
  email: string;
  membership: string;
  medicalHistory: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    console.log('Pacientul nu a fost adaugat');
    this.dialogRef.close();
  }
}
