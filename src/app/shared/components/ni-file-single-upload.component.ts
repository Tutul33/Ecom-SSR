import { AfterContentInit, Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FileUploadService } from '../services/file-upload.service';
import { BaseComponent, FixedIDs, ProviderService } from 'src/app/shared';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-ni-file-single-upload',
  template: `
    <label for="file-photo{{this.uploadOption.fileTick}}" class="file-photo">
      <input
        [accept]="this.uploadOption.acceptedFiles"
        (change)="onSelectFile($event)"
        [disabled]="disabled"
        title="{{fieldTitle['choosefile']}}"
        type="file"
        id="file-photo{{this.uploadOption.fileTick}}"
      />
      <div class="area-titles d-flex align-items-center justify-content-start">
        <span class="browse-title">{{fieldTitle['browse']}}</span>
        <span class="file-title">{{fieldTitle['choosefile']}}</span>
      </div>
    </label>
    <button type="button"
      *ngIf="targetObject.fileName"
      (click)="removeImage()"
      class="btn  btn-danger"
    >
      {{fieldTitle['remove']}}
    </button>
  `, 
  styles: [
    `
    .file-photo{
      width:100%;
      height:44px;
      background:#f2f3f8;
      border:1px solid #d9d9d9;
      border-radius:5px;
      position:relative;
      cursor:pointer;
      top:3px;
    }
    .file-photo input[type="file"]{
      display:none;
    }
    .file-photo .area-titles{
      position:absolute;
      top:2px;
      left:0;
    }
    .file-photo .area-titles span.browse-title{
      line-height:42px;
      font-size:14px;
      height:42px;
      color:#fff;
      background:#80868b;
      padding:0 8px;
      margin-left:0;
      border-radius:5px 0 0 5px;
    }
    .file-photo .area-titles span.file-title{
      line-height:42px;
      font-size:14px;
      height:42px;
      color:#000;
    }
    `
  ],
})
export class NiFileSingleUploadComponent extends BaseComponent implements OnInit, AfterContentInit {
  // tslint:disable-next-line: no-input-rename
  @Input('uploadOption') uploadOption: any;
  // tslint:disable-next-line: no-input-rename
  @Input('targetObject') targetObject: any;
  @Input('targetForm') targetForm: UntypedFormGroup;
  @Input('disabled') disabled: boolean = false;

  @Output() removeEvent: EventEmitter<any> = new EventEmitter();
  selectedFile: File;
 

  constructor(private fileUploadService: FileUploadService,protected providerSvc: ProviderService,@Inject(PLATFORM_ID) private platformId: any,
) { super(providerSvc);}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    
  }

  // browse from computer
  onSelectFile(event): void {
    if(isPlatformBrowser(this.platformId))
      {      
       this.selectedFile = event.target.files.item(0);
       this.targetForm?.markAsDirty();

       if (this.selectedFile) {
      if (
        this.fileUploadService.isSelectedFileValid(
          this.selectedFile.name,
          this.uploadOption.acceptedFiles
        )
      ) {

        if (this.targetObject.deletedFileName == null) {
          this.targetObject.deletedFileName = this.targetObject.fileName;
        }

        this.targetObject.id === undefined ? 0 : this.targetObject.id;
        this.targetObject.fileName = this.selectedFile.name;
        this.targetObject.fileObject = this.selectedFile;
        this.targetObject.folderName = this.uploadOption.folderName;
        this.targetObject.fileTick = this.uploadOption.fileTick;
        this.targetObject.isUploaded = false;
        this.targetObject.tag = FixedIDs.objectState.detached;

        this.targetObject.busyIcon = true;
        

        const reader = new FileReader();
        reader.onload = (innerEvent: any) => {
          const src = innerEvent.target.result;
          this.targetObject.filePath = null;
          this.targetObject.fileSrc = src;
          this.fileUploadService.setThubnail(this.targetObject);
        };

        if (this.targetObject.fileObject && this.targetObject.fileObject.size) {
          reader.readAsDataURL(this.targetObject.fileObject as File);
        } else {
          // this.loadImageFromServer(false);
        }
        // upload file
        this.fileUploadService.singleUploadFile(
          this.uploadOption,
          this.targetObject
        ).subscribe();
      } else {
        alert(
          'System found some unexpected files: ' +
            this.selectedFile.name +
            '; allowed extensions are: ' +
            this.uploadOption.acceptedFiles
        );
      }
      event.currentTarget.value = '';
    }
  }
  }

  removeImage() {
    if (this.targetObject.deletedFileName == null) {
      this.targetObject.deletedFileName = this.targetObject.fileName;
    }
    this.targetObject.fileName = null;
    this.targetObject.fileObject = null;
    this.targetObject.fileSrc = null;
    this.targetObject.isUploaded = false;
    this.targetObject.tag = FixedIDs.objectState.detached;

    // set not found tumbnil
    const data = this.fileUploadService.setNotFoundImage();
    this.targetObject.fileSrc = data.fileStream;
    this.targetObject.filePath = data.filePath;
    this.fileUploadService.setThubnail(this.targetObject);
    this.targetForm?.markAsDirty();
     
    this.removeEvent?.emit('Some value to send to the parent');
  }
}
