import "reflect-metadata";
import { AppDataSource } from "./config/db";

import app from "./app";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.config";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const DatbaseCheck=async()=>{
    
try {
    await AppDataSource.initialize();
    console.log("Db connection Succesfull")
 app.listen(3000,()=>{
    console.log("app running on port 3000");
 })
} catch (error) {
    console.log("database connetion fails",error)
}
}
DatbaseCheck();