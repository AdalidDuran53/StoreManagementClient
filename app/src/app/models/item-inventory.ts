import { Item } from "./item";
import { Store } from "./store";

export interface ItemInventory {
    store: Store
    item: Item
}
