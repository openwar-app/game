import "reflect-metadata";
import { TypeORM } from "$lib/server/database/db";
const db = await TypeORM.getInstance();
