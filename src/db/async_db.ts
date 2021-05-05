import {MemberStat} from '../models/member.interface';
import {OxyPulseDataType} from '../models/member.interface';
import AsyncStorageUtil from './async-storage';

export const addMember = (member: OxyPulseDataType) => {
  const {id} = member;
  return AsyncStorageUtil.storeData(id, member);
};

export const removeMember = (id: string) => {
  return AsyncStorageUtil.removeData(id);
};

export const updateMember = (
  id: string,
  updatedName: any,
  updatedRelation: any,
  updatedAge: any,
  stat?: any,
) => {
  return getMember(id)
    .then(member => {
      if (member) {
        member.name = updatedName || member.name;
        member.relation = updatedRelation || member.relation;
        member.age = updatedAge || member.age;
        const memberStat: Array<MemberStat> = member.stat || [];
        if (stat) {
          memberStat.push(stat);
        }
        return addMember(member);
      }
    })
    .catch(() => {
      throw 'Error while updating member';
    });
};

export const fetchAllMembers = () => AsyncStorageUtil.getAllData();

export const getMember = (id: string) =>
  fetchAllMembers()
    .then(members => members?.find(member => member?.id === id))
    .catch(() => {
      throw 'Unable to fetch member details';
    });
