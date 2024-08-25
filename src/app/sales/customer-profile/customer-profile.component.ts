import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, NgForm } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfigService } from 'src/app/core/services/config.service';
import { AddressPickerComponent, FileUploadOption, FixedIDs, GlobalConstants, GlobalMethods, ModalConfig } from 'src/app/shared';
import {
  ProviderService,
  BaseComponent,
  ValidatorDirective,
  CustomerProfileDataService,
  CustomerProfileModelService
} from '../index';
import { CustomerAddress, CustomerDTO, customerProfileValidation } from '../models/customer-profile/customer-profile.model';
@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  providers: [CustomerProfileDataService, CustomerProfileModelService]
})
export class CustomerProfileComponent extends BaseComponent implements OnInit {
  @ViewChild(ValidatorDirective) directive;
  @ViewChild("customerProfileForm", { static: true, read: NgForm }) customerProfileForm: NgForm;
  public validationMsgObj: any;
  ref: DynamicDialogRef;
  maxDate:Date = new Date();
  customImageStyle: string = "max-height: 200px; object-fit: cover;";
  constructor(
    protected providerSvc: ProviderService,
    public modelSvc: CustomerProfileModelService,
    private dataSvc: CustomerProfileDataService,
    public dialogService: DialogService,
    private configSvc: ConfigService,
  ) 
  {
    super(providerSvc);
    this.validationMsgObj = customerProfileValidation();
  }

  ngOnInit(): void {
    try {
      this.modelSvc.customerInfo = new CustomerDTO();
      this.modelSvc.customerProfile = new CustomerDTO();
      this.modelSvc.genderList = FixedIDs.getList(FixedIDs.genders);
      this.modelSvc.prepareCustomerInfo(GlobalConstants.customerInfo);
      this.getCustomerAddress(this.modelSvc.customerInfo.id);
      this.modelSvc.setSingleFileOption();
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  onImageChange() {
    try {
      this.modelSvc.customerProfile.imageFile.deletedFileName = this.modelSvc.customerInfo.profilePicFileName;
      this.modelSvc.customerProfile.profilePicFileName = this.modelSvc.customerProfile.imageFile.fileName;
      this.modelSvc.customerProfile.hasFile = true;
      this.modelSvc.customerProfile.userID = GlobalConstants.userInfo.userPKID;
      this.customerProfileForm.form.markAsDirty();
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  onSubmit(formGroup: NgForm) {
    try {
      if (!formGroup.valid) {
        this.directive.validateAllFormFields(formGroup.form as UntypedFormGroup);
        return;
      }
      this.saveProfile(this.modelSvc.customerProfile);
    } catch (ex) {
      this.showErrorMsg(ex);
    }
  }

  showProfileModal(){
    try {
      this.modelSvc.customerProfile = <CustomerDTO> JSON.parse(JSON.stringify(this.modelSvc.customerInfo));
      if(this.modelSvc.customerProfile.dOB)
      {
        this.modelSvc.customerProfile.dOB = new Date(this.modelSvc.customerProfile.dOB);
      }
      this.modelSvc.isVisibleProfileModal = true;
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  saveProfile(customerDTO: CustomerDTO) {
    try {
      this.modelSvc.isSubmitted = true;
      this.dataSvc.save(customerDTO).subscribe({
        next: (res: any) => {
          this.closeProfileModal();
          this.showMsg(this.messageCode.editCode);
          this.modelSvc.afterProfileSave(res.body);
          this.configSvc.setLocalStorage('customerInfo', GlobalConstants.customerInfo);
        },
        error: (res: any) => {
          this.showErrorMsg(res);
          this.modelSvc.isSubmitted = false;
        },
        complete: () => {
          this.modelSvc.isSubmitted = false;
        }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  closeProfileModal(){
    try {
      this.modelSvc.isVisibleProfileModal = false;
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  getCustomerAddress(customerID:number){
    try {
      this.dataSvc.getCustomerAddressByCustomerID(customerID).subscribe({
        next: (res: any) => {
          if(res)
          {
            this.modelSvc.customerAddressList = res;
          }
        },
        error: (err:any) => { 
          this.showErrorMsg(err);
        },
        complete: () => {
        },
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  showAddressPickerModal() {
    try {
      const modalConfig = new ModalConfig();

      this.ref = this.dialogService.open(AddressPickerComponent, modalConfig);
      this.ref.onClose.subscribe((obj: any) => {
        if (obj) {
          this.modelSvc.prepareCustomerAddress(obj);
          this.saveCustomerAddress(this.modelSvc.customerAddress);
        }
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  saveCustomerAddress(customerAddress:CustomerAddress){
    try {
      let messageCode = customerAddress.id ? this.messageCode.editCode : this.messageCode.saveCode;
      this.dataSvc.saveCustomerAddress(customerAddress).subscribe({
        next: (res: any) => {
          if(res.body)
          {
            this.showMsg(messageCode);
            this.utilitySvc.updateCollection(this.modelSvc.customerAddressList, res.body);
          }
        },
        error: (err:any) => { 
          this.showErrorMsg(err);
        },
        complete: () => {
        },
      });
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  deleteAddress(customerAddress: any) {
    this.utilitySvc
      .showConfirmModal(this.messageCode.confirmDelete)
      .subscribe((isConfirm: boolean) => {
        if (isConfirm) {
          this.dataSvc.deleteCustomerAddress(customerAddress.id).subscribe({
            next: (res: any) => {
              this.utilitySvc.deleteCollection(this.modelSvc.customerAddressList, customerAddress);
              this.showMsg(this.messageCode.deleteCode);
            },
            error: (res: any) => {
              this.showErrorMsg(res);
            },
          });
        }
      });
  }
 
}


