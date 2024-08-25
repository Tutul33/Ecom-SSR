import { map } from 'rxjs/operators';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import {
  Config,
  QueryData,
  ApiService,
  GlobalConstants,
  AdminService,
  FixedIDs
} from '../index';
import { GlobalMethods } from 'src/app/app-shared';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { FileUploadOption } from 'src/app/shared/models/common.model';
import { isPlatformBrowser } from '@angular/common';
//import { InvoiceAttachmentDTO } from 'src/app/ecm/models/order/order.model';

@Injectable({
  providedIn: 'root',
})

export class OrderSalesReportService {
  spData: any = new QueryData();
  controllerName = Config.url.ecomLocalUrl + "EComm";
  constructor(private apiSvc: ApiService, private adminSvc: AdminService, private fileUploadSvc: FileUploadService,@Inject(PLATFORM_ID) private platformId: Object) 
  { 
    this.spData.pageNo = 0; 
  }
  isShowBarcodeForInvoice: boolean = false;
  isShowDlvDateForInvoice: boolean = false;
 
  static salesPageConfig = {
    BudgetPlanning: 1,
    DeliveryTimeSet: 2,
    TableConfigurationWithOrder:3,
    NotificationSoundConfiguration:4,
    NotificationColorAndTimeSetUp:5,
    MinimumDeliverycharge:6,
    ShowDrliveryDate:7,
    ShowBarcode:8,
    POSConfig:9,
  };


  getReport(entity: any): Observable<any> {
    return this.apiSvc.post(Config.url.ecomLocalUrl + 'Report/ShowReport', entity);
  }

  getReports(entity: any) {
    return this.apiSvc.post(Config.url.ecomLocalUrl + 'Report/ShowReports', entity);
  }

  getReportStreams(reportData: any){
    return this.apiSvc.post(Config.url.ecomLocalUrl + 'Report/GetBytesReportStreams', reportData);
  }

  saveInvoiceAttachment(entity: any): Observable<any> {
    try {
      return this.apiSvc.save(Config.url.ecomLocalUrl + 'EComm/SaveInvoiceAttachment', entity, true);
    } catch (e) {
      throw e;
    }
  }

  private printReport(reportData: any, printCopyNo?: number): Observable<any> {
    try {
     return this.getReport(reportData).pipe(
      map((res: any) => {
          let pdfName = res.body.message;
          printCopyNo = printCopyNo > 0 ? printCopyNo : 1;
          if (isPlatformBrowser(this.platformId)) {
          for (let index = 0; index < printCopyNo; index++) {
            window.open(Config.url.ecomReportFileUrl + pdfName, '_blank');
          }
        }
          return of(true);
        })
     );
    } catch (e) {
      return of(e);
    }
  }
  private printReports(reportData: any, printCopyNo?: number) {
    
    try {
      this.getReports(reportData).subscribe({
        next: async (res: any) => {
          let pdfName = res.body.message;
          printCopyNo = printCopyNo > 0 ? printCopyNo : 1;
          if (isPlatformBrowser(this.platformId)) {
          for (let index = 0; index < printCopyNo; index++) {
            window.open(Config.url.ecomReportFileUrl + pdfName, '_blank');
          }
        }
        },
        error: (res: any) => { },
      });
    } catch (e) {
      throw e;
    }
  }

  private callBackPrint(dataList:any, index:number, printCopyNo:any){
    try {
      this.printReport(dataList[index], printCopyNo).subscribe({
        next: (res: any) => {
          if(res)
          {
            if((dataList.length - 1) > index)
            {
              index++;
              this.callBackPrint(dataList, index, printCopyNo);
            }
          }
        },
        error: (e: any) => {
          throw e;
         },
      });
    } catch (e) {
      throw e;
    }
  }

  /******************* print invoice start  ************************/
  printInvoice(invoiceID: number, printCopyNo?: number) {
    try {
      forkJoin([
        this.getOrderInvoice(invoiceID),
        this.getOrderInvoicePaymentMode(invoiceID),
        this.getTermsAndConditions(),
        this.adminSvc.getModuleWisePageConfig(GlobalConstants.ERP_MODULES.SLS.name, OrderSalesReportService.salesPageConfig.ShowBarcode),
        this.adminSvc.getModuleWisePageConfig(GlobalConstants.ERP_MODULES.SLS.name, OrderSalesReportService.salesPageConfig.ShowDrliveryDate),
        this.adminSvc.getReportLayoutName(FixedIDs.reportName.Invoice)
      ]).subscribe({
        next: (results: any) => {
          let orderInvoice = results[0] || [];
          let paymentMode = results[1] || [];
          let termsAndCond = results[2] || [];
          let bacodeConfig = results[3] || [];
          let dlevDateConfig = results[4] || [];
          let reportLayout = results[5] || [];

          let layoutName = 'SalesInvoice';
          if(reportLayout.length > 0) layoutName = reportLayout[0].layoutName;
          
          let isShowBarcodeForInvoice = bacodeConfig.filter(a => a.value == FixedIDs.pageConfigType.SHWBRCII)[0].isActive || false;
          let isShowDlvDateForInvoice = dlevDateConfig.filter(a => a.value == FixedIDs.pageConfigType.SHWDLVDTI)[0].isActive || false;
          if(orderInvoice.length>0){
            var rptHeight = GlobalConstants.printInvoiceConfig.initialPageHeight + (orderInvoice.length * GlobalConstants.printInvoiceConfig.perItemHeight);
            let reportData = this.prepareInvoiceOption(orderInvoice, paymentMode, termsAndCond, isShowBarcodeForInvoice, isShowDlvDateForInvoice, rptHeight, layoutName);
            this.printReports(reportData, printCopyNo);
        }
        },
        error: (res: any) => {
          throw res;
        }
      });
    } catch (e) {
      throw e;
    }
  }

  getOrderInvoice(invoiceID: number) {
    return this.apiSvc
      .executeQuery(`${this.controllerName}/GetOrderInvoice`, { invoiceID: invoiceID, data: JSON.stringify(this.spData) })
      .pipe(
        map((response: any) => {
          return response.body[response.body.length - 1] || [];
        })
      );
  }

  getOrderInvoicePaymentMode(invoiceID: number) {
    return this.apiSvc
      .executeQuery(`${this.controllerName}/GetOrderInvoicePaymentMode`, { invoiceID: invoiceID, data: JSON.stringify(this.spData) })
      .pipe(
        map((response: any) => {
          return response.body[response.body.length - 1] || [];
        })
      );
  }

  getTermsAndConditions(keyCode?: string) {
    return this.apiSvc
      .executeQuery(`${this.controllerName}/GetTermsAndConditions`, { keyCode: keyCode || '' })
      .pipe(
        map((response: any) => {
          return response.body;
        })
      );
  }

  prepareInvoiceOption(invDataList: any, payModeList: any, termsList: any, isShowBarcodeForInvoice:boolean, isShowDlvDateForInvoice:boolean, rptHeight:any, layoutName:any) {
    try {
      var reportData = [];
      reportData.push(this.prepareRptInvoiceOption(invDataList, isShowBarcodeForInvoice, isShowDlvDateForInvoice, rptHeight, layoutName));
      reportData.push(this.prepareInvSummary(invDataList));
      reportData.push(this.prepareRptPayModeOption(payModeList));
      reportData.push(this.prepareRptTermsOption(termsList));
      return reportData;
    } catch (e) {
      throw e;
    }
  }

  prepareRptInvoiceOption(reportData: any[], isShowBarcodeForInvoice:boolean, isShowDlvDateForInvoice:boolean, rptHeight:any, layoutName:any) {
    try {
      return {
        reportName: layoutName,
        reportType: FixedIDs.reportRenderingType.PDF,
        userID: GlobalMethods.timeTick(),
        data: reportData,
        pageHeight: rptHeight,
        params: this.getInvParameter(isShowBarcodeForInvoice, isShowDlvDateForInvoice),
        dataColumns: this.getInvColumnHeader(),
        dataSetName: "spSLS_GetOrderInvoice",
        barcode: "BarCode",
        barCodeWidth: 500,
        barCodeHeight: 100,
        fontSize: '30pt',
        isBarCodeLabelShow: false
      };
    } catch (e) {
      throw e;
    }
  }

  getInvParameter(isShowBarcodeForInvoice:boolean, isShowDlvDateForInvoice:boolean) {
    try {
      var params = [
        { key: 'CompanyLogoUrl', value: GlobalConstants.companyInfo.companyLogoUrl },
        { key: 'CompanyAddress', value: GlobalConstants.companyInfo.companyAddress },
        { key: 'CompanyEmail', value: GlobalConstants.companyInfo.companyEmail },
        { key: 'CompanyWebSiteAdd', value: GlobalConstants.companyInfo.companyWebSiteAdd },
        { key: 'BinNo', value: GlobalConstants.companyInfo.binNo },
        { key: 'Mushak', value: GlobalConstants.companyInfo.mushak },
        { key: 'IsBarcodeShow', value: isShowBarcodeForInvoice ? 'True' : 'False' },
        { key: 'IsDeliveryTimeShow', value: isShowDlvDateForInvoice ? 'True' : 'False' },
      ];
      return params;
    } catch (e) {
      throw e;
    }
  }

  getInvColumnHeader() {
    try {
      var columns = [
        { key: 'Qty', value: 'Qty' },
        { key: 'UOMSN', value: 'Unit' },
        { key: 'ItemDetail', value: 'ItemDetail' },
        { key: 'UnitPrice', value: 'UnitPrice' },
        { key: 'TotalPrice', value: 'TotalPrice' },
      ];
      return columns;
    } catch (e) {
      throw e;
    }
  }

  prepareInvSummary(invDataList:any) {
    try {
      var invoice = invDataList[0];
      let list = [];
      list.push({'Property': 'Sub Total', Value : invoice.subTotal});
      if(invoice.totalDiscount) list.push({'Property': 'Discount', Value : invoice.totalDiscount});
      list.push({'Property': 'VAT', Value : invoice.vAT});
      list.push({'Property': 'SD', Value : invoice.sD});
      list.push({'Property': 'Delivery Charge', Value : invoice.deliveryCharge});
      if(invoice.instantDiscount) list.push({'Property': 'Instant Discount', Value : invoice.instantDiscount});
      list.push({'Property': 'Grand Total', Value : invoice.totalAmount});
      list.push({'Property': 'Net Payable', Value : invoice.roundAmount});
      list.push({'Property': 'Total Point', Value : invoice.totalPoint});
      list.push({'Property': 'Used Points', Value : invoice.usedPoints});
      list.push({'Property': 'Available Points', Value : invoice.availablePoints});
      list.push({'Property': 'This Invoice', Value : invoice.thisInvoice});

      return {
        reportName: 'SalesInvoiceSummary',
        reportType: FixedIDs.reportRenderingType.Image,
        userID: GlobalConstants.userInfo.userPKID,
        dataSetName: "salesInvoiceSummary",
        data: list,
        dataColumns: this.getInvSummaryColumnHeader(),
        params: [],
      };
    } catch (e) {
      throw e;
    }
  }

  getInvSummaryColumnHeader() {
    try {
      var columns = [
        { key: 'Property', Value: 'Property' },
        { key: 'Value', Value: 'Value' }
      ];
      return columns;
    } catch (e) {
      throw e;
    }
  }

  prepareRptPayModeOption(payModeList) {
    try {
      return {
        reportName: 'SalesInvoicePaymentMode',
        userID: GlobalConstants.userInfo.userPKID,
        dataSetName: "spSLS_GetOrderInvoicePaymentMode",
        data: payModeList,
        dataColumns: this.getPaymentModeColumnHeader(),
        params: [],
      };
    } catch (e) {
      throw e;
    }
  }

  getPaymentModeColumnHeader() {
    try {
      var columns = [
        { key: 'PaymentMode', value: 'PaymentMode' },
        { key: 'Amount', value: 'Amount' }
      ];
      return columns;
    } catch (e) {
      throw e;
    }
  }

  prepareRptTermsOption(termsList: any[]) {
    try {
      return {
        reportName: 'SalesInvoiceTerms', 
        userID: GlobalConstants.userInfo.userPKID,
        data: termsList,
        dataColumns: this.getTermsColumnHeader(),
        dataSetName: "orderInvoiceTerms",
        params: [],
      };
    } catch (e) {
      throw e;
    }
  }

  getTermsColumnHeader() {
    try {
      var columns = [
        { key: 'TnCName', value: 'TnCName' }
      ];
      return columns;
    } catch (e) {
      throw e;
    }
  }
  /******************* print invoice end  ************************/

  /******************* save soft invoice  ************************/
  saveSoftInvoice(invoiceID: number) {
    try {
      forkJoin([
        this.getOrderInvoice(invoiceID),
        this.getOrderInvoicePaymentMode(invoiceID),
        this.getTermsAndConditions(),
        this.adminSvc.getModuleWisePageConfig(GlobalConstants.ERP_MODULES.SLS.name, OrderSalesReportService.salesPageConfig.ShowBarcode),
        this.adminSvc.getModuleWisePageConfig(GlobalConstants.ERP_MODULES.SLS.name, OrderSalesReportService.salesPageConfig.ShowDrliveryDate),
        this.adminSvc.getReportLayoutName(FixedIDs.reportName.Invoice)
      ]).subscribe({
        next: (results: any) => {
          let orderInvoice = results[0] || [];
          let paymentMode = results[1] || [];
          let termsAndCond = results[2] || [];
          let bacodeConfig = results[3] || [];
          let dlevDateConfig = results[4] || [];
          let reportLayout = results[5] || [];

          let layoutName = 'SalesInvoice';
          if(reportLayout.length > 0) layoutName = reportLayout[0].layoutName;
          let isShowBarcodeForInvoice = bacodeConfig.filter(a => a.value == FixedIDs.pageConfigType.SHWBRCII)[0].isActive || false;
          let isShowDlvDateForInvoice = dlevDateConfig.filter(a => a.value == FixedIDs.pageConfigType.SHWDLVDTI)[0].isActive || false;
          if(orderInvoice.length>0){
            var rptHeight = GlobalConstants.printInvoiceConfig.initialPageHeight + (orderInvoice.length * GlobalConstants.printInvoiceConfig.perItemHeight);
            let reportData = this.prepareInvoiceOption(orderInvoice, paymentMode, termsAndCond, isShowBarcodeForInvoice, isShowDlvDateForInvoice, rptHeight, layoutName);
            this.manageReportStreams(reportData, invoiceID);
        }
        },
        error: (res: any) => {
          throw res;
        }
      });
    } catch (e) {
      throw e;
    }
  }

  private manageReportStreams(reportData:any, invoiceID:number){
    try {
      this.getReportStreams(reportData).subscribe({
        next: (res: any) => {
          let singleFileUploadOption = new FileUploadOption();
          singleFileUploadOption.folderName = Config.imageFolders.salesInvoice;
          singleFileUploadOption.fileTick = GlobalMethods.timeTick();

          /*let invoiceAttachment = new InvoiceAttachmentDTO();
          invoiceAttachment.invoiceID = invoiceID;
          invoiceAttachment.fileName = "i.pdf";
          invoiceAttachment.folderName = Config.imageFolders.salesInvoice;
          invoiceAttachment.fileTick = GlobalMethods.timeTick();
          this.saveReportStream(res.body.data, singleFileUploadOption, invoiceAttachment);*/
        },
        error: (res: any) => { throw res },
      });
    } catch (e) {
      throw e;
    }
  }

  private saveReportStream(streamData, uploadOption, targetObject){
    try {
      this.fileUploadSvc.streamDataUploadAsFile(streamData, uploadOption, targetObject).subscribe({
        next:(res:any) => {
          if(res)
          {
            this.saveAttachment(res);
          }
        }
      });
    } catch (e) {
      throw e;
    }
  }

  private saveAttachment(invoiceAttachment:any){
    try {
      this.saveInvoiceAttachment(invoiceAttachment).subscribe();
    } catch (e) {
      throw e;
    }
  }
}
