import { Component, HostListener, OnInit } from '@angular/core';
import {
  BaseComponent,
  ECommModelService,
  ProviderService,
  ItemService,
  ModalService,
  AdminService,
  Config,
  GlobalConstants,
} from '../index';

@Component({
  selector: 'app-addons',
  templateUrl: './addons.component.html',
  providers: [ECommModelService, ItemService, ModalService]
})
export class AddonsComponent extends BaseComponent implements OnInit {
  userActivity: any;
  addOnList:any = [];
  constructor(
    protected providerSvc: ProviderService,
    public modelSvc: ECommModelService,
    private itmSvc: ItemService,
    private adminSvc: AdminService,
    public modalService:ModalService
  ) {
    super(providerSvc);
  }

  ngOnInit(): void {
    try {
      this.modalService.setHeader('Add on sides Drawer');
      this.modalService.setClass('rightmodal');

      if (this.modelSvc.addOnItems.length == 0) {
        this.getAddOnItems();
      }
      this.setTimerForModalClose();
    } catch (e) {
      this.showErrorMsg(e);
    }
  }
  getAddOnItems() {
    try {
      this.itmSvc.getAddOnItems().subscribe({
        next: (res: any) => {
          this.addOnList = res[res.length - 1] || [];
          let itemImageIDs = [...new Set(this.addOnList.filter(f => f.imageID > 0).map(item => item.imageID))].join(',');
          this.getAddOnImage(itemImageIDs);
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


  setTimerForModalClose(){
    try {
      this.userActivity = setTimeout(
        () => this.modalService.close(),
        10000 // 10 Second
      );
    } catch (e) {
      this.showErrorMsg(e);
    }
  }

  @HostListener('window:mousemove') refreshUserActivityState() {   
    clearTimeout(this.userActivity);
    this.setTimerForModalClose();
  }


}
