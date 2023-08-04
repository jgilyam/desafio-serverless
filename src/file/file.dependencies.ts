import { FileService } from "./application/file.service";
import { FileController } from "./infrastructure/file.controller";
import { FileErrorHandler } from "./infrastructure/file.error.handler.";
import { S3Service } from "./infrastructure/s3/s3.service";

const BUCKET = process.env.BUCKET ?? "";
const s3Service = new S3Service(BUCKET)
const fileService = new FileService(s3Service);
const fileErrorHandler = new FileErrorHandler();
export const fileController = new FileController(fileService, fileErrorHandler);