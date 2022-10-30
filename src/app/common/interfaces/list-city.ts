export interface ItemCity {
  id:         string;
  type:       string;
  attributes: Attributes;
}

export interface Attributes {
  name: string;
}

export interface CitiesResponse {
  data: ItemCity[];
  meta: {
    page: number;
		per_page: number;
		total_pages: number;
  };
}