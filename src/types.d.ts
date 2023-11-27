export interface ICompanyList {
  pk: number;
  name: string;
  user: number;
}

export interface ICompany {
  staffs: ICompanyStaff[];
}
export interface IOpinion {
  year_and_month: string;
  opinion: string;
}

export interface ICompanyStaff {
  pk: number;
  name: string;
  is_office: boolean;
  g_examination: string;
  s_examination: string;
  join_date: string;
  pre_examination_date: string;
  is_night: boolean;
  segs: ISegType;
  opinions: IOpinion[];
}
interface FactorOption {
  value: string;
  label: string;
}

export interface IFactor {
  value: number;
  label: string;
  check_cycle: number;
  regular_check_cycle: number;
}

export interface ISegType {
  pk: number;
  name: string;
  factors: IFactor[];
  once_cycle_date: number;
  regular_cycle_date: number;
}
