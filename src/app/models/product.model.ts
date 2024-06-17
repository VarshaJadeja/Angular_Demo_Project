import { DateTime } from "luxon";

export class ProductDetails {
    id?: string;
    productName: string = '';
    productDescription: string = '';
    productPrice: number = 0;
    productStock: number = 0;
    categoryId: string = '';
    productType: string = '';
    productStatus: string[] = [];
    fromDate?: Date;
    toDate?: Date;
    time?: DateTime;
    fileUpload?: string = ''
}

