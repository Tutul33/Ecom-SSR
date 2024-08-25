
import { Component, HostListener, OnInit } from '@angular/core';
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
import { forkJoin } from 'rxjs';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    providers: [ECommDataService, ECommModelService, ItemService]
})

export class HomeComponent extends BaseComponent implements OnInit {
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
    responsiveOptionsSpecial: any = [
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
        }
    ];
    responsiveOptionsBest: any = [
        {
            breakpoint: '1440px',
            numVisible: 4,
            numScroll: 1
        },
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 1
        }
    ];
    addOnList:any = [];
    constructor(
        protected providerSvc: ProviderService,
        public modelSvc: ECommModelService,
        private ecomSvc:ECommDataService,
        private itmSvc: ItemService,
        private adminSvc: AdminService
    ) {
        super(providerSvc);
    }

    ngOnInit(): void {
        try {
            this.setDefaultData();
        } catch (e) {
            this.showErrorMsg(e);
        }
    }

    setDefaultData() {
        try {
            this.modelSvc.isHomePage = true;
            this.modelSvc.prepareDefaultData();
            this.getUniqueItem();
            if (this.modelSvc.pageConfig.isTopBannerEnable || this.modelSvc.pageConfig.isMB01Enable || this.modelSvc.pageConfig.isMB02Enable || this.modelSvc.pageConfig.isMB03Enable || this.modelSvc.pageConfig.isMB04Enable || this.modelSvc.pageConfig.isBBEnable) {
                this.getHomePageBanner();
            }
            this.getMealItemComboDetails();
        } catch (e) {
            this.showErrorMsg(e);
        }
    }

    getUniqueItem() {
        try {
            this.itmSvc.getUniqueItem().subscribe({
                next: (res: any) => {
                    this.modelSvc.uniqueItemList = res[res.length - 1] || [];

                    if (this.modelSvc.pageConfig.isCategoriesEnable) {
                        this.modelSvc.itemCategories = this.modelSvc.prepareItemCategories();
                        let imageIDs = this.modelSvc.itemCategories.filter(f => f.categoryImageFileID > 0).map(m => m.categoryImageFileID).join(',');
                        this.getItemCategoryImage(imageIDs);
                    }

                    let itemImageIDs = [...new Set(this.modelSvc.uniqueItemList.filter(f => f.imageID > 0 && f.isDealItem == false).map(item => item.imageID))].join(',');
                    let mealImageIDs = [...new Set(this.modelSvc.uniqueItemList.filter(f => f.imageID > 0 && f.isDealItem == true).map(item => item.imageID))].join(',');
                    // this.getUniqueItemImage(itemImageIDs);

                    let serviceList = [
                        this.adminSvc.getFileHyperLink(itemImageIDs, Config.imageFolders.item),
                        this.adminSvc.getFileHyperLink(mealImageIDs, Config.imageFolders.meal),
                        this.ecomSvc.getOfferDetailList(this.modelSvc.orderDTO.storeID, GlobalConstants.customerInfo.id)
                    ];

                    if (this.modelSvc.pageConfig.isAOSEnable) {
                        serviceList.push(this.itmSvc.getAddOnItems());
                    }

                    if (this.modelSvc.pageConfig.isBSIEnable) {
                        serviceList.push(this.itmSvc.getBestSellingItem(this.modelSvc.pageConfig.bsiMNOIWS, this.modelSvc.pageConfig.bsiMNODC, this.modelSvc.pageConfig.bsiCategorys))
                    }
                
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

                            if (this.modelSvc.pageConfig.isTSDEnable) {
                                this.modelSvc.mealList = this.modelSvc.prepareItemList(true, [], []);
                            }

                            if (this.modelSvc.pageConfig.isAOSEnable) {
                                let addOnData = results[3] || [];
                                this.addOnList = addOnData[addOnData.length - 1] || [];
                                let itemImageIDs = [...new Set(this.addOnList.filter(f => f.imageID > 0).map(item => item.imageID))].join(',');
                                this.getAddOnImage(itemImageIDs);
                            }
        
                            if (this.modelSvc.pageConfig.isBSIEnable) {
                                let bestSellingItemData = [];
                                if (this.modelSvc.pageConfig.isAOSEnable)
                                {
                                    bestSellingItemData = results[4] || [];
                                }
                                else{
                                    bestSellingItemData = results[3] || [];
                                }
                                let uniqueItemCodeIDList = bestSellingItemData[bestSellingItemData.length - 1] || [];
                                this.modelSvc.bestSellingItems  = this.modelSvc.prepareItemList(false, uniqueItemCodeIDList, null);
                            }

                            if (this.modelSvc.pageConfig.isAIEnable) {
                                this.modelSvc.availableItems = this.modelSvc.prepareUniqueItemList(this.modelSvc.pageConfig.aICategorys);
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
    getOfferImage(imageIDs:string) {
        try {
          this.adminSvc.getFileHyperLink(imageIDs, Config.imageFolders.offer).subscribe({
            next: (res: any) => {
              let imageList = res || [];
              this.modelSvc.tempOfferDetailList.forEach(element => {
                if(element.imageID)
                {
                    let image = imageList.find(f => f.id == element.imageID);
                    if(image)
                    {
                        element.offerImageFilePath = GlobalConstants.ERP_MODULES_URL.adminFileRemoteUrl + image.physicalPath;
                    }
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

    getAddOnImage(itemImageIDs:string) {
        try {
          this.adminSvc.getFileHyperLink(itemImageIDs, Config.imageFolders.item).subscribe({
            next: (res: any) => {
              if(res.length > 0)
              {
                res.forEach(element => {
                  this.utilitySvc.updateCollection(this.modelSvc.itemImageList, element, 'id');
                });
              }
              this.modelSvc.addOnItems = this.modelSvc.prepareAddOnItemList(this.addOnList);
            },
            error: (e: any) => { this.showErrorMsg(e); }
          });
        } catch (e) {
          this.showErrorMsg(e);
        }
      }

    getItemCategoryImage(imageIDs:string) {
        try {
            this.adminSvc.getFileHyperLink(imageIDs, Config.imageFolders.menu).subscribe({
                next: (res: any) => {
                    if(res.length > 0)
                    {
                        this.modelSvc.itemCategories.forEach(element => {
                            let image = res.find(f => f.id == element.categoryImageFileID);
                            if(image)
                            {
                                element.imageFilePath = GlobalConstants.ERP_MODULES_URL.adminFileRemoteUrl + image.physicalPath;
                            }
                            else{
                                element.imageFilePath = 'assets/images/no-image.png';
                            }
                        });
                    }
                },
                error: (e: any) => { this.showErrorMsg(e); }
            });
        } catch (e) {
            this.showErrorMsg(e);
        }
    }
    getHomePageBanner() {
        try {
            this.adminSvc.getHomePageBanner().subscribe({
                next: (bannerList: any) => {
                    if(bannerList.length > 0)
                    {
                        let bannerTemplateImageIDs = [...new Set(bannerList.filter(f => f.imageID > 0 && f.isBannerTemplate == true).map(item => item.imageID))].join(',');
                        let pageBannerImageIDs = [...new Set(bannerList.filter(f => f.imageID > 0 && f.isBannerTemplate == false).map(item => item.imageID))].join(',');
    
                        forkJoin([
                            this.adminSvc.getFileHyperLink(bannerTemplateImageIDs, Config.imageFolders.bannertemplate),
                            this.adminSvc.getFileHyperLink(pageBannerImageIDs, Config.imageFolders.pageBannerAttechment)
                        ]).subscribe({
                            next: (results: any) => {
                                let bannerTemplateImageList = results[0] || [];
                                let pageBannerImageList = results[1] || [];
    
                                bannerList.forEach(element => {
                                    if(element.imageID > 0)
                                    {
                                        let image = null;
                                        if(element.isBannerTemplate)
                                        {
                                            image = bannerTemplateImageList.find(f => f.id == element.imageID);
                                        }
                                        else{
                                            image = pageBannerImageList.find(f => f.id == element.imageID);
                                        }

                                        if(image)
                                        {
                                            element.imageFilePath = GlobalConstants.ERP_MODULES_URL.adminFileRemoteUrl + image.physicalPath;
                                        }
                                        else{
                                            element.imageFilePath = 'assets/images/no-image.png';
                                        }
                                    }
                                });
    
                                this.modelSvc.prepareBannerList(bannerList);
                            },
                            error: (res: any) => {
                                this.showErrorMsg(res);
                            },
                        });
                    }
                },
                error: (e: any) => { this.showErrorMsg(e); }
            });
        } catch (e) {
            this.showErrorMsg(e);
        }
    }

    getBannerImage(itemImageIDs:string) {
        try {
          this.adminSvc.getFileHyperLink(itemImageIDs, Config.imageFolders.item).subscribe({
            next: (res: any) => {
              if(res.length > 0)
              {
                this.modelSvc.addOnItems.forEach(element => {
                  let image = res.find(f => f.id == element.imageID);
                  if(image)
                  {
                      element.imageFilePath = GlobalConstants.ERP_MODULES_URL.adminFileRemoteUrl + image.physicalPath;
                  }
                  else{
                      element.imageFilePath = "assets/images/no-image.png";
                  }
                });
              }
            },
            error: (e: any) => { this.showErrorMsg(e); }
          });
        } catch (e) {
          this.showErrorMsg(e);
        }
      }


    navigateSpecialItem(title: string, list: any) {
        try {
            this.modelSvc.setSpecialItemToLocalStorage(title, list);
            this.modelSvc.setLocalStorage('mealItemComDetailList', this.modelSvc.mealItemComDetailList);
            this.router.navigateByUrl('/special-item');
        } catch (e) {
            console.log(e);

            this.showErrorMsg(e);
        }
    }

    navigateFoodMenu(category: any) {
        try {
            this.modelSvc.setLocalStorage('selectedCategoryID', category.itemDisplayCategoryID);
            this.router.navigateByUrl('/food-menu');
        } catch (e) {
            this.showErrorMsg(e);
        }
    }

    @HostListener('window:scroll', ['$event']) onWindowScroll(e) {
        try {
            var scroll = window.scrollY;
            const scrollNav = document.getElementById('scroller-nav');
            if(scroll >= 275)
            {
                scrollNav.classList.add("adNav");
            }
            else{
                scrollNav.classList.remove("adNav");
            }
        } catch (e) {
            this.showErrorMsg(e);
        }
    }


    getMealItemComboDetails() {
        try {
          this.itmSvc.getMealItems().subscribe({
            next: (res: any) => {
              let data = res[res.length - 1] || [];
             // let itemImageIDs = data.filter(f => f.imageID > 0).map(item => item.imageID).join(',');
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
    //   getMealItemComboDetails() {
    //     try {
    //       this.data.getMealItems().subscribe({
    //         next: (res: any) => {
    //           let data = res[res.length - 1] || [];
    //          // let itemImageIDs = data.filter(f => f.imageID > 0).map(item => item.imageID).join(',');
    //           let itemImageIDs = [...new Set(data.filter(f => f.imageID > 0).map(item => item.imageID))].join(',');
    //           this.modelSvc.mealItemComDetailList = this.modelSvc.prepareMealItems(data);
    //           this.getMealItemImage(itemImageIDs);
    //         },
    //         error: (e: any) => { this.showErrorMsg(e); }
    //       });
    //     } catch (e) {
    //       this.showErrorMsg(e);
    //     }
    //   }

}