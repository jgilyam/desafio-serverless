import {parse, getBoundary} from "parse-multipart-data";

export const parseFormData = ( body: string, contentType: string) => {
    const buffer = Buffer.from(body.toString(), 'base64')
    
    const boundary = getBoundary(contentType);
    const parts = parse(buffer, boundary);
   
    const [{filename, data, type}] = parts;
    

    return {filename: filename ?? "noName", data , type}
};
