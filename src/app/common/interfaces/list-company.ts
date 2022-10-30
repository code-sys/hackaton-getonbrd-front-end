export interface ItemCompany {
  id:         string;
  type:       string;
  attributes: Attributes;
}

export interface Attributes {
  name:                  string;
  description:           string;
  long_description:      string;
  projects:              string;
  benefits:              string;
  web:                   string;
  twitter:               string;
  github:                string;
  facebook:              string;
  angellist:             string;
  country:               string;
  response_time_in_days: ResponseTimeInDays;
  logo:                  string;
}

export interface ResponseTimeInDays {
  min: number;
  max: number;
}

export interface CompaniesResponse {
  data: ItemCompany[];
  meta: {
    page: number;
		per_page: number;
		total_pages: number;
  };
}