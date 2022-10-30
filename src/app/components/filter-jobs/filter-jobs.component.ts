import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IChangeSearch, PaginationParams } from '@core/interfaces';
import { Category } from '@core/interfaces/category';
import { CategoriesService } from 'src/app/services/category/categories.service';

@Component({
    selector: 'app-filter-jobs',
    templateUrl: './filter-jobs.component.html',
    styleUrls: ['./filter-jobs.component.scss'],
})
export class FilterJobsComponent implements OnInit {
    categoriesList: Category[] = [];
    formFilter: FormGroup;
    filters: PaginationParams = {
        per_page: 15,
        page: 1,
    };
    resetSearchJob = false;
    @Output() categorySelected: EventEmitter<string> = new EventEmitter<string>();
    @Output() searchJobEmitter: EventEmitter<string> = new EventEmitter<string>();
    constructor(private formBuilder: FormBuilder, private categoriesService: CategoriesService) {
        this.buildForm();
    }

    ngOnInit(): void {
        this.listCategories();
        this.searchJob.valueChanges.subscribe((word) => {
            this.onSearchJob(word);
            this.resetSearchJob = false;
        });
    }

    buildForm() {
        this.formFilter = this.formBuilder.group({
            category: [''],
            searchJob: [''],
        });
    }

    get controlCategory() {
        return this.formFilter.get('category');
    }
    get searchJob() {
        return this.formFilter.get('searchJob');
    }

    listCategories() {
        this.categoriesService.getAllCategories(this.filters).subscribe({
            next: (response) => {
                this.categoriesList = response.data;
            },
            error: (error) => {
                //console.log("ERROR ===> ", error);
            },
        });
    }

    selectCategory() {
        this.resetSearchJob = true;
        this.searchJob.reset('');
        this.categorySelected.emit(this.controlCategory.value);
    }

    onSearchJob(word: string) {
        if (this.resetSearchJob) {
            return;
        }
        this.controlCategory.reset('');
        this.searchJobEmitter.emit(word);
    }
}
