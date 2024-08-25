import { Component, OnInit } from '@angular/core';
import {
    AdminService,
    BaseComponent,
    Config,
    ECommModelService,
    GlobalConstants,
    GlobalMethods,
    ItemService,
    ModalService,
    ProviderService,
    ValidatingObjectFormat
} from '../index';

@Component({
    selector: 'app-customize',
    templateUrl: './customize.component.html',
    providers: [ECommModelService, ItemService, ModalService]
})

export class CustomizeComponent extends BaseComponent implements OnInit {
    responsiveOptionsCustomize: any = [
        {
            breakpoint: '1440px',
            numVisible: 5,
            numScroll: 1
        },
        {
            breakpoint: '1200px',
            numVisible: 4,
            numScroll: 1
        },
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '439px',
            numVisible: 3,
            numScroll: 1
        }
    ];
    validationMsgObj: ValidatingObjectFormat;
    constructor(
        protected providerSvc: ProviderService,
        public modelSvc: ECommModelService,
        private itmSvc: ItemService,
        public modalService: ModalService,
        private adminSvc: AdminService,
    ) {
        super(providerSvc);
    }

    ngOnInit(): void {
        try {
            this.modalService.setHeader('');
            this.modalService.setWidth('1700px');
            this.modalService.setClass('ecom-modal customize-modal');

            this.modelSvc.setDefaultDataForCustomize();
            this.getUniqueItemWiseTopping(this.modelSvc.selectedItem.uniqueItemCodeID);
        } catch (e) {
            this.showErrorMsg(e);
        }
    }

    getUniqueItemWiseTopping(itemDetailCodeItemID: number) {
        try {
            this.itmSvc.getUniqueItemWiseTopping(itemDetailCodeItemID).subscribe({
                next: (res: any) => {
                    this.modelSvc.toppingItems = this.modelSvc.prepareToppingItemList(res[res.length - 1] || []);

                    let itemImageIDs = [...new Set(this.modelSvc.toppingItems.filter(f => f.imageID > 0).map(item => item.imageID))].join(',');
                    this.getToppingImage(itemImageIDs);
                },
                error: (e: any) => { this.showErrorMsg(e); }
            });
        } catch (e) {
            this.showErrorMsg(e);
        }
    }

    getToppingImage(itemImageIDs:string) {
        try {
          this.adminSvc.getFileHyperLink(itemImageIDs, Config.imageFolders.item).subscribe({
            next: (res: any) => {
                res = res || [];
                this.modelSvc.toppingItems.forEach(element => {
                    let image = res.find(f => f.id == element.imageID);
                    if(image)
                    {
                        element.imageFilePath = GlobalConstants.ERP_MODULES_URL.adminFileRemoteUrl + image.physicalPath;
                    }
                    else{
                        element.imageFilePath = "assets/images/no-image.png";
                    }
                });
            },
            error: (e: any) => { this.showErrorMsg(e); }
          });
        } catch (e) {
          this.showErrorMsg(e);
        }
      }

    closeModal() {
        try {
            this.modelSvc.selectedItem.orderItemToppingList = GlobalMethods.jsonDeepCopy(this.modelSvc.selectedToppingList);
            this.modelSvc.selectedItem.totalToppingPrice = GlobalMethods.jsonDeepCopy(this.modelSvc.totalToppingPrice);
            this.modelSvc.selectedItem.totalToppingOfferPrice = GlobalMethods.jsonDeepCopy(this.modelSvc.totalToppingOfferPrice);
            this.modalService.close(this.modelSvc.selectedItem.orderItemToppingList);
        } catch (e) {
            this.showErrorMsg(e);
        }
    }
}