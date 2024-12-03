import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../post.service'
import {Post} from '../post.model';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit , OnDestroy{
 posts: Post[]=[];
 private postSub: Subscription;

  constructor(public postService: PostService){
    this.postSub =new Subscription();
}

ngOnInit(){
    this.posts = this.postService.getPost();
    this.postSub=this.postService.getPostUpdateListener()
      .subscribe((post:Post[])=>{
       this.posts = post;
  });
 }
 ngOnDestroy(){
    this.postSub.unsubscribe();
 }
}