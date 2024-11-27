const mongoose = require("mongoose");
try {
  mongoose.connect("mongodb+srv://admin:yZkFlcMot6QhNQPR@cluster0.uddx1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log("Database Connected Successfully");
} catch (err) {
  console.log("Database Not Connected");
}
