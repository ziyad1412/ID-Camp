class MyCustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "MyError";
  }
}

try {
  throw new MyCustomError("This is an error");
} catch (e) {
  console.log(e.message);
}
