import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

  ngOnInit() {}

  get getIcon() {
    switch (this.data.snackType) {
      case 'Success':
        return 'done';
      case 'Error':
        return 'dangerous';
      case 'Warning':
        return 'warning';
      case 'Info':
        return 'info';
    }
    return 0;
  }

}
