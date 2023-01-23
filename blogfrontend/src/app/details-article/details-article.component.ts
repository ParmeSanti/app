import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../article';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators }
  from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null):
    boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-details-article',
  templateUrl: './details-article.component.html',
  styleUrls: ['./details-article.component.css']
})

export class DetailsArticleComponent implements OnInit {

  commentForm: FormGroup = this.formBuilder.group({
    comments: ['', Validators.required],
    bewertung: ['', Validators.required]
  });


  article: Article = {
    _id: '', title: '', author: '', description: '', content: '', comments: new Array, bewertung: new Array, updatedAt: new Date()
  };


  isLoadingResults = false;
  constructor(private route: ActivatedRoute, private api: ApiService, private router:
    Router, private formBuilder: FormBuilder) { }

  matcher = new MyErrorStateMatcher();
  

  ngOnInit(): void {
    this.getArticleDetails(this.route.snapshot.params["id"]);
    this.commentForm = this.formBuilder.group({
      'comments': [null, Validators.required],
      'bewertung': [null, Validators.required]
    });
  }

  getArticleDetails(id: String) {
    console.log("ID " + id);
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

  deleteComment(id:number){
    this.isLoadingResults = true;
    this.article.comments.splice(id,1);
    this.article.bewertung.splice(id,1);
    this.api.updateArticle(this.article._id,this.article)
    .subscribe((res: any) => {
      const id = res._id;
      console.log('fetched id ' + id);
      this.isLoadingResults = false;
      this.router.navigate(['/details-article', id]);
    }, (err: any) => {
      console.log(err);
      this.isLoadingResults = false;
    }
    );
  }

  editComment(id:number){
    this.commentForm.patchValue({
      comments: this.article.comments[id],
      bewertung:this.article.bewertung[id]
    });
    this.deleteComment(id);
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    console.log("Fetched from Form " + this.article._id);
    this.api.updateComments(this.article._id, this.commentForm.value, this.article)
      .subscribe((res: any) => {
        const id = res._id;
        console.log('fetched id ' + id);
        this.isLoadingResults = false;
        this.commentForm.patchValue({
          comments: '',
          bewertung:''
        });
        this.commentForm.controls['bewertung'].markAsUntouched();
        this.commentForm.controls['comments'].markAsUntouched();
        this.router.navigate(['/details-article', id]);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }

}
