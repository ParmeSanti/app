export class ArticleDTO {
    readonly title: string;
    readonly author: string;
    readonly description: string;
    readonly content: string;
    // added this for comments
    readonly comments: Array<{ text: string, rating: number }>;
}
