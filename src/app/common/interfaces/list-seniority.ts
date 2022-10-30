export interface ItemSeniority {
  id:         string;
  type:       string;
  attributes: Attributes;
}

export interface Attributes {
  name:       string;
  locale_key: string;
}

export interface SenioritiesResponse {
  data: ItemSeniority[];
  meta: {
    page: number;
		per_page: number;
		total_pages: number;
  };
}