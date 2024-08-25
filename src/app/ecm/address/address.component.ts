import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { AddressPicker, addressPickerValidation } from 'src/app/shared/models/common.model';
import { MapMarker } from '@angular/google-maps';
import {
    BaseComponent,
    ECommModelService,
    ECommDataService,
    GlobalConstants,
    GlobalMethods,
    ModalService,
    ProviderService,
    FixedIDs,
    ValidatorDirective
  } from '../index';
@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    providers: [ModalService,ECommModelService, ECommDataService]
})

//google map source code link :  https://github.com/angular/components/tree/main/src/google-maps/google-map, https://developers.google.com/maps/documentation/javascript/reference/map


export class AddressComponent extends BaseComponent implements OnInit, AfterViewInit {
    @ViewChild(ValidatorDirective) directive;
    @ViewChild("addressPickerForm", { static: true, read: NgForm }) addressPickerForm: NgForm;
    validationMsgObj: any;
    zoom: number = 14;
    addressPickerModel: AddressPicker;
    isModal: boolean = false;
    isShowMapAddressInput: boolean = true;
    private geoCoder: any;
    @ViewChild(MapMarker) mapMaker!: MapMarker;
    isShowMap: boolean = false;
    center: any = { lat: 23.804093, lng: 90.4152376 };
    marker = {
        position: { lat: 23.804093, lng: 90.4152376 },
    }

    constructor(
        protected providerSvc: ProviderService,
        private el: ElementRef,
        private ngZone: NgZone,
        public modalService: ModalService,
        public modelSvc: ECommModelService,
        public dataSvc: ECommDataService,
    ) {
        super(providerSvc);
        this.validationMsgObj = addressPickerValidation();
    }

    ngOnInit(): void {
        try {
            this.isModal = this.modalService.isModal;
            this.isShowMap = GlobalMethods.jsonDeepCopy(GlobalConstants.isGoogleMapEnable);

            if (this.isModal) {
                this.modalService.setClass('add-picker-modal');
                this.modalService.setHeader('Address');
                this.modalService.setWidth("");
            }
            this.addressPickerModel = new AddressPicker();

            if(this.modelSvc.storeAddress.length == 0)
            {
                this.getStoreAddress();
            }
        } catch (e) {
            this.showErrorMsg(e);
        }
    }

    ngAfterViewInit(): void {
        try {
            if (this.isShowMap) {
                this.setDefaultData();

                setTimeout(() => {
                    this.setMapAddressValidation();
                }, 100);

            }
            this.isShowMapAddressInput = false;
        } catch (e) {
            this.showErrorMsg(e);
        }
    }


    setDefaultData() {
        try {
            this.addressPickerForm.form.markAsDirty();
            this.geoCoder = new google.maps.Geocoder;
            this.setCurrentLocation();
            var searhEl = this.el.nativeElement.querySelector('#mapAddress');
            let autocomplete = new google.maps.places.Autocomplete(searhEl);
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    //set latitude, longitude and zoom
                    this.addressPickerModel.latitude = place.geometry.location.lat();
                    this.addressPickerModel.longitude = place.geometry.location.lng();
                    this.addressPickerModel.mapAddress = place.formatted_address;
                    this.center = new google.maps.LatLng(this.addressPickerModel.latitude, this.addressPickerModel.longitude);
                    this.mapMaker.marker.setPosition(GlobalMethods.jsonDeepCopy(this.center));
                });
            });
        } catch (e) {
            this.showErrorMsg(e);
        }
    }
    onClickMap($event: any) {
        this.addressPickerModel.latitude = $event.latLng.lat();
        this.addressPickerModel.longitude = $event.latLng.lng();
        this.mapMaker.marker.setPosition(new google.maps.LatLng($event.latLng.lat(), $event.latLng.lng()));
        this.setMapAddress(this.addressPickerModel.latitude, this.addressPickerModel.longitude);
    }

    // Get Current Location Coordinates
    private setCurrentLocation() {
        try {
            let lat = this.center.lat;
            let lng = this.center.lng;
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    lat = position.coords.latitude;
                    lng = position.coords.longitude;
                    this.setMapAddress(lat, lng);
                }, () => {
                    this.setMapAddress(lat, lng);
                });
            }
        } catch (e) {
            throw e;
        }
    }

    setMapAddress(latitude: any, longitude: any) {
        try {
            this.addressPickerModel.latitude = latitude;
            this.addressPickerModel.longitude = longitude;
            this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status: any) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        this.zoom = 15;
                        this.addressPickerModel.mapAddress = results[0].formatted_address;
                    }
                }
            });
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
            if(GlobalConstants.googleApiKey)
            {
                let nearestStore = this.modelSvc.getNearestStore(this.addressPickerModel.latitude, this.addressPickerModel.longitude);
                if(nearestStore.isOutOfRange)
                {
                    this.utilitySvc
                    .showConfirmModal('2123')
                    .subscribe((isConfirm: boolean) => {
                        if (isConfirm) {
                            this.modelSvc.orderTypeCd = FixedIDs.orderType.Takeaway;
                            this.addressPickerModel = null;
                            this.closeModal();
                        }
                    });
                }
                else{
                    this.closeModal();
                }
            }
            else{
                this.closeModal();
            }
        } catch (ex) {
            this.showErrorMsg(ex);
        }
    }

    closeModal() {
        if (this.modalService.isModal) {
            this.modalService.close(this.addressPickerModel);
        }
    }

    onClickChange() {
        this.isShowMapAddressInput = true;
        this.setMapAddressValidation();
    }

    setMapAddressValidation() {
        try {
            const ctrl = this.addressPickerForm.controls['mapAddress'];
            ctrl.setValidators(Validators.required);
            ctrl.updateValueAndValidity();
        } catch (e) {
            throw e;
        }
    }

    getStoreAddress() {
        try {
          this.dataSvc.getStores().subscribe({
            next: (res: any) => {
              if (res) {
                this.modelSvc.storeAddress = res;
    
                if(this.modelSvc.selectedAddress != null)
                {
                  this.modelSvc.storeAddress.forEach(element => {
                    if(element.storeID == this.modelSvc.selectedAddress.storeID)
                    {
                      element.isSelected = true;
                    }
                  });
                }
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

}


