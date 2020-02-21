import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsComponent } from './actions.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { PinsService } from '../pins/pins.service';

class MatBottomSheetRefStub {
  dismiss() { };
}

class PinsServiceStub {
  resolveActionObserver() { }
}

fdescribe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionsComponent],
      providers: [
        { provide: MatBottomSheetRef, useClass: MatBottomSheetRefStub },
        { provide: PinsService, useClass: PinsServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call openLink', () => {
    const mouseEvent = new MouseEvent('click');
    // const eventCall = spyOn(event, 'preventDefault').and.callFake(() => { });
    const dismissCall = spyOn((<any>component).bottomSheetRef, 'dismiss');
    const resolveActionObserverCall = spyOn((<any>component).pinsService, 'resolveActionObserver');

    component.openLink(mouseEvent, '');
    // expect(eventCall).toHaveBeenCalled();
    expect(dismissCall).toHaveBeenCalled();
    expect(resolveActionObserverCall).toHaveBeenCalled();


  })
});
