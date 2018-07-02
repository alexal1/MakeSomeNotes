// @flow

export class Item {

    id: number;

    constructor(id: number) {
        this.id = id
    }

}

export class ItemText extends Item {

    text: string;

    constructor(id: number, text: string) {
        super(id);
        this.text = text
    }

}