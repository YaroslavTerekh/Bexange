import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from './../book.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from '../models/Book';
import { BookRequest } from '../models/BookRequest';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  public genres: any;
  public selectedFile!: File;
  public form: FormGroup = new FormGroup({
    title: this.fb.control('', [Validators.required]),
    description: this.fb.control('', [Validators.required]),
    genre: this.fb.control('', [Validators.required]),
    author: this.fb.control('', [Validators.required]),
    image: this.fb.control('', [Validators.required]),
  });

  constructor(
    private bookService: BookService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.bookService.getAllGenres()
      .subscribe({
        next: res => {
          this.genres = res;
        },
        error: (err: any) => {
          this.router.navigate(['/error', { error: JSON.stringify(err) }])
        }
      });
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  addBook() {
    const newBook: BookRequest = {
      userId: 0,
      id: 0,
      title: this.form.get('title')?.value,
      description: this.form.get('description')?.value,
      comments: null,
      genreId: this.form.get('genre')?.value,
      author: {
        name: this.form.get('author')?.value,
        wikiLink: null,
        img: null
      },
      image: null
    }

    let requestData = new FormData();
    requestData.append('image', this.selectedFile, this.selectedFile?.name);

    this.bookService.AddImage(requestData)
      .subscribe(res => {
        this.bookService.AddBook(newBook, res)
          .subscribe((res) => {
            console.log(res);            
          });
      });
  }

}
