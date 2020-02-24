import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PinsComponent } from "./pins.component";
import { RepositoryService } from "src/app/services/repository.service";
import { MatSnackBar } from "@angular/material";
import { PinsService } from "./pins.service";
import { ReactiveFormsModule } from "@angular/forms";
import { Subject, of } from "rxjs";
import { PINS } from "src/app/services/mocks/pins";
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

class RepositoryServiceStub {
  observer = new Subject();

  getPins() {
    return this.observer;
  }

  resolvePins() {
    this.observer.next(JSON.parse(JSON.stringify(PINS)));
  }

  updatePin() {
    return of(true);
  }
}

class MatSnackBarStub {
  open() {}
}

class PinsServiceStub {
  observer = new Subject();
  $actionObserver = this.observer.asObservable();

  resolve(action) {
    return this.observer.next(action);
  }
}

fdescribe("PinsComponent", () => {
  let component: PinsComponent;
  let fixture: ComponentFixture<PinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinsComponent],
      providers: [
        { provide: RepositoryService, useClass: RepositoryServiceStub },
        { provide: MatSnackBar, useClass: MatSnackBarStub },
        { provide: PinsService, useClass: PinsServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("when new page is open", () => {
    const open = spyOn(window, "open");
    component.openUrl("https://google.com.co");
    expect(open).toHaveBeenCalledWith("https://google.com.co", "_blank");
  });

  it("when update progress", () => {
    component.pins = PINS;
    const pin = PINS[0];

    const updatePin = spyOn(
      (<any>component).repository,
      "updatePin"
    ).and.returnValue(of(true));
    const open = spyOn((<any>component).snackBar, "open");

    const pinService = TestBed.get(PinsService);
    pinService.resolve("save");

    let { title, author, description, percentage, tags, assets } = pin;
    expect(updatePin).toHaveBeenCalledWith(pin._id, {
      title,
      author,
      description,
      percentage,
      tags,
      assets
    });

    expect(open).toHaveBeenCalledWith("Progress updated!", "OK", {
      duration: 2000
    });
  });
});
