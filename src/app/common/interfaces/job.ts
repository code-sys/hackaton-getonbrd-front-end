export interface ResponseTimeInDays {
    min?: any;
    max?: any;
}

export interface DataModality {
    id: number;
    type: string;
    attributes: {
        name: string;
    };
}

export interface Modality {
    data: DataModality;
}

export interface DataSeniority {
    id: number;
    type: string;
    attributes: {
        name: string;
    };
}

export interface Seniority {
    data: DataSeniority;
}

export interface Datum2 {
    id: number;
    type: string;
}

export interface Tags {
    data: Datum2[];
}

export interface ResponseTimeInDays2 {
    min: number;
    max: number;
}

export interface AttributesCompany {
    name: string;
    description: string;
    long_description: string;
    projects: string;
    benefits: string;
    web: string;
    twitter: string;
    github: string;
    facebook: string;
    angellist: string;
    country: string;
    response_time_in_days: ResponseTimeInDays2;
    logo: string;
}

export interface DataCompany {
    id: string;
    type: string;
    attributes: AttributesCompany;
}

export interface Company {
    data: DataCompany;
}

export interface Attributes {
    title: string;
    description_headline: string;
    description: string;
    projects: string;
    functions_headline: string;
    functions: string;
    benefits_headline: string;
    benefits: string;
    desirable_headline: string;
    desirable: string;
    remote: boolean;
    remote_modality: string;
    remote_zone: string;
    country: string;
    lang: string;
    category_name: string;
    perks: string[];
    min_salary?: any;
    max_salary?: any;
    published_at: number;
    response_time_in_days: ResponseTimeInDays;
    applications_count: number;
    tenant_city?: any;
    modality?: Modality;
    seniority?: Seniority;
    tags: Tags;
    company: Company;
}

export interface Links {
    public_url: string;
}

export interface IJob {
    id: string;
    type: string;
    attributes: Attributes;
    links: Links;
}

export interface IMeta {
    page: number;
    per_page: number;
    total_pages: number;
}

export interface IJobs {
    data: IJob[];
    meta: IMeta;
}

export interface INgxPaginationPage {
    itemsPerPage: number;
    page: number;
}

export interface IChangeSearch {
    reset: boolean;
    word: string;
}
