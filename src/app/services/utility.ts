export class Utility {
    public static generateGuID(): string {
        const guIdSchema = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx';

        return guIdSchema.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}