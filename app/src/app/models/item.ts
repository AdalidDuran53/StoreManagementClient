export interface Item {
    itemId?: string,
    itemCode: string,
    itemDescription: string,
    itemPrice: number,
    itemStock: number,
    itemImg: File;
    itemAmount?: number;
}
