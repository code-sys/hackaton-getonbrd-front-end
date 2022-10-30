import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaginationParams } from '@core/interfaces';
import { Category } from '@core/interfaces/category';
import { CategoriesService } from 'src/app/services/category/categories.service';

@Component({
  selector: 'app-filter-jobs',
  templateUrl: './filter-jobs.component.html',
  styleUrls: ['./filter-jobs.component.scss']
})
export class FilterJobsComponent implements OnInit {

  categoriesList: Category[] = [];
  formFilter: FormGroup;
  filters: PaginationParams = {
    per_page: 15,
    page: 1,
  };
  @Output() categorySelected: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
    this.listCategories();
  }

  buildForm(){
    this.formFilter = this.formBuilder.group({
      category: [''],
    }); 
  }

  get controlCategory(){
    return this.formFilter.get('category');
  }

  listCategories(){
    this.categoriesService.getAllCategories(this.filters).subscribe({
      next: (response) => {
        this.categoriesList = response.data;
      },
      error: (error) => {
        //console.log("ERROR ===> ", error);
      }
    })
  }
  
  selectCategory(){
    this.categorySelected.emit(this.controlCategory.value);
  }

}
