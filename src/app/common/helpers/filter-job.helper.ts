import { FilterJobTypeEnum } from '@core/enums/filter-job-type.enum';
import { IJob } from '@core/interfaces';
import { FilterInterface } from '@core/interfaces/filter-job-type';

export function filterJobHelper(jobs: IJob[], filters: FilterInterface[]): IJob[] {
    let leakedJobs: IJob[] = [...jobs];

    filters.forEach(({ code, type }) => {
        if (type === FilterJobTypeEnum.Company) {
            leakedJobs = leakedJobs.filter((job) => job.attributes.company.data.id == code);
        }

        if (type === FilterJobTypeEnum.Modality) {
            leakedJobs = leakedJobs.filter((job) => job.attributes.modality.data.id == code);
        }

        if (type === FilterJobTypeEnum.Seniority) {
            leakedJobs = leakedJobs.filter((job) => job.attributes.seniority.data.id == code);
        }

        if (type === FilterJobTypeEnum.City) {
            leakedJobs = leakedJobs.filter((job) => job.attributes.tenant_city?.data?.id == code);
        }

        if (type === FilterJobTypeEnum.Perk) {
            leakedJobs = leakedJobs.filter(({ attributes: { perks } }) => {
                for (let perk of perks) {
                    if (perk == code) {
                        return true;
                    }
                }
                return false;
            });
        }
    });

    return leakedJobs;
}
