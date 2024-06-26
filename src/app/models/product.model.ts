
export class ProductDetails {
    id?: any;
    productName: string = '';
    productDescription: string = '';
    productPrice: number = 0;
    productStock: number = 0;
    categoryId: string = '';
    productType: string = '';
    productStatus: Array<[]> = [];
    fromDate?: Date;
    toDate?: Date;
    time?: any;
    fileUpload?: string = ''
}

