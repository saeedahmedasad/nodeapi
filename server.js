import { app } from "./app.js";
import { connectDB } from "./data/database.js ";

// Connecting to the Database
connectDB();

// Listening on the Post
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
