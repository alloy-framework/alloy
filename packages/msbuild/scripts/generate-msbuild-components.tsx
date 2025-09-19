import { resolveSchemas } from "./collect-schemas.js";

console.log("Fetching and parsing XSDs...");
const schemas = await resolveSchemas();
console.log("Schemas", schemas);
