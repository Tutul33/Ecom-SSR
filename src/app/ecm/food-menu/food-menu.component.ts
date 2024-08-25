
import { AfterViewInit, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import {
    AdminService,
    BaseComponent,
    Config,
    ECommDataService,
    ECommModelService,
    GlobalConstants,
    GlobalMethods,
    ItemService,
    ProviderService
} from '../index';
import { ViewportScroller } from '@angular/common';
import { forkJoin } from 'rxjs';
@Component({
    selector: 'app-food-menu',
    templateUrl: './food-menu.component.html',
    providers: [ECommDataService, ECommModelService, ItemService]
})

export class FoodComponent extends BaseComponent implements OnInit, AfterViewInit {
    responsiveOptionsCategory: any = [
        {
            breakpoint: '1440px',
            numVisible: 7,
            numScroll: 1
        },
        {
            breakpoint: '1365px',
            numVisible: 6,
            numScroll: 1
        },
        {
            breakpoint: '1024px',
            numVisible: 5,
            numScroll: 1
        },
        {
            breakpoint: '768px',
            numVisible: 4,
            numScroll: 1
        },
        {
            breakpoint: '560px',
            numVisible: 4,
            numScroll: 1
        }
    ];
   
    constructor(
        protected providerSvc: ProviderService,
        public modelSvc: ECommModelService,
        private ecomSvc:ECommDataService,
        private itmSvc: ItemService,
        private adminSvc: AdminService,
        private scroller: ViewportScroller,
        private el: ElementRef
    ) {
        super(providerSvc);
        this.scroller.setOffset([120, 120]);
    }
    ngOnInit(): void {
        try {
            this.modelSvc.isHomePage = false;
            this.modelSvc.isFirstScrolling = true;
            this.modelSvc.prepareDefaultData();
            this.getUniqueItem();
            if(this.modelSvc.mealItemComDetailList.length == 0)
            {
                this.getMealItemComboDetails();
            }
        } catch (e) {
            this.showErrorMsg(e);
        }
    }
    ngAfterViewInit(): void {
        try {
            setTimeout(() => {
                this.scrollToSelectedCategory();
            }, 1000);
        } catch (e) {
            this.showErrorMsg(e);
        }
    }
    getUniqueItem() {
        try {
            this.itmSvc.getUniqueItem().subscribe({
                next: (res: any) => {
                    this.modelSvc.uniqueItemList = res[res.length - 1] || [];

                    let itemImageIDs = [...new Set(this.modelSvc.uniqueItemList.filter(f => f.imageID > 0 && f.isDealItem == false).map(item => item.imageID))].join(',');
                    let mealImageIDs = [...new Set(this.modelSvc.uniqueItemList.filter(f => f.imageID > 0 && f.isDealItem == true).map(item => item.imageID))].join(',');
                    //let categoryImageIDs = [...new Set(this.modelSvc.uniqueItemList.filter(f => f.categoryImageFileID > 0).map(item => item.categoryImageFileID))].join(',');
                    // this.adminSvc.getFileHyperLink(categoryImageIDs, Config.imageFolders.menu),


                    let serviceList = [
                        this.adminSvc.getFileHyperLink(itemImageIDs, Config.imageFolders.item),
                        this.adminSvc.getFileHyperLink(mealImageIDs, Config.imageFolders.meal),
                        this.ecomSvc.getOfferDetailList(this.modelSvc.orderDTO.storeID, GlobalConstants.customerInfo.id)
                    ];
                
                    forkJoin(serviceList).subscribe({
                        next: (results: any) => {
                            this.modelSvc.itemImageList = results[0] || [];
                            this.modelSvc.mealImageList = results[1] || [];
                            this.modelSvc.tempOfferDetailList = results[2] || [];
                            this.modelSvc.offerDetailList = GlobalMethods.jsonDeepCopy(this.modelSvc.tempOfferDetailList);
                            if(this.modelSvc.orderDTO.storeID > 0)
                            {
                              this.modelSvc.offerDetailList = this.modelSvc.offerDetailList.filter(f => f.storeID == this.modelSvc.orderDTO.storeID);
                            }
                            if(GlobalConstants.customerInfo.id > 0)
                            {
                              this.modelSvc.offerDetailList = this.modelSvc.offerDetailList.filter(f => f.memberID == GlobalConstants.customerInfo.id || f.memberID == null);
                            }

                            if(this.modelSvc.tempOfferDetailList.length > 0)
                            {
                                let offerImageIDs = [...new Set(this.modelSvc.tempOfferDetailList.filter(f => f.imageID > 0).map(item => item.imageID))].join(',');
                                if(offerImageIDs)
                                {
                                    this.getOfferImage(offerImageIDs);
                                }
                            }
                            this.modelSvc.availableItems = this.modelSvc.prepareUniqueItemList();
                            this.modelSvc.itemCategories = this.modelSvc.prepareItemCategories();

                            if(this.modelSvc.orderDTO.orderItemList.length > 0)
                            {
                                this.modelSvc.prepareOfferDiscount(this.modelSvc.orderDTO);
                                this.modelSvc.calculateTotalPrice();
                                this.modelSvc.setLocalStorage('orderDTO', this.modelSvc.orderDTO);
                            }
                        },
                        error: (res: any) => {
                            this.showErrorMsg(res);
                        },
                    });
                },
                error: (e: any) => { this.showErrorMsg(e); }
            });
        } catch (e) {
            this.showErrorMsg(e);
        }
    }

    scrollToAnchor(id: number) {
        try {
            this.modelSvc.isScrollToAnchorClick = true;
            this.modelSvc.selectedCategoryID = id;
            this.scroller.scrollToAnchor("section_" + id);
            clearTimeout(this.modelSvc.scrollTimeOut);
            this.modelSvc.scrollTimeOut = setTimeout(() => {
                this.modelSvc.isScrollToAnchorClick = false;
            }, 1000);
        }
        catch (e) {
            this.showErrorMsg(e);
        }
    }

    scrollToSelectedCategory() {
        try {
            this.modelSvc.selectedCategoryID = this.modelSvc.getLocalStorage('selectedCategoryID');
            this.modelSvc.setLocalStorage('selectedCategoryID', null);
            if (this.modelSvc.selectedCategoryID == null) {
                this.modelSvc.selectedCategoryID = this.modelSvc.itemCategories[0].itemDisplayCategoryID;
            }

            if (this.modelSvc.selectedCategoryID > 0) {
                this.scrollToAnchor(this.modelSvc.selectedCategoryID);
            }
        } catch (e) {
            this.showErrorMsg(e);
        }
    }
    onScrollSetActiveClass(){
        try {
            this.modelSvc.activeCategoryElementList = this.el.nativeElement.querySelectorAll('#categoryAnchor' + this.modelSvc.selectedCategoryID);
            this.modelSvc.onScrollSetActiveClass();
        } catch (e) {
            this.showErrorMsg(e);
        }
    }

    @HostListener('window:scroll', ['$event']) onWindowScroll(e) {
        try {
            this.modelSvc.activeCategoryElementList = this.el.nativeElement.querySelectorAll('#categoryAnchor' + this.modelSvc.selectedCategoryID);
            this.modelSvc.sectionList = this.el.nativeElement.querySelectorAll("section");
            this.modelSvc.onWindowScrollSetActiveCategory();
        } catch (e) {
            this.showErrorMsg(e);
        }
    }


    getMealItemComboDetails() {
        try {
          this.itmSvc.getMealItems().subscribe({
            next: (res: any) => {
              let data = res[res.length - 1] || [];
              let itemImageIDs = [...new Set(data.filter(f => f.imageID > 0).map(item => item.imageID))].join(',');
              this.modelSvc.mealItemComDetailList = this.modelSvc.prepareMealItems(data);
              this.getMealItemImage(itemImageIDs);
            },
            error: (e: any) => { this.showErrorMsg(e); }
          });
        } catch (e) {
          this.showErrorMsg(e);
        }
      }

    getMealItemImage(itemImageIDs:string) {
        try {
          this.adminSvc.getFileHyperLink(itemImageIDs, Config.imageFolders.item).subscribe({
            next: (res: any) => {
                res = res || [];
                this.modelSvc.mealItemComDetailList.forEach(element => {
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
    getOfferImage(imageIDs:string) {
        try {
          this.adminSvc.getFileHyperLink(imageIDs, Config.imageFolders.offer).subscribe({
            next: (res: any) => {
              let imageList = res || [];
              this.modelSvc.tempOfferDetailList.forEach(element => {
                let image = imageList.find(f => f.id == element.imageID);
                if(image)
                {
                    element.offerImageFilePath = GlobalConstants.ERP_MODULES_URL.adminFileRemoteUrl + image.physicalPath;
                }
              });
              this.modelSvc.modifyOfferItem();
            },
            error: (e: any) => { this.showErrorMsg(e); }
          });
        } catch (e) {
          this.showErrorMsg(e);
        }
      }
}