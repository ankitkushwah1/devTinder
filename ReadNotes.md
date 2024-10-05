// work for /abcd /abankitcd starts from ab and end with cd
app.get("/a(bc)?d", (req, res) => {
res.send({ firstname: "ankit", lastname: "kushwah" });
});

// work for /abcd /abankitcd starts from ab and end with cd
app.get("/ab\*cd", (req, res) => {
res.send({ firstname: "ankit", lastname: "kushwah" });
});

// work for /abc /abbbc
app.get("/ab+c", (req, res) => {
res.send({ firstname: "ankit", lastname: "kushwah" });
});

// work for /ac /abc
app.get("/ab?c", (req, res) => {
res.send({ firstname: "ankit", lastname: "kushwah" });
});

app.post("/user", (req, res) => {
//Data save to DB
res.send("Data successfully saved to the database!");
});

app.delete("/user", (req, res) => {
// Delete a user
res.send("Deleted succesfully!");
});

// This will match all the HTTP method API calls to /test
app.use("/test", (req, res) => {
res.send("Hello from the server");
});
