import S3, { ListObjectsV2Request } from 'aws-sdk/clients/s3';

import { FileAddDTO } from "../../domain/file.add.dto";
import { IFileStorageManager } from "../../domain/file.storage.manager";
import { FileOutDTO } from '../../domain/file.out.dto';

export class S3Service implements IFileStorageManager{
    s3: S3;
    bucket: string;
    constructor(bucket: string){
        this.s3 = new S3();
        this.bucket = bucket;
    }
    upLoadFile = async (file: FileAddDTO): Promise<string> => {
        const {filename, data} = file

        await this.s3
        .putObject({
            Bucket: this.bucket,
            Key: filename,
            ACL: 'private',
            Body: data
        })
        .promise();

        const signedUrl = await this.getSignedUrl(filename);
        return signedUrl;  
    }
    getUrl = (filename: string): string => {
        const url = `https://${ this.bucket }.s3.amazonaws.com/${ filename }`
        return url;
    }

    getSignedUrl = async (key: string) =>{
        const signedUrl = await this.s3.getSignedUrlPromise("getObject", {
            Bucket: this.bucket,
            Key: key,
            Expires:3600,
          });
        return signedUrl;  
    }

    getFiles =  async (name?: string | undefined): Promise<FileOutDTO[]> => {

        const options: ListObjectsV2Request = {
            Bucket: this.bucket
        }
        const {Contents} =  await this.s3.listObjectsV2(options).promise();

        if(!Contents || Contents.length===0) return [];

        const listOfFiles = await this.objectListToFileOutDTOList(Contents);

        return listOfFiles;
    }

    objectListToFileOutDTOList = async(Contents: S3.ObjectList)=>{
        return await Promise.all(
            Contents.map(async (file) => {
              const key = file.Key || "";
              const signedUrl = await this.getSignedUrl(key);
  
              const result = {
                uploadDate: file.LastModified || new Date(),
                filename: key,
                signedUrl,
              };
              return result;
            })
          );

    }

}