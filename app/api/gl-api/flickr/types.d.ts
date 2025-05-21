export type TPhoto = {
    id: string;
    sizes?: {
        orig: {
            src: string;
            width: number;
            height: number;
        }
    }
}