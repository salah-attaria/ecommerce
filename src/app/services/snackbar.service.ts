import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}
  openSnackBar(message: string, snackType: any) {
    const _snackType: any = snackType !== undefined ? snackType : 'Success';
    const messageType =
      snackType == 'Info'
        ? 'blue-snackbar'
        : snackType == 'Success'
        ? 'green-snackbar'
        : snackType == 'Warning'
        ? 'orange-snackbar'
        : 'red-snackbar';
    this.snackbar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [messageType],
      data: { message: message, snackType: _snackType },
    });
  }
}
