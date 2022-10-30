export interface Category {
  id:         string;
  type:       string;
  attributes: Attributes;
}

export interface Attributes {
  name:      string;
  dimension: string;
}

export interface CategoriesResponse {
  data: Category[];
  meta: {
    page: number;
		per_page: number;
		total_pages: number;
  };
}