import { HR_EXPRESS_PORT } from "./config";
import app from "./app";

const PORT = HR_EXPRESS_PORT || 3000;

try {
  console.log("PORT", PORT);
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
