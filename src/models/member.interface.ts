export interface Member {
  id: string;
  name: string;
  relation: Relation | string;
  age: number;
}

export enum Relation {
  SELF = 'SELF',
  FATHER = 'FATHER',
  MOTHER = 'MOTHER',
  BROTHER = 'BROTHER',
  SISTER = 'SISTER',
  SON = 'SON',
  DAUGHTER = 'DAUGHTER',
  HUSBAND = 'HUSBAND',
  WIFE = 'WIFE',
  OTHER = 'OTHER',
}

export interface MemberStat {
  timestamp: number;
  oxy_sat: number;
  pulse_rate: number;
  temperature: number | '-';
}

export type OxyPulseDataType = Member & {
  stat: Array<MemberStat> | [];
};
