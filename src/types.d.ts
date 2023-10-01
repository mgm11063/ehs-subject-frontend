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
  is_complete: boolean;
  seg_type: ISegType;
  factors: IFactor[];
}

export interface IFactor {
  pk: number;
  name: string;
  check_cycle: number;
}

export interface ISegType {
  pk: number;
  name: string;
  kind: string;
}
