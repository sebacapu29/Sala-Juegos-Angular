import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPreguntasComponent } from './modal-preguntas.component';

describe('ModalPreguntasComponent', () => {
  let component: ModalPreguntasComponent;
  let fixture: ComponentFixture<ModalPreguntasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPreguntasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
