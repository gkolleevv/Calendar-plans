import { FormGroup } from '@angular/forms';

export function MinTimeValidator(
  firstControlName: string,
  secondControlName: string,
  thirdControlName: string,
  fourthControlName: string) {

  return (formGroup: FormGroup) => {
    const firstControl = formGroup.controls[firstControlName];
    const secondControl = formGroup.controls[secondControlName];
    const thirdControl = formGroup.controls[thirdControlName];
    const fourthControl = formGroup.controls[fourthControlName];

    if ((secondControl.errors && !secondControl.errors['inCorrectTime'])
     || (firstControl.errors && !firstControl.errors['inCorrectTime'])
    || (thirdControl.errors && !thirdControl.errors['inCorrectTime'])
    || (fourthControl.errors && !fourthControl.errors['inCorrectTime'])) {
      return;
    }

    const startTime = Number(firstControl.value.concat(secondControl.value));
    const endTime = Number(thirdControl.value.concat(fourthControl.value));

    if (startTime <= endTime) {
      firstControl.setErrors(null);
      secondControl.setErrors(null);
      thirdControl.setErrors(null);
      fourthControl.setErrors(null);
    } else {
      firstControl.setErrors({inCorrectTime: true});
      secondControl.setErrors({inCorrectTime: true});
      thirdControl.setErrors({inCorrectTime: true});
      fourthControl.setErrors({inCorrectTime: true});
    }
  }
}
