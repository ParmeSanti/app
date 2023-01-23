export class Article {
    _id!: string;
    title!: string;
    author!: string;
    description!: string;
    content!: string;
    comments!:Array<string>;
    bewertung!:Array<string>;
    updatedAt!: Date;
}