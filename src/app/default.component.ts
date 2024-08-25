import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    PLATFORM_ID,
    QueryList,
    ViewChildren,
} from "@angular/core";
import { ConfigService } from "./core/services/config.service";
import { GlobalMethods, GlobalConstants } from ".";
import { DataService } from './shared/services/data.service';
import { isPlatformBrowser } from "@angular/common";

@Component({
    selector: "app-default",
    templateUrl: "./default.component.html"
})
export class DefaultComponent implements OnInit, AfterViewInit {
    @ViewChildren(PrimeTemplate) templates: QueryList<any>;
    apiKey?: string;
    constructor(
        private configSvc: ConfigService,
        private dataTransferSvc: DataService,
        private changeDetectorRef: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
      
    }

    ngAfterViewInit() {
    }

    ngOnInit(): void {
        this.setUserInfo();
        this.changeDetectorRef.detectChanges();
    }
    // //Default Data get methods
    onActivate() {
        if(isPlatformBrowser(this.platformId)){
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }

    setUserInfo() {
        let customerInfo = this.configSvc.getLocalStorage("customerInfo");
        if (customerInfo) {
            GlobalConstants.customerInfo.id = customerInfo.id;
            GlobalConstants.customerInfo.mobileNo = customerInfo.mobileNo;
            GlobalConstants.customerInfo.altMobileNo = customerInfo.altMobileNo;
            GlobalConstants.customerInfo.email = customerInfo.email;
            GlobalConstants.customerInfo.name = customerInfo.name;
            GlobalConstants.customerInfo.dOB = customerInfo.dOB;
            GlobalConstants.customerInfo.genderCd = customerInfo.genderCd;
            GlobalConstants.customerInfo.profilePicFileName = customerInfo.profilePicFileName;
            GlobalConstants.customerInfo.memberID = customerInfo.memberID;
            GlobalConstants.customerInfo.availablePoint = customerInfo.availablePoint;
            GlobalConstants.customerInfo.memberType = customerInfo.memberType;
            GlobalConstants.customerInfo.validityPeriod = customerInfo.validityPeriod;
            GlobalConstants.customerInfo.totalOrd = customerInfo.totalOrd;
            if (customerInfo.id != GlobalConstants.customerInfo.id) {
                this.dataTransferSvc.broadcast('customerInfo', GlobalConstants.customerInfo);
            }
        }
       

        GlobalMethods.clearUserInformation();
        GlobalConstants.userInfo.userPKID = this.getRandomUserID();
        GlobalConstants.userInfo.locationID = 1;
    }

    getRandomUserID() {
        try {
            let randomChars = '0123456789';
            let result = '';
            for (let i = 0; i < 9; i++) {
                result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
            }
            return Number(result);
        } catch (e) {
            throw e;
        }
    }
}
function PrimeTemplate(PrimeTemplate: any) {
    throw new Error("Function not implemented.");
}

