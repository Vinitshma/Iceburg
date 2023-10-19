import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let form: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [ReactiveFormsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    form = component.signupForm;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form', () => {
    expect(form.valid).toBeTruthy();
  });

  it('should require a required field', () => {
    const field = form.get('fieldName');
    field?.setValue(''); // Set an empty value to trigger the required validator
    expect(field?.hasError('required')).toBeTruthy();
  });

  it('should validate a minimum length for a field', () => {
    const field = form.get('fieldName');
    field?.setValue('short'); // Set a value that is shorter than the required minimum length
    expect(field?.hasError('minlength')).toBeTruthy();
  });

  // it('should submit the form when valid', () => {
  //   spyOn(component, 'onSubmit'); // Spy on the onSubmit method
  //   const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    
  //   // Fill in the form fields with valid data
  //   form.patchValue({
  //     fieldName: 'Valid Value',
  //   });

  //   submitButton.click(); // Trigger form submission

  //   expect(component.onSubmit).toHaveBeenCalled(); // Check if onSubmit was called
  //   expect(form.valid).toBeTruthy(); // Check if the form is still valid
  // });

});
