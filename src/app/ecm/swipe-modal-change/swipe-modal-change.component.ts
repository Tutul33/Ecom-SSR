import { Component, OnInit } from '@angular/core';
import {
  FileUploadOption,
  ModalService,
  Config,
  ItemService,
  BaseComponent,
  ProviderService
} from '../index';

@Component({
  selector: 'app-swipe-modal-change',
  templateUrl: './swipe-modal-change.component.html',
  providers: [ModalService, ItemService],
})

export class SwipeModalChangeComponent extends BaseComponent implements OnInit{
  
  itemViewOption: FileUploadOption;
  swipeModalChangeList: any = [];
  isSelected: boolean = false;
  selectedItem: any = {};

  constructor(
    protected providerSvc: ProviderService,
    public modalService: ModalService,
    public itemSvc: ItemService,

  )
 {
  super(providerSvc);
 }

  ngOnInit(): void { 
    this.modalService.setHeader('Change Item');
    this.modalService.setClass('ecom-modal swipe-modal');
    this.modalService.setWidth('600px');
    this.itemViewOption = new FileUploadOption();
    this.itemViewOption.folderName = Config.imageFolders.item;
    this.getPOSItemsSwipeData(this.modalService.modalData.mealItemDetailID); 
  }


  getPOSItemsSwipeData(mealItemDetailID:number) { 
    this.itemSvc.getItemsSwipeData(mealItemDetailID).subscribe({
      next: (res: any) => {
        this.swipeModalChangeList = res[res.length - 1] || [];

        this.swipeModalChangeList.forEach(element => {
          element.isSelected = false;
        }); 
      },
    });
  }

  isSelectedCheck(item: any) {
    try { 

      this.selectedItem = item;
      this.swipeModalChangeList.forEach(element => {
        if(element.mealItemDetailID != item.mealItemDetailID)
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
