import 'dotenv/config';
import app from './src/app.js';
import { connectDB } from './src/configs/db.js';

const PORT = process.env.PORT || 3000;

await connectDB();

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
