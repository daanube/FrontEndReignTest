import { Articles } from "./Articles"

export class Response {
    hits: Articles[]=[];
    nbHits: number = 0;
    page: number = 0;
    nbPages: number = 0;
    hitsPerPage: number = 0;
    exhaustiveNbHits: boolean = true;
    exhaustiveTypo: boolean = true;
    query : string= "";
    params : string= "";
    processingTimeMS: number = 0;

}  