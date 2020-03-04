import { TestBed } from "@angular/core/testing";

import { NavigationService } from "./navigation.service";
import { RouterTestingModule } from "@angular/router/testing";

fdescribe("NavigationService", () => {
  let servicio: NavigationService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [NavigationService],
      imports: [RouterTestingModule]
    })
  );

  beforeEach(() => {
    servicio = TestBed.get(NavigationService);
  });

  it("should be created", () => {
    expect(servicio).toBeTruthy();
  });

  it("should navigate to pins", () => {
    const navigate = spyOn((<any>servicio).router, "navigate");
    servicio.goToPins();
    expect(navigate).toHaveBeenCalledWith(["/app/pins"]);
  });

  it("should navigate to edit mode", () => {
    const navigate = spyOn((<any>servicio).router, "navigate");
    servicio.goToEditMode();
    expect(navigate).toHaveBeenCalledWith(["/app/add"]);
  });


});
