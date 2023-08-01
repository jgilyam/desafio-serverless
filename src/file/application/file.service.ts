import { FileAddDTO } from "../domain/file.add.dto"
import { IFileStorageManager } from "../domain/file.storage.manager"


export class FileService {
    constructor(private readonly fileStorageManager: IFileStorageManager){}
    listFiles = async(name?: string)=>{
        const files = await this.fileStorageManager.getFiles(name);
        return files;
    }

    uploadFile = async(fileAddDTO: FileAddDTO)=>{
        const { filename } = fileAddDTO;
        
        const signedUrl = await this.fileStorageManager.upLoadFile(fileAddDTO);
        const link = this.fileStorageManager.getUrl(filename);
        return {signedUrl, link};
    }
}