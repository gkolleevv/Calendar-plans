import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MinTimeValidator} from "../validators/min-time-validator";
import {hourMinutesType} from "../calendar.model";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls:['dialog.component.scss']
})
export class DialogComponent implements OnInit{
  form: FormGroup = {} as FormGroup;
  hours: string[] = [
    '00', '01', '02','03','04','05','06','07','08','09','10','11','12','13','14','15',
    '16','17','18','19','20','21', '22','23'
  ];
  minutes: string[] = [
    '00', '15', '30', '45'
  ];
  selectedStartHours = [...this.hours];
  selectedStartMinutes = [...this.minutes];
  selectedEndHours = [...this.hours];
  selectedEndMinutes = [...this.minutes];
  itemsAppearance = [
    'Selected day',
    'Every selected week day',
    'Whole month',
    'Whole week'
  ];
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  onCloseDialog(): void {
    this.dialogRef.close(null);
  }

  save(form: FormGroup) {
    this.dialogRef.close(form.value);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      startHour: new FormControl<string>(this.selectedStartHours[1], Validators.required),
      startMinutes: new FormControl<string>(this.selectedStartMinutes[0], [Validators.required]),
      endHour: new FormControl<string>(this.selectedEndHours[2], [Validators.required]),
      endMinutes: new FormControl<string>(this.selectedEndMinutes[0], [Validators.required]),
      appearance: new FormControl<string>(this.itemsAppearance[0]),
      plan: new FormControl<string>('', [Validators.required])
    }, {
      validators: [
        MinTimeValidator('startHour', 'startMinutes', 'endHour', 'endMinutes'),
      ]
    });
    if (this.data && this.data?.weekDay) {
      this.itemsAppearance[1] = `Every ${this.data?.weekDay} for 4 weeks`;
    } else {
      this.form.patchValue(this.data);
    }
  }

  onKey(event: any, type: hourMinutesType) {
    switch (type) {
      case 'startHour':
        this.selectedStartHours = this.search(event.target.value, 'hour');
        break;
      case 'endHour':
        this.selectedEndHours = this.search(event.target.value, 'hour');
        break;
      case 'startMinutes':
        this.selectedStartMinutes = this.search(event.target.value);
        break;
      case 'endMinutes':
        this.selectedEndMinutes = this.search(event.target.value);
    }

  }

  search(value: string, type?: string) {
    let filter = value.toLowerCase();
    if (type === 'hour') {
      return this.hours.filter(option => option.toLowerCase().includes(filter));
    }
    return this.minutes.filter(option => option.toLowerCase().includes(filter));
  }
}

