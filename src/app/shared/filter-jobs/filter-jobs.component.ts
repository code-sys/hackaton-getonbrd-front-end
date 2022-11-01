import { Component, EventEmitter, OnDestroy, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterJobTypeEnum } from '@core/enums/filter-job-type.enum';
import { PaginationParams } from '@core/interfaces';
import { Category } from '@core/interfaces/category';
import { FilterJobType, FilterInterface } from '@core/interfaces/filter-job-type';
import { ItemCity } from '@core/interfaces/list-city';
import { ItemCompany } from '@core/interfaces/list-company';
import { ItemModality } from '@core/interfaces/list-modality';
import { ItemPerk } from '@core/interfaces/list-perk';
import { ItemSeniority } from '@core/interfaces/list-seniority';
import { debounceTime, distinctUntilChanged, filter, Subject, takeUntil } from 'rxjs';
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
    @Input() defaultCode: string = 'programming';
    @Output() filterSelected: EventEmitter<FilterJobType> = new EventEmitter<FilterJobType>();
    @Output() searchJobEmitter: EventEmitter<string> = new EventEmitter<string>();
    @Output() selectedCategory: EventEmitter<FilterJobType> = new EventEmitter<FilterJobType>();
    resetSearchJob: boolean = false;
    unsucribeObservable$: Subject<boolean> = new Subject();
    constructor(
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private companiesService: CompaniesService,
        private modalitiesService: ModalitiesService,
        private senioritiesService: SenioritiesService,
        private locationsService: LocationsService,
        private perksService: PerksService
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
            .pipe(takeUntil(this.unsucribeObservable$), debounceTime(800), distinctUntilChanged())
            .subscribe((word) => {
                this.onSearchJob(word);
                this.resetSearchJob = false;
            });
    }

    buildForm() {
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
    get controlCategory() {
        return this.formFilter.get('category');
    }

    get controlCompany() {
        return this.formFilter.get('company');
    }

    get controlModality() {
        return this.formFilter.get('modality');
    }

    get controlSeniority() {
        return this.formFilter.get('seniority');
    }

    get controlCity() {
        return this.formFilter.get('city');
    }

    get controlPerk() {
        return this.formFilter.get('perk');
    }

    get searchJob() {
        return this.formFilter.get('searchJob');
    }

    listCategories() {
        this.categoriesService.getAllCategories(this.filters).subscribe({
            next: (response) => {
                this.categoriesList = response.data;
            },
            error: (_error) => {
            },
        });
    }

    listCompanies() {
        this.companiesService.getAll(this.filters).subscribe({
            next: (response) => {
                this.companiesList = response.data;
            },
            error: (_error) => {
            },
        });
    }

    listModalities() {
        this.modalitiesService.getAll().subscribe({
            next: (response) => {
                this.modalitiesList = response.data;
            },
            error: (_error) => {
            },
        });
    }

    listSeniorities() {
        this.senioritiesService.getAll().subscribe({
            next: (response) => {
                this.senioritiesList = response.data;
            },
            error: (_error) => {
            },
        });
    }

    listCities() {
        this.locationsService.getAll(this.filters).subscribe({
            next: (response) => {
                this.citiesList = response.data;
            },
            error: (_error) => {
            },
        });
    }

    listPerks() {
        this.perksService.getAll().subscribe({
            next: (response) => {
                this.perksList = response.data;
            },
            error: (_error) => {
            },
        });
    }

    onSearchJob(word: string) {
        this.searchJobEmitter.emit(word);
    }

    private createFilterJobType(): FilterJobType {
        const filters: FilterInterface[] = this.getFilters();
        const filterType: FilterJobType = {
            code: this.controlCategory.value,
            url: 'categories',
            filters,
        };

        return filterType;
    }

    private getFilters(): FilterInterface[] {
        const filters: FilterInterface[] = [];

        const company = this.formFilter.get('company').value;
        const modality = this.formFilter.get('modality').value;
        const seniority = this.formFilter.get('seniority').value;
        const city = this.formFilter.get('city').value;
        const perk = this.formFilter.get('perk').value;

        if (company !== '') {
            filters.push({ type: FilterJobTypeEnum.Company, code: company });
        }

        if (modality !== '') {
            filters.push({ type: FilterJobTypeEnum.Modality, code: modality });
        }

        if (seniority !== '') {
            filters.push({ type: FilterJobTypeEnum.Seniority, code: seniority });
        }

        if (city !== '') {
            filters.push({ type: FilterJobTypeEnum.City, code: city });
        }

        if (perk !== '') {
            filters.push({ type: FilterJobTypeEnum.Perk, code: perk });
        }

        return filters;
    }

    public emitSearchValuesByFilter() {
        const filterType: FilterJobType = this.createFilterJobType();
        this.filterSelected.emit(filterType);
    }

    public emitSelectedCategoryByFilter() {
        const filterType: FilterJobType = this.createFilterJobType();
        this.selectedCategory.emit(filterType);
    }

    ngOnDestroy(): void {
        this.unsucribeObservable$.next(true);
        this.unsucribeObservable$.complete();
    }
}
