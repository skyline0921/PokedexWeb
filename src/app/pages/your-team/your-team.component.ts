import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-your-team',
  templateUrl: './your-team.component.html',
  styleUrls: ['./your-team.component.scss']
})

export class YourTeamComponent implements OnInit{
  constructor(private http: HttpClient,
    private fb: FormBuilder,
  ) {}
  
  filter_form = this.fb.group({
    search: [''],
  });

  search = '';

  ngOnInit(): void {
    
  }

  searchSubmitHandler(){
    console.log(this.filter_form.get('search')?.value);
    
  }

}
