import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PaginationParams } from '@core/interfaces';
import { Category } from '@core/interfaces/category';
import { FilterJobType } from '@core/interfaces/filter-job-type';
import { ItemCity } from '@core/interfaces/list-city';
import { ItemCompany } from '@core/interfaces/list-company';
import { ItemModality } from '@core/interfaces/list-modality';
import { ItemPerk } from '@core/interfaces/list-perk';
import { ItemSeniority } from '@core/interfaces/list-seniority';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { CategoriesService } from 'src/app/services/category/categories.service';
import { CompaniesService } from 'src/app/services/company/companies.service';
import { LocationsService } from 'src/app/services/location/locations.service';
import { ModalitiesService } from 'src/app/services/modality/modalities.service';
import { PerksService } from 'src/app/services/perk/perks.service';
import { SenioritiesService } from 'src/app/services/seniority/seniorities.service';

@Component({
    selector: 'app-filter-jobs',
    templateUrl: './filter-jobs.component.html',
    styleUrls: ['./filter-jobs.component.scss'],
})
export class FilterJobsComponent implements OnInit, OnDestroy {
  categoriesList: Category[] = [];
  companiesList: ItemCompany[] = [];
  modalitiesList: ItemModality[] = [];
  senioritiesList: ItemSeniority[] = [];
  citiesList: ItemCity[] = [];
  perksList: ItemPerk[] = [];
  formFilter: FormGroup;
  filters: PaginationParams = {
    per_page: 15,
    page: 1,
  };
  @Output() filterSelected: EventEmitter<FilterJobType> = new EventEmitter<FilterJobType>();
  @Output() searchJobEmitter: EventEmitter<string> = new EventEmitter<string>();
  resetSearchJob: boolean = false;
  unsucribeObservable$: Subject<boolean> = new Subject();
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private companiesService: CompaniesService,
    private modalitiesService: ModalitiesService,
    private senioritiesService: SenioritiesService,
    private locationsService: LocationsService,
    private perksService: PerksService,
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
    this.listCategories();
    this.listCompanies();
    this.listModalities();
    this.listSeniorities();
    this.listCities();
    this.listPerks();
    this.searchJob.valueChanges
    .pipe(takeUntil(this.unsucribeObservable$), debounceTime(300), distinctUntilChanged())
    .subscribe((word) => {
      this.onSearchJob(word);
      this.resetSearchJob = false;
  });
  }

  buildForm(){
    this.formFilter = this.formBuilder.group({
      category: [''],
      company: [''],
      modality: [''],
      seniority: [''],
      city: [''],
      perk: [''],
      searchJob: [''],
    }); 
  }
  get controlCategory(){
    return this.formFilter.get('category');
  }

  get controlCompany(){
    return this.formFilter.get('company');
  }

  get controlModality(){
    return this.formFilter.get('modality');
  }

  get controlSeniority(){
    return this.formFilter.get('seniority');
  }

  get controlCity(){
    return this.formFilter.get('city');
  }

  get controlPerk(){
    return this.formFilter.get('perk');
  }

  get searchJob() {
    return this.formFilter.get('searchJob');
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
    const filterType: FilterJobType = {
      code: this.controlCategory.value,
      url: 'categories',
    };
    this.filterSelected.emit(filterType);
  }

  listCompanies(){
    this.companiesService.getAll(this.filters).subscribe({
      next: (response) => {
        this.companiesList = response.data;
      },
      error: (error) => {
        //console.log("ERROR ===> ", error);
      }
    })
  }  
  selectCompany(){
    const filterType: FilterJobType = {
      code: this.controlCompany.value,
      url: 'companies',
    };
    this.filterSelected.emit(filterType);
  }

  listModalities(){
    this.modalitiesService.getAll().subscribe({
      next: (response) => {
        this.modalitiesList = response.data;
      },
      error: (error) => {
        //console.log("ERROR ===> ", error);
      }
    })
  }
  selectModality(){
    const filterType: FilterJobType = {
      code: this.controlModality.value,
      url: 'modalities',
    };
    this.filterSelected.emit(filterType);
  }

  listSeniorities(){
    this.senioritiesService.getAll().subscribe({
      next: (response) => {
        this.senioritiesList = response.data;
      },
      error: (error) => {
        //console.log("ERROR ===> ", error);
      }
    })
  }
  selectSeniority(){
    const filterType: FilterJobType = {
      code: this.controlSeniority.value,
      url: 'seniorities',
    };
    this.filterSelected.emit(filterType);
  }

  
  listCities(){
    this.locationsService.getAll(this.filters).subscribe({
      next: (response) => {
        this.citiesList = response.data;
      },
      error: (error) => {
        //console.log("ERROR ===> ", error);
      }
    })
  }
  selectCity(){
    const filterType: FilterJobType = {
      code: this.controlCity.value,
      url: 'cities',
    };
    this.filterSelected.emit(filterType);
  }

  listPerks(){
    this.perksService.getAll().subscribe({
      next: (response) => {
        this.perksList = response.data;
      },
      error: (error) => {
        //console.log("ERROR ===> ", error);
      }
    })
  }
  selectPerk(){
    const filterType: FilterJobType = {
      code: this.controlPerk.value,
      url: 'perks',
    };
    this.filterSelected.emit(filterType);
  }    

  onSearchJob(word: string) {
    this.searchJobEmitter.emit(word);
  }

  ngOnDestroy(): void {
    this.unsucribeObservable$.next(true);
    this.unsucribeObservable$.complete();
  }
}
