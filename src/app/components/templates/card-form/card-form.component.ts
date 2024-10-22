import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent {

  @Input() title: string = ''; 
  @Input() formTitle: string = '';    
  @Output() submitForm = new EventEmitter<any>();

  onFormSubmit(formData: any): void {
    this.submitForm.emit(formData);
  }
}