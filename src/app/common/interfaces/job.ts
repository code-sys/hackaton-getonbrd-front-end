export interface Job {
  id:         string;
  type:       string;
  attributes: JobAttributes;
  links:      Links;
}

export interface JobAttributes {
  title:                string;
  description_headline: string;
  functions_headline:   string;
  functions:            string;
  benefits_headline:    string;
  benefits:             string;
  desirable_headline:   string;
  desirable:            string;
  remote:               boolean;
  remote_modality:      string;
  remote_zone:          null;
  country:              string;
  category_name:        string;
  perks:                string[];
  min_salary:           number;
  max_salary:           number;
  modality:             string;
  seniority:            string;
  published_at:         number;
  company:              Company;
}

export interface Company {
  data: CompanyData;
}

export interface CompanyData {
  id:            string;
  type:          string;
  attributes:    CompanyDataAttributes;  
}

export interface CompanyDataAttributes {
  name:             string;
  description:      string;
  long_description: string;
  projects:         string;
  benefits:         string;
  web:              string;
  twitter:          string;
  github:           string;
  facebook:         string;
  angellist:        string;
  logo:             CompanyDataLogo;
  country:          string;  
}

export interface CompanyDataLogo {
  url:   string;
  thumb: ThumbLogo;
}

export interface ThumbLogo {
  url: string;
}

export interface Links {
  public_url: string;
}