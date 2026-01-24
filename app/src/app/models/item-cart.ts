export interface ItemCart {
    itemId: string;
    itemAmount: number;
    operationDate: Date;
    itemPrice?: number;
    itemStock: number;
    itemSubtotal?: number;
    itemDescription?: string;
    itemCode?: string;
    itemImg: File;
}
