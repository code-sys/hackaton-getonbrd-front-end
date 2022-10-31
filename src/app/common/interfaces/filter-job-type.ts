import { FilterJobTypeEnum } from "@core/enums/filter-job-type.enum";

export interface FilterInterface {
    type: FilterJobTypeEnum;
    code: string | number;
}

export interface FilterJobType {
  url: string;
  code: string;
  filters?: FilterInterface[];
}
