import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {
   
    constructor() {}
    private fullName$ = new BehaviorSubject<string>(""); // Initialize with empty string
    private role$ = new BehaviorSubject<string>("");


    public getRoleFromStore(): Observable<string> {
        return this.role$.asObservable();
    }

    public setRoleFromStore(role: string) {
        this.role$.next(role);
    }

    public getFullNameFromStore(): Observable<string> {
        return this.fullName$.asObservable();
    }

    public setFullNameForStore(fullname: string) {
        this.fullName$.next(fullname);
    }
}