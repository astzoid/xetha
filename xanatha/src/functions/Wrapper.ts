import { ProfileAttributes } from '../database/models/Profile';

export default class Wrapper {

    constructor() {

        throw new Error(`The ${this.constructor.name} class cannot be instantiated`);

    }

    static addItem(user: ProfileAttributes, id: string, amount: number = 1) {

        const cur = user.inventory.find((i) => i.id === id);

        if (cur) {

            return cur.amount += amount;

        }

        user.inventory.push({ id, amount });

    }

    static removeItem(user: ProfileAttributes, id: string, amount: number = 1) {

        const cur = user.inventory.find((i) => i.id === id);

        if (cur && cur.amount > 1 && amount > 0 && user.inventory.length >= amount) {

            return cur.amount -= amount;

        }

        user.inventory = user.inventory.filter((i) => i.id !== id);

    }

    static hasItem(user: ProfileAttributes, id: string) {

        return !!user.inventory.find((c) => c.id === id);

    }

}