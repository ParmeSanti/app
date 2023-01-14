import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../article';
import { ApiService } from '../api.service';

@Component({
selector: 'app-details-article',
templateUrl: './details-article.component.html',
styleUrls: ['./details-article.component.css']
})
export class DetailsArticleComponent implements OnInit {

article: Article = { _id: '', title: '', author: '', description: '', content: '',
updatedAt: new Date(), comments: [{ text: '', rating: 0 }] }; // added: , comments: [{ text: '', rating: 0 }]
isLoadingResults = true;
constructor(private route: ActivatedRoute, private api: ApiService, private router:
Router) { }

ngOnInit(): void {
this.getArticleDetails(this.route.snapshot.params["id"]);
}

getArticleDetails(id: String) {
console.log("ID "+id);
this.api.getArticle(id)
.subscribe((data: any) => {
this.article = data;
console.log(this.article);
this.isLoadingResults = false;
});
}

deleteArticle(id: any) {
this.isLoadingResults = true;
this.api.deleteArticle(id)
.subscribe(res => {
this.isLoadingResults = false;
this.router.navigate(['/articles']);
}, (err) => {
console.log(err);
this.isLoadingResults = false;
}
);
}
}