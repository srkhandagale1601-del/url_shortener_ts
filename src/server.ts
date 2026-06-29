import app from "./app.ts";
import {config} from "./config/env.ts";
const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});