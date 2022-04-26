import {
  getSpecializationRequest,
  getSpecializationsRequest,
} from "api/specializations";
import { makeAutoObservable } from "mobx";
import { Specialization } from "./types";

class SpecializationsStore {
  public loading: boolean = false;
  public specializations: Specialization[] | null = null;
  public specialization: Specialization | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public getSpecializations() {
    this.loading = true;
    return getSpecializationsRequest().then(
      ({ data }: { data: Specialization[] }) => {
        this.loading = false;
        this.specializations = data;
      }
    );
  }

  public getSpecialization(id: number) {
    this.loading = true;
    return getSpecializationRequest(id).then(
      ({ data }: { data: Specialization }) => {
        this.loading = false;
        this.specialization = data;
      }
    );
  }
}

export default new SpecializationsStore();
