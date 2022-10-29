export interface Category {
  id:         string;
  type:       string;
  attributes: Attributes;
}

export interface Attributes {
  name:      string;
  dimension: string;
}