export interface ITag {
    id: number;
    name: string;
}
export interface Ilocalisation {
    id: number;
    creator_id: number;
    description : string;
    date: Date | null;
    lattitude: number;
    longitude: number;
    image: any;
    tags: ITag[];
}