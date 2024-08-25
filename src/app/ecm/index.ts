/// * Services */
export { ModalService } from '../shared/services/modal.service';
export { ApiService } from '../shared/services/api.service';

export { CustomerProfileDataService, CustomerProfileModelService } from './services/customer-profile/customer-profile.service';
export { SalesDataService } from './services/sales/sales.service';
export { ECommDataService } from './services/e-comm/e-comm-data.service';
export { ECommModelService } from './services/e-comm/e-comm-model.service';
export { ItemService } from './services/item/item.service';
export { AdminService } from '../app-shared/services/admin.service';

export { AuthenticationService } from '../login/services/authentication.service';
export { AppMsgService } from '../shared/services/app-msg.service';
export { ProviderService } from '../core/services/provider.service';

/// * Components */
export { NiMultipleFileViewComponent } from "../shared/components/ni-multiple-file-view/ni-multiple-file-view.component";
export { FileUploadComponent } from 'src/app/shared/components/file-upload/file-upload.component';
export { BaseComponent } from '../shared/components/base/base.component';

/// * Directive */
export { ValidatorDirective } from '../shared/directives/validator.directive';

/// * Page Component */
export { HomeComponent } from './home/home.component';
export { FoodComponent } from './food-menu/food-menu.component';
export { CartComponent } from './cart/cart.component';
export { CustomizeComponent } from './customize/customize.component';
export { CheckoutComponent } from './checkout/checkout.component';
export { AddressComponent } from './address/address.component';
export { SuccessComponent } from './success/success.component';
export { OrdersComponent } from './orders/orders.component';
export { ProfileComponent } from './profile/profile.component';
export { EditprofileComponent } from './edit-profile/edit-profile.component';
export { BannerComponent } from './banner/banner.component';
export { SpecialItemComponent } from './special-item/special-item.component';
export { AddonsComponent } from './addons/addons.component';
export { OrderTypeComponent } from './order-type/order-type.component';
export { SpicyOptionComponent } from './spicy-option/spicy-option.component';
export { ChooseUnitComponent } from './choose-unit/choose-unit.component';
export { ItemComponent } from './item/item.component';
export { OrderListComponent } from './order-list/order-list.component';
export { OrderDetailComponent } from './order-detail/order-detail.component';
export { OrderTrackComponent } from './order-track/order-track.component';
export { AddressModalComponent } from './address-modal/address-modal.component';
export { StoreAddressComponent } from './store-address/store-address.component';
export { EcomComponent } from './ecom/ecom.component';
export { BannerItemDisplayComponent } from './banner-item-display/banner-item-display.component';
export { StoreAddressDetailComponent } from './store-address-detail/store-address-detail.component';
export { SwipeModalComponent } from './swipe-modal/swipe-modal.component';
export { SwipeModalChangeComponent } from './swipe-modal-change/swipe-modal-change.component';
export { SwipeModalUpdateComponent } from './swipe-modal-update/swipe-modal-update.component';
export { SwipeModalSpicyComponent } from './swipe-modal-spicy/swipe-modal-spicy.component';
export { PointHistoryModalComponent } from './point-history-modal/point-history-modal.component';
export { CouponComponent } from './coupon/coupon.component';
export { RedeemPointsComponent } from './redeem-points/redeem-points.component';


export {
  QueryData,
  FileOptions,
  ExportOptionInterface,
  ExportOption,
  FileUploadOption,
  ModalConfig,
  GridOption,
  ColumnType,
  ICharachterLength,
  IRange
} from '../shared/models/common.model';

export { Config } from '../app-shared/models/config';
export { ValidatingObjectFormat, GlobalConstants } from 'src/app/app-shared/models/javascriptVariables';
export { DynamicDialogRef } from 'primeng/dynamicdialog';
export { GlobalMethods } from 'src/app/core/models/javascriptMethods';
export { FixedIDs } from 'src/app/app-shared/models/fixedIDs';


