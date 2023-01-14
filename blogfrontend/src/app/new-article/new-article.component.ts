import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MyErrorStateMatcher } from '../edit-article/edit-article.component';


@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {


  articleForm: FormGroup;
  title = '';
  author = '';
  description = '';
  content = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private api: ApiService, private formBuilder:
    FormBuilder) {
    this.articleForm = this.formBuilder.group({
      'title': [null, Validators.required],
      'author': [null, Validators.required],
      'description': [null, Validators.required],
      'content': [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }
    onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addArticle(this.articleForm.value)
      .subscribe((res: any) => {
        const id = res._id;
        this.isLoadingResults = false;
        this.router.navigate(['/details-article/', id]);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });

  }
  articles() {
    this.router.navigate(['/articles']);
  }
}
