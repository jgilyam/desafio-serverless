import { FileAddDTO } from "./file.add.dto";
import { FileOutDTO } from "./file.out.dto";

export interface IFileStorageManager {
    upLoadFile(file: FileAddDTO) : Promise<string>;
    getUrl(filename: string): string;
    getFiles(name?: string): Promise<FileOutDTO[]>
}