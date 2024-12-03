import {Post} from "./post.model"
import {Injectable} from '@angular/core';
import { Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[]=[];
  private postUpdate = new Subject<Post[]>();

  getPost(){
    //return this.posts;//by reference
    return [...this.posts];//copy of list of post

  }
  getPostUpdateListener(){
    return this.postUpdate.asObservable();

  }
  addPost(title:String,content:String){
   const post: Post ={title:title,content:content}
   this.posts.push(post);
   this.postUpdate.next([...this.posts]);
  }

}
