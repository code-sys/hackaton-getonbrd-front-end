export interface ItemPerk {
  id:         string;
  type:       string;
  attributes: Attributes;
}

export interface Attributes {
  name:        string;
  description: string;
}

export interface PerksResponse {
  data: ItemPerk[];
  meta: {
    page: number;
		per_page: number;
		total_pages: number;
  };
}