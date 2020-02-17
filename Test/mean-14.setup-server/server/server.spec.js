const express = require("express");
const logger = require("morgan");
const http = require("http");
const PinsRouter = require("./routes/pins");
const Pins = require("./models/Pins");
const request = require("request");
const app = express();
var requestPromise = require("request-promise-native");
var axios = require("axios");

app.use(logger("dev"));
app.use(express.json());
app.use("/api", PinsRouter.router);
app.set("port", 3000);

describe("Testing Router", () => {
  let server;

  beforeAll(() => {
    server = http.createServer(app);
    server.listen(3000);
  });
  afterAll(() => {
    server.close();
  });

  describe("GET", () => {
    it("200 and find pin", done => {
      const data = [{ id: 1 }];
      spyOn(Pins, "find").and.callFake(callFake => {
        callFake(false, data);
      });

      request.get("http://localhost:3000/api", (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual([{ id: 1 }]);
        done();
      });
    });

    it("500", done => {
      const data = [{ id: 1 }];
      spyOn(Pins, "find").and.callFake(callFake => {
        callFake(true, data);
      });

      request.get("http://localhost:3000/api", (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      });
    });

    it("200 con parametro", done => {
      spyOn(Pins, "findById").and.callFake((id, callFake) => {
        callFake(false, id);
      });

      request.get("http://localhost:3000/api/1", (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual("1");
        done();
      });
    });

    it("500 con parametro", done => {
      spyOn(Pins, "findById").and.callFake((id, callFake) => {
        callFake(true, id);
      });
      request.get("http://localhost:3000/api/1", (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      });
    });
  });

  /**
   * Pruebas Post
   *
   */

  describe("Post", () => {
    it("200", done => {
      const post = [
        {
          title: "Platzi",
          author: "Platzio",
          description: "Platzi rules",
          percentage: 0,
          tags: [],
          assets: []
        }
      ];
      spyOn(Pins, "create").and.callFake((pin, callback) => {
        callback(false, {});
      });

      spyOn(requestPromise, "get").and.returnValue(
        Promise.resolve(
          '<title>Platzi</title><meta name="description" content="Platzi rules">'
        )
      );

      const assets = [{ url: "http://platzi.com" }];

      axios
        .post("http://localhost:3000/api", {
          title: "title",
          author: "author",
          description: "description",
          assets
        })
        .then(res => {
          expect(res.status).toBe(200);
          done();
        });
    });

    it("200 PDF", done => {
      spyOn(Pins, "create").and.callFake((pins, callFake) => {
        callFake(false, {});
      });

      const assets = [{ url: "http://platzi.pdf" }];

      axios
        .post("http://localhost:3000/api", {
          title: "title",
          author: "author",
          description: "description",
          assets
        })
        .then(res => {
          expect(res.status).toBe(200);
          done();
        });
    });

    it("500 status post", done => {
      spyOn(Pins, "create").and.callFake((pins, callFake) => {
        callFake(true, {});
      });

      spyOn(requestPromise, "get").and.returnValue(
        Promise.resolve(
          '<title>Platzi</title><meta name="description" content="Platzi rules">'
        )
      );

      const assets = [{ url: "http://platzi.com" }];

      axios
        .post("http://localhost:3000/api", {
          title: "title",
          author: "author",
          description: "description",
          assets
        })
        .catch(err => {
          expect(err.response.status).toBe(500);
          done();
        });
    });

    it("500 status post promise", done => {
      spyOn(Pins, "create").and.callFake((pins, callFake) => {
        callFake(true, {});
      });

      // spyOn(requestPromise, "get").and.returnValue(Promise.reject(new Error('fallo')));

      const assets = [{ url: "http://platzi.com" }];

      axios
        .post("http://localhost:3000/api", {
          title: "title",
          author: "author",
          description: "description",
          assets
        })
        .catch(err => {
          expect(err.response.status).toBe(403);
          done();
        });
    });
  });

  describe("Put", () => {
    it("200 update", done => {
      spyOn(Pins, "findByIdAndUpdate").and.callFake((id, body, callback) => {
        callback(false, id);
      });
      const assets = [{ url: "http://platzi.com" }];

      request.put(
        "http://localhost:3000/api/1",
        {
          json: {
            title: "title",
            author: "author",
            description: "description",
            assets
          }
        },
        (err, response, body) => {
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body)).toEqual(1);
          done();
        }
      );
    });

    it("500 error", done => {
      spyOn(Pins, "findByIdAndUpdate").and.callFake((id, body, callFake) => {
        callFake(true, id);
      });

      const assets = [{ url: "http://platzi.com" }];
      request.put(
        "http://localhost:3000/api/1",
        {
          json: {
            title: "title",
            author: "author",
            description: "description",
            assets
          }
        },
        (err, response, body) => {
          expect(response.statusCode).toBe(500);
          done();
        }
      );
    });
  });

  /**
   * Delete
   */

  describe("Delete", () => {
    it("200 delete", done => {
      spyOn(Pins, "findByIdAndRemove").and.callFake((id, body, callback) => {
        callback(false, id);
      });
      const assets = [{ url: "http://platzi.com" }];

      request.delete(
        "http://localhost:3000/api/1",
        {
          json: {
            title: "title",
            author: "author",
            description: "description",
            assets
          }
        },
        (err, response, body) => {
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(response.body)).toEqual(1);
          done();
        }
      );
    });

    it("500 error", done => {
      spyOn(Pins, "findByIdAndDelete").and.callFake((id, body, callFake) => {
        callFake(true,id,body);
      });

      const assets = [{ url: "http://platzi.com" }];
      request.delete(
        "http://localhost:3000/api/1",
        {
          json: {
            title: "title",
            author: "author",
            description: "description",
            assets
          }
        },
        (err, response, body) => {
          expect(response.statusCode).toBe(500);
          done();
        }
      );
    });
  });

});
