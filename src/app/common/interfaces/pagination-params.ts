import { FilterJobType } from "./filter-job-type";

export interface PaginationParams {
  per_page:      number;
  page:          number;
  filterJobType?:      FilterJobType;
}