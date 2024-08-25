import { Injectable } from '@angular/core';
import { Config } from '../../index';
import { FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { CustomerAddress, CustomerDTO } from '../../models/customer-profile/customer-profile.model';
import { ApiService } from '../..';
import { FileUploadOption, FixedIDs, GlobalConstants, GlobalMethods } from 'src/app/shared';
import { formatDate } from '@angular/common';
import { ImageFile } from 'src/app/shared/models/common.model';
@Injectable()
export class CustomerProfileDataService {
  controllerName = Config.url.ecomLocalUrl + "CustomerProfile";

  constructor(private apiSvc: ApiService) { }

  save(customer: CustomerDTO): Observable<any> {
    try {
      return this.apiSvc.save(`${this.controllerName}/Save`, customer, true);
    } catch (e) {
      throw e;
    }
  }
  getCustomerAddressByCustomerID(customerID: number) {
    return this.apiSvc
      .executeQuery(`${this.controllerName}/GetCustomerAddressByCustomerID`, { customerID: customerID })
      .pipe(
        map((response: any) => {
          return response.body;
        })
      );
  }
  saveCustomerAddress(customerAddress: CustomerAddress): Observable<any> {
    return this.apiSvc.save(`${this.controllerName}/SaveCustomerAddress`, customerAddress, true);
  }
  deleteCustomerAddress(id: number) {
    return this.apiSvc.removeByID(`${this.controllerName}/DeleteCustomerAddress`, id).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}

@Injectable()
export class CustomerProfileModelService {
  customerInfo: CustomerDTO;
  customerProfile: CustomerDTO;
  isVisibleProfileModal: boolean = false;
  genderList: any = [];
  customerAddressList: any = [];
  customerAddress: CustomerAddress;
  singleFileUploadOption: FileUploadOption;
  isSubmitted: boolean = false;
  constructor() {
  }

  prepareCustomerInfo(customerInfo: any) {
    try {
      this.customerInfo = new CustomerDTO(customerInfo);
      this.customerInfo.displayDOB = null;
      this.customerInfo.gender = null;
      if (this.customerInfo.dOB) {
        this.customerInfo.displayDOB = formatDate(this.customerInfo.dOB, FixedIDs.fixedIDs.format.shortMonthDateFormat, "en");
        this.customerInfo.dOB = new Date(this.customerInfo.displayDOB);
      }

      if (this.customerInfo.genderCd) {
        let gender = this.genderList.filter(a => a.value == this.customerInfo.genderCd)[0];
        if (gender) {
          this.customerInfo.gender = gender.text;
        }
      }
      this.customerInfo.imageFile = new ImageFile();
      this.customerInfo.imageFile.photoID = customerInfo.id;
      this.customerInfo.imageFile.fileName = customerInfo.profilePicFileName;
      this.customerInfo.imageFile.folderName = Config.imageFolders.user;

    } catch (e) {
      throw e;
    }
  }

  afterProfileSave(customerProfile: any) {
    try {
      let customerInfo = <CustomerDTO>JSON.parse(JSON.stringify(customerProfile));
      this.prepareCustomerInfo(customerInfo);

      GlobalConstants.customerInfo.altMobileNo = this.customerInfo.altMobileNo;
      GlobalConstants.customerInfo.email = this.customerInfo.email;
      GlobalConstants.customerInfo.name = this.customerInfo.name;
      GlobalConstants.customerInfo.dOB = this.customerInfo.dOB;
      GlobalConstants.customerInfo.genderCd = this.customerInfo.genderCd;
      GlobalConstants.customerInfo.profilePicFileName = this.customerInfo.profilePicFileName;
    } catch (e) {
      throw e;
    }
  }

  prepareCustomerAddress(address: any) {
    try {
      this.customerAddress = new CustomerAddress(address);
      this.customerAddress.customerID = GlobalConstants.customerInfo.id;
      this.customerAddress.latitude = address.latitude.toString();
      this.customerAddress.longitude = address.longitude.toString();
      this.customerAddress.mapAddress = address.mapAddress;
    } catch (e) {
      throw e;
    }
  }

  setSingleFileOption() {
    try {
      this.singleFileUploadOption = new FileUploadOption();
      this.singleFileUploadOption.folderName = Config.imageFolders.user;
      this.singleFileUploadOption.uploadServiceUrl = 'File/UploadFiles';
      this.singleFileUploadOption.acceptedFiles = '.png,.jpg,.jpeg,.gif';
      this.singleFileUploadOption.fileTick = GlobalMethods.timeTick();
      this.customerProfile.imageFile = new ImageFile();
      this.customerProfile.imageFile.fileTick = GlobalMethods.timeTick();
    } catch (e) {
      throw e;
    }
  }
}




