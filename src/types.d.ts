export interface ICompanyList {
  pk: number;
  name: string;
  user: number;
}

export interface ICompany {
  staffs: ICompanyStaff[];
}

export interface ICompanyStaff {
  pk: number;
  name: string;
  is_office: boolean;
  g_examination: string;
  s_examination: string;
  join_date: string;
  examination_date: string;
  is_night: boolean;
  seg_type: ISegType;
  factors: IFactor[];
}
interface FactorOption {
  value: string;
  label: string;
}

export interface IFactor {
  value: number;
  label: string;
}

export interface ISegType {
  pk: number;
  name: string;
  kind: string;
}
