import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { NewArticleComponent } from './new-article/new-article.component';
import { DetailsArticleComponent } from './details-article/details-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';

const routes: Routes = [
  {
    path:'articles',
    component: ArticlesComponent,
    data: {title : 'Alle Artikel'}
  },
  {
    path:'new-article',
    component: NewArticleComponent,
    data: {title : 'Artikel hinzufügen'}
  },
  {
    path:'details-article/:id',
    component: DetailsArticleComponent,
    data: {title : 'Artikel ansehen'}
  },
  {
    path:'edit-article/:id',
    component: EditArticleComponent,
    data: {title : 'Artikel editieren'}
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
 
