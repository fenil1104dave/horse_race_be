import { HR_EXPRESS_PORT } from "./config";
import app from "./app";
import { connectDB } from "./db";

const PORT = HR_EXPRESS_PORT || 3000;

try {
    // Database connection
    connectDB();

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
} catch (error) {
    console.error(error);
    process.exit(1);
}
