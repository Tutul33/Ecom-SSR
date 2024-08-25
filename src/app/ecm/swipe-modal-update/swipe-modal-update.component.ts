import { Component, OnInit } from '@angular/core';
import {
  ECommDataService,
  ECommModelService,
  BaseComponent,
  ProviderService,
  ModalService,
  FileUploadOption,
  Config,
  GlobalConstants,
  ItemService
} from '../index';

@Component({
  selector: 'app-swipe-modal-update',
  templateUrl: './swipe-modal-update.component.html',
  providers: [ModalService, ECommModelService, ItemService],
})


export class SwipeModalUpdateComponent extends BaseComponent implements OnInit{
  
  itemViewOption: FileUploadOption;
  swipeModalUpdateList: any = [];
  isSelected: boolean = false;
  selectedItem: any = {};

  constructor(
    protected providerSvc: ProviderService,
    public modalService: ModalService,
    public modelSvc: ECommModelService,
    public itemSvc: ItemService,

  )
 {
  super(providerSvc);
 }
  ngOnInit(): void { 
    this.modalService.setHeader('Update Item');
    this.modalService.setClass('ecom-modal swipe-modal');
    this.modalService.setWidth('600px');
    this.itemViewOption = new FileUploadOption();
    this.itemViewOption.folderName = Config.imageFolders.item;
    this.getPOSItemsVariationData(this.modalService.modalData);
    this.modelSvc.isDutyInclude = GlobalConstants.companyInfo.isDutyInclude;
  }

  getPOSItemsVariationData(itemDetailCodeItemID: number) { 
    this.itemSvc.getItemsVariationData(itemDetailCodeItemID).subscribe({ 
      next: (res: any) => { 
        this.swipeModalUpdateList = [];
        this.swipeModalUpdateList = res[res.length - 1] || [];

        this.swipeModalUpdateList.forEach(element => {
          element.isSelected = false;
        }); 

        if(this.swipeModalUpdateList.length == 0)
        {
          this.showMsg("2142");
          this.close();
        }
      },
    });
  }
  

  isSelectedCheck(item: any) {
    try { 
      this.selectedItem = item;
      this.swipeModalUpdateList.forEach(element => {
        if(element.itemDetailCodeItemID != item.itemDetailCodeItemID)
        {
          element.isSelected = false;
        }
        else
        {
          element.isSelected = item.isSelected;
          this.isSelected = item.isSelected;
        }
      });  
    } catch (e) {
      throw e;
    }
  }

  update() {
    try { 
      this.modalService.close(this.selectedItem);
    } catch (e) {
      throw e;
    }
  }

  close() {
    try {
      this.modalService.close();
    } catch (e) {
      throw e;
    }
  }
}
