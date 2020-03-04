import { TestBed, getTestBed } from "@angular/core/testing";

import { ApiService } from "./api.service";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { environment } from "src/environments/environment";
import { HttpHeaders } from "@angular/common/http";

fdescribe("ApiService", () => {
  let servicio: ApiService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [HttpClientTestingModule]
    })
  );

  beforeEach(() => {
    injector = getTestBed();
    servicio = TestBed.get(ApiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterAll(() => {
    injector = null;
    servicio = null;
    httpMock = null;
  });

  it("should be created", () => {
    expect(servicio).toBeTruthy();
  });

  describe("GET", () => {
    it("should execute GET", () => {
      const result = "testing";
      servicio.get("/test").subscribe(response => {
        expect(response).toBe(result);
      });
      const req = httpMock.expectOne(environment.apiEndpoint + "/test");
      // console.log(req);
      expect(req.request.method).toBe("GET");
      req.flush(result);
    });

    it("should execute GET with headers", () => {
      const result = "testing";
      const headers = new HttpHeaders().set("platzi-headers", "my-header");
      servicio.get("/test", headers).subscribe(response => {
        expect(response).toBe(result);
      });
      const req = httpMock.expectOne(environment.apiEndpoint + "/test");
      expect(req.request.headers.get("platzi-headers")).toBe("my-header");
      expect(req.request.method).toBe("GET");
      req.flush(result);
    });

    describe("POST", () => {
      it("should execute POST with headers", () => {
        const result = "testing";
        servicio.post("/test", {}).subscribe(response => {
          expect(response).toBe(result);
        });
        const req = httpMock.expectOne(environment.apiEndpoint + "/test");
        expect(req.request.method).toBe("POST");
        req.flush(result);
      });
    });

    describe("PUT", () => {
      it("should execute PUT with headers", () => {
        const result = "testing";
        servicio.put("/test", {}).subscribe((response: any) => {
          expect(response).toBe(result);
        });
        const req = httpMock.expectOne(environment.apiEndpoint + "/test");
        expect(req.request.method).toBe("PUT");
        req.flush(result);
      });
    });

    describe("DELETE", () => {
      it("should execute Delete with headers", () => {
        const result = "testing";
        servicio.delete("/test", {}).subscribe((response: any) => {
          expect(response).toBe(result);
        });
        const req = httpMock.expectOne(environment.apiEndpoint + "/test");
        expect(req.request.method).toBe("DELETE");
        req.flush(result);
      });
    });


  });
});
