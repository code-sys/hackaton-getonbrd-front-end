export interface ItemModality {
  id:         string;
  type:       string;
  attributes: Attributes;
}

export interface Attributes {
  name:       string;
  locale_key: string;
}

export interface ModalitiesResponse {
  data: ItemModality[];
  meta: {
    page: number;
		per_page: number;
		total_pages: number;
  };
}