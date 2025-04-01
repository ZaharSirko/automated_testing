import axios from "axios";

describe("GET /posts", () => {

    let response;

    beforeEach(async () => {
        response = await axios.get("https://jsonplaceholder.typicode.com/posts")
    })

    test("should return status 200", () => {
        expect(response.status).toBe(200);
    })

    test("should return 100 posts", () => {
        expect(response.data.length).toBe(100);
    })

    test("should be array", () => {
        expect(Array.isArray(response.data)).toBe(true);
    })

    test("sould have item with id 8", () => {
        const containsPostId = response.data.some((post) => post.id === 8);
        expect(containsPostId).toBe(true);
    })

})

describe("GET /posts/:id", () => {

    test("should return post with id 1", () => {
        return axios
              .get("https://jsonplaceholder.typicode.com/posts/1")
              .then((response) => {
                  expect(response.status).toBe(200);
                  expect(response.data).toEqual({
                      userId: 1,
                      id: 1,
                      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                    })
              })
      }
  )
})

describe("POST /posts", () => {

    test("should create a new post", () => {
        return axios
            .post("https://jsonplaceholder.typicode.com/posts", {
                title: "random title",
                body: "random body",
                userId: 1,
            })
            .then((response) => {
                expect(response.status).toBe(201);
                expect(response.data).toEqual({
                    title: "random title",
                    body: "random body",
                    userId: 1,
                    id: 101,
                });
            });
    });

    test("should return 400 if title is missing", () => {
        return axios
            .post("https://jsonplaceholder.typicode.com/posts", {
                body: "random body",
                userId: 1,
            })
            .catch((error) => {
                expect(error.response.status).toBe(400);
            });
    });


    test("should return 400 if body is missing", () => {
        return axios
            .post("https://jsonplaceholder.typicode.com/posts", {
                title: "random title",
                userId: 1,
            })
            .catch((error) => {
                expect(error.response.status).toBe(400);
            });
    });


    test("should return 400 if userId is missing", () => {
        return axios
            .post("https://jsonplaceholder.typicode.com/posts", {
                title: "random title",
                body: "random body",
            })
            .catch((error) => {
                expect(error.response.status).toBe(400);
            });
    });
 
     test("shoild return 400 if userid is't number", () =>{
        return axios
            .post("https://jsonplaceholder.typicode.com/posts", {
                title: "random title",
                body: "random body",
                userId: "1",
            })
            .catch((error) => {
                expect(error.response.status).toBe(400);
            });
        });
   
   
   


    });
     


describe("PUT /posts/:id", () => {
  test("should update post with id 1", () => {
    return axios
      .put("https://jsonplaceholder.typicode.com/posts/1", {
        title: "updated title",
        body: "updated body",
        userId: 1,
      })
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.data).toEqual({
          title: "updated title",
          body: "updated body",
          userId: 1,
          id: 1,
        });
      });
  });

    test("should return 400 if title is missing", () => {
        return axios
        .put("https://jsonplaceholder.typicode.com/posts/1", {
            body: "updated body",
            userId: 1,
        })
        .catch((error) => {
            expect(error.response.status).toBe(400);
        });
    });

    test("should return 400 if body is missing", () => {
        return axios
        .put("https://jsonplaceholder.typicode.com/posts/1", {
            title: "updated title",
            userId: 1,
        })
        .catch((error) => {
            expect(error.response.status).toBe(400);
        });
    });

    test("should return 400 if userId is missing", () => {
        return axios
        .put("https://jsonplaceholder.typicode.com/posts/1", {
            title: "updated title",
            body: "updated body",
        })
        .catch((error) => {
            expect(error.response.status).toBe(400);
        });
    });

    test("should return 500 if post with id asd is not found", () => {
        return axios
            .put("https://jsonplaceholder.typicode.com/posts/asd", {
                title: "updated title",
                body: "updated body",
                userId: 1,  
            })
            .catch((error) => {
                expect(error.response.status).toBe(500);
            });
    });

})

describe("DELETE /posts/:id", () => {
    test("should delete post with id 1", () => {
        return axios
            .delete("https://jsonplaceholder.typicode.com/posts/1")
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.data).toEqual({});
            });
    });

    test("should return 500 if post with id asd is not found", () => {
        return axios
            .delete("https://jsonplaceholder.typicode.com/posts/asd")
            .catch((error) => {
                expect(error.response.status).toBe(500);
            });
    });
})