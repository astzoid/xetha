import type { ProfileAttributes } from '@shared/database';

const Wrapper = {
    addItem(user: ProfileAttributes, id: string, amount = 1) {
        const cur = user.inventory.find((i) => i.id === id);

        if (cur) return (cur.amount += amount);

        return user.inventory.push({ id, amount });
    },

    removeItem(user: ProfileAttributes, id: string, amount = 1) {
        const cur = user.inventory.find((i) => i.id === id);

        if (
            cur &&
            cur.amount > 1 &&
            amount > 0 &&
            user.inventory.length >= amount
        ) {
            return (cur.amount -= amount);
        }

        return (user.inventory = user.inventory.filter((i) => i.id !== id));
    },

    hasItem(user: ProfileAttributes, id: string) {
        return Boolean(user.inventory.find((c) => c.id === id));
    },
};
export default Wrapper;
