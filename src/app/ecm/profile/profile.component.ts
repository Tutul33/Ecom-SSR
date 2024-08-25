import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfigService } from 'src/app/core/services/config.service';
import { FixedIDs, GlobalConstants, ModalConfig } from 'src/app/shared';
import {
    ProviderService,
    BaseComponent,
    ValidatorDirective,
    CustomerProfileDataService,
    CustomerProfileModelService,
    AddressComponent,
    QueryData,
    PointHistoryModalComponent
} from '../index';
import { CustomerAddress, CustomerDTO, customerProfileValidation } from '../models/customer-profile/customer-profile.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    providers: [CustomerProfileDataService, CustomerProfileModelService]
})
export class ProfileComponent extends BaseComponent implements OnInit {
    @ViewChild(ValidatorDirective) directive;
    @ViewChild("customerProfileForm", { static: true, read: NgForm }) customerProfileForm: NgForm;
    public validationMsgObj: any;
    ref: DynamicDialogRef;
    spData: any = new QueryData();
    maxDate: Date = new Date();
    customImageStyle: string = "max-height: 200px; object-fit: cover;";
    editMode: boolean = false;
    constructor(
        protected providerSvc: ProviderService,
        public modelSvc: CustomerProfileModelService,
        private dataSvc: CustomerProfileDataService,
        public dialogService: DialogService,
        private configSvc: ConfigService,
    ) {
        super(providerSvc);
        this.validationMsgObj = customerProfileValidation();
    }

    ngOnInit(): void {
        try {
            this.modelSvc.customerInfo = new CustomerDTO();
            this.modelSvc.genderList = FixedIDs.getList(FixedIDs.genders);
            this.modelSvc.prepareCustomerInfo(GlobalConstants.customerInfo);
            this.getCustomerAddress(this.modelSvc.customerInfo.id);
            this.getMemberPointHistoryList(this.modelSvc.customerInfo.id);
            debugger
            this.getMemberDetailByID(this.modelSvc.customerInfo.id);
            this.modelSvc.setSingleFileOption();
        } catch (e) {
            this.showErrorMsg(e);
        }
    }

    getMemberDetailByID(customerID: number) {
        try {
            this.dataSvc.getMemberDetailByID(customerID).subscribe({
                next: (res: any) => {
                    if (res) {
                      this.modelSvc.customerInfo.availablePoint = res[0].availablePoint;
                    }
                },
                error: (err: any) => {
                    this.showErrorMsg(err);
                },
            });
        } catch (e) {
            this.showErrorMsg(e);
        }
    }

    onImageChange() {
        try {
            this.modelSvc.customerInfo.profilePicFileName = this.modelSvc.customerInfo.imageFile.fileName;
            this.modelSvc.customerInfo.hasFile = true;
            this.customerProfileForm.form.markAsDirty();
        } catch (e) {
            this.showErrorMsg(e);
        }
    }
    onRemoveImage() {
        try {
            this.modelSvc.customerInfo.hasFile = true;
            this.modelSvc.customerInfo.profilePicFileName = null;
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
            this.saveProfile(this.modelSvc.customerInfo);
        } catch (ex) {
            this.showErrorMsg(ex);
        }
    }

    saveProfile(customerDTO: CustomerDTO) {
        try {
            this.modelSvc.isSubmitted = true;
            this.dataSvc.save(customerDTO).subscribe({
                next: (res: any) => {
                    this.showMsg(this.messageCode.editCode);
                    this.modelSvc.afterProfileSave(res.body);
                    this.configSvc.setLocalStorage('customerInfo', GlobalConstants.customerInfo);
                    window.location.reload();
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

    getCustomerAddress(customerID: number) {
        try {
            this.dataSvc.getCustomerAddressByCustomerID(customerID).subscribe({
                next: (res: any) => {
                    if (res) {
                        this.modelSvc.customerAddressList = res;
                    }
                },
                error: (err: any) => {
                    this.showErrorMsg(err);
                },
                complete: () => {
                },
            });
        } catch (e) {
            this.showErrorMsg(e);
        }
    }

    getMemberPointHistoryList(customerID: number) {
        try {
          this.spData = new QueryData({
            pageNo: 0
          });
          this.dataSvc.getMemberPointHistoryList(this.spData, customerID).subscribe({
            next: (res: any) => {
              this.modelSvc.memberPointHistoryList = res[res.length - 1] || [];         
            },
            error: (res: any) => {
              this.showErrorMsg(res);
            }
          });
        } catch (e) {
          this.showErrorMsg(e);
        }
      }

    showAddressPickerModal() {
        try {
            const modalConfig = new ModalConfig();

            this.ref = this.dialogService.open(AddressComponent, modalConfig);
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

    saveCustomerAddress(customerAddress: CustomerAddress) {
        try {
            let messageCode = customerAddress.id ? this.messageCode.editCode : this.messageCode.saveCode;
            this.dataSvc.saveCustomerAddress(customerAddress).subscribe({
                next: (res: any) => {
                    if (res.body.responseSuccess) {
                        this.showMsg(messageCode);
                        this.utilitySvc.updateCollection(this.modelSvc.customerAddressList, res.body);
                    }
                    else{
                        this.showMsg(res.body.responseCode.toString());
                    }
                },
                error: (err: any) => {
                    this.showErrorMsg(err);
                }
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

    showPointHistoryModal(customerID: number) {
        try {
            const modalConfig = new ModalConfig();
            modalConfig.header = "Member Point History";
            modalConfig.data = {
                customerID: customerID,
            }
            this.ref = this.dialogService.open(PointHistoryModalComponent, modalConfig);
            this.ref.onClose.subscribe((obj: any) => {
                if (obj) {
                }
            });
        } catch (e) {
            this.showErrorMsg(e);
        }
    }

}



