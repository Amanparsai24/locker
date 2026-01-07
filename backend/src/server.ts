import app from "./app.js";
import { connectDB } from "./config/database.js";
import { ENV } from "./config/env.js";

connectDB();

app.listen(ENV.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${ENV.PORT}`);
});
