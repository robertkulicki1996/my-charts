import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { map, uniqueId, snakeCase, includes } from 'lodash';

// pdfmake
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import { action, observable, runInAction } from 'mobx';
import { PulseLoader } from 'react-spinners';
import { Bind } from 'lodash-decorators';

// services
import NotificationService from '../../common/services/notifications';

// stores
import { DataStore } from '../../stores/data';
import { CommonStore } from '../../stores/common';
import { LineChartSettingsStore } from '../../stores/ChartSettings/LineChartSettings';

// models
import { LineDatasetProperties } from '../../models/LineDatasetProperties';

// colors
import { getRandomColor } from './../../common/consts/colors';

// components
import TableC from './../../common/components/Table/Table';
import Button from './../../common/components/Button/Button';
import Input from './../../common/components/Input/Input';
import InputNumber from './../../common/components/InputNumber/InputNumber';
import FileInput from './../../common/components/FileInput/FileInput';
import Switch from './../../common/components/Switch/Switch';
import CustomModal from './../../common/components/CustomModal/CustomModal';
import AddDatasetPopup from './components/AddDatasetPopup/AddDatasetPopup.view';

// icons
import ExportIcon from './../../common/icons/export.svg';
import SaveIcon from './../../common/icons/save.svg';
import { logoData } from './../../common/consts/logo';

// styles
import './ChartDataBox.view.scss';

@inject('dataStore', 'lineChartSettingsStore', 'commonStore')
@observer
export default class ChartDataBox extends Component {
  static propTypes = {
    height: PropTypes.number,
    dataStore: PropTypes.instanceOf(DataStore).isRequired,
    commonStore: PropTypes.instanceOf(CommonStore).isRequired,
    lineChartSettingsStore: PropTypes.instanceOf(LineChartSettingsStore).isRequired
  }

  constructor(props) {
    super(props);
    this.table = React.createRef();
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  @observable isAddDatasetPopupShown = false;
  @observable isAddRowPopupShown = false;
  @observable isExportChartPopupShown = false;
  @observable isDescriptionPopupShown = false;

  @observable newRowCategory = '';
  @observable isRandomValuesDisabled = true;
  @observable randomFrom = 100;
  @observable randomTo = 500;
  @observable initialRowValue = 0;

  @observable isFileLoading = false;
  @observable isFileParsed = false;
  @observable fileName = null;
  @observable exportFileName = `chart_${uniqueId()}`;

  @observable chartDescription = 'Populacja Polski w 2019 zmaleje o 58 000 i osiągnie 37 734 000 ludzi w 2020 roku. Migracja ludności zmniejszyła populację o 10 000 ludzi rocznie uwzględniając emigrację i imigrację. Średnia liczba urodzeń w Polsce wynosi 333 698 rocznie, liczba zgonów to 403 311 w roku. Od 1980 gęstość zaludnienia Polski uległa zmianie z 116,1 na 124,6 w 2017 roku.';

  @action.bound
  handleRowCategory(event) {
    this.newRowCategory = event.target.value;
  }

  @action.bound
  handleExportFileNameChange(event) {
    this.exportFileName = event.target.value;
  }

  @action.bound
  handleChartDescriptionChange(event) {
    this.chartDescription = event.target.value;
  }

  @action.bound
  handleInitialRowValue(event) {
    this.initialRowValue = event.target.value;
  }

  @action.bound
  onRandomValuesChange() {
    this.initialRowValue = 0;
    this.isRandomValuesDisabled = !this.isRandomValuesDisabled;
  }

  @action.bound
  onRandomFromChange(value) {
    this.randomFrom = value;
  }

  @action.bound
  onRandomToChange(value) {
    this.randomTo = value;
  }

  @action.bound
  addDataset(datasetProperties) {
    this.table.current.addDataset(datasetProperties);
  }

  @action.bound
  addRow() {
    const { newRowCategory, randomFrom, randomTo, initialRowValue } = this; 
    if(this.isRandomValuesDisabled) {
      this.table.current.addRow(newRowCategory, null, null, initialRowValue);
    } else {
      this.table.current.addRow(newRowCategory, randomFrom, randomTo);
    }
    this.isRandomValuesDisabled = true;
    this.hideAddRowPopup();
  }

  @action.bound
  showAddDatasetPopup() {
    this.isAddDatasetPopupShown = true;
  }

  @action.bound
  hideAddDatasetPopup() {
    this.isAddDatasetPopupShown = false;
  }  

  @action.bound
  showAddRowPopup() {
    this.newRowCategory = 'category-' + uniqueId();
    this.isAddRowPopupShown = true;
  }

  @action.bound
  hideAddRowPopup() {
    this.isAddRowPopupShown = false;
  }

  @action.bound
  showExportPopup() {
    this.isExportChartPopupShown = true;
  }

  @action.bound
  hideExportPopup() {
    this.isExportChartPopupShown = false;
  }

  @action.bound
  showDescriptionPopup() {
    this.isDescriptionPopupShown = true;
  }

  @action.bound
  hideDescriptionPopup() {
    this.isDescriptionPopupShown = false;
  }

  @action.bound
  async handleFileChange(event) {
    const { dataStore, commonStore } = this.props;

    runInAction(() => {
      this.isFileLoading = true;
      this.isFileParsed = false;
    })

    // User cancelled
    if (!event.target.files[0]) {
      runInAction(() => {
        this.isFileLoading = false;
        this.isFileParsed = false;
      })
      return;
    } else {
      const file = event.target.files[0];
      commonStore.resetChartState();
      dataStore.resetDataState();
      await dataStore.parseFile(file).then(result => {
        const { data, meta, errors } = result;
        if(errors.length > 0) {
          dataStore.errors = errors;
          runInAction(() => {
            this.isFileLoading = false;
            this.isFileParsed = true;
          })
          NotificationService.error("Upload file failed");
        } else {
          const categories = data[0];
          dataStore.categories = categories.slice(1, categories.length);
          map(categories, (category, index) => index !== 0 && (
            dataStore.datasets.push({
              label: category,
              dataKey: snakeCase(category)
            })
          ));
        }
        console.log(dataStore.categories, dataStore.datasets);
        // commonStore.lineChartObject.data.labels = dataStore.columns.slice();
        // map(data, (row, index) => {
        //   const rowObject = JSON.parse(JSON.stringify(row));
        //   if(Object.keys(rowObject).length === fields.length) {
        //     rowObject.id = uniqueId('row_');
        //     const lineDatasetProperties = new LineDatasetProperties(`Dataset ${index + 1}`, getRandomColor());
        //     dataStore.addDatasetProperties(lineDatasetProperties);
        //     const arrayOfData = Object.values(rowObject);
        //     const formattedDataset = slice(arrayOfData, 0, arrayOfData.length - 1);
        //     // add new line chart with data and properties
        //     const newChart = {
        //       ...lineDatasetProperties,
        //       data: formattedDataset
        //     }
        //     commonStore.addDataset(newChart);
        //     dataStore.addRow(rowObject);
        //   }
        // });
        // dataStore.csvFile = file;
        // runInAction(() => {
        //   this.isFileLoading = false;
        //   this.isFileParsed = true;
        // })
      })
    }
  }

  @Bind()
  downloadPNG() {
    const { commonStore } = this.props;
    /// create an "off-screen" anchor tag
    var lnk = document.createElement('a'), e;
    /// the key here is to set the download attribute of the a tag
    lnk.download = this.exportFileName;
    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = commonStore.canvasRef.current.toDataURL("image/png");
    /// create a "fake" click-event to trigger the download
    if (document.createEvent) {
      e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true, window,
        0, 0, 0, 0, 0, false, false, false,
        false, 0, null
      );
      lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
      lnk.fireEvent("onclick");
    }
  }

  @Bind()
  downloadPDF() {
    const { dataStore, commonStore } = this.props;
    const imgData = commonStore.canvasRef.current.toDataURL("image/jpeg", 1.0);
    var doc = {
      content: [
        {
          table: {
            body: [
              [{
                image: logoData,
                border: [false, false, false, false],
                fillColor: '#ffffff',
                width: 32,
                height: 32,
                margin: [0,0,0,0]
              },
              {
                text: [{
                  text: 'MyCharts \n',
                  style: 'header'
                },{
                  text: 'Make your charts online',
                  style: 'subheader'
                }],
                margin: [0,4,0,0],
                border: [false, false, false, false]
              }]
            ]
          }
        }, 
        {
          image: imgData,
          margin: [0, 12, 0, 0],
          width: 520,
          height: 180
        },
        {
          text: !includes(this.chartDescription, 'Type chart description here ...') ? 'Chart description': '',
          style: 'header',
          margin: [0,4,0,4]
        },
        {
          text: !includes(this.chartDescription, 'Type chart description here ...') ? this.chartDescription : '',
          style: 'subheader',
        },
        {
          text: 'Chart datasets',
          style: 'header',
          margin: [0,4,0,4]
        },
        {
          table: {
            body: [
              ['Dataset name', ...dataStore.columns],
              ...dataStore.getPreparedRowsForReportTable()
            ]
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              if(rowIndex === 0) return '#EB1E64';
              return (rowIndex !== 0 && rowIndex % 2 === 0) ? '#F5F5F5' : null;
            },
            hLineWidth: function (i, node) {
              if (i === 0 || i === node.table.body.length) return 0;
              return (i === node.table.headerRows) ? 0 : 0;
            },
            vLineWidth: function (i, node) {
              if (i === 0 || i === node.table.body.length) return 0;
              return (i === node.table.headerRows) ? 0 : 0;
            },
          },
          fontSize: 8
        }
      ],
      styles: {
        header: {
          fontSize: 12
        },
        subheader: {
          fontSize: 8,
        }
      }
    }
    pdfMake.createPdf(doc).download();
    // const doc = new jsPDF({
    //   orientation: 'p',
    //   unit: 'px',
    //   format: 'a4'
    // });
    // // Document logo
    // doc.addImage(logoData, 'JPEG', 20, 20, 24, 24);
    // // Document logo text
    // doc.addFont('Abha.ttf', 'Abha', 'normal', 'Identity-H');
    // doc.setFont('Abha');   
    // doc.setFontSize(12);
    // doc.text('MyCharts', 50, 32);
    // doc.setFontSize(8);
    // doc.text('Make your charts online', 50, 40);
    // // Chart
    // const width = doc.internal.pageSize.getWidth();
    // doc.addImage(imgData, 'JPEG', 20, 60, width - 40, 145);
    // // Chart description
    // const noDescriptionPlaceholder = 'Type chart description here ...'
    // if(!includes(this.chartDescription, noDescriptionPlaceholder)){
    //   doc.setFontSize(12);
    //   doc.text("Chart description", 20, 215);
    //   doc.setFontSize(8);
    //   const splitTitle = doc.splitTextToSize(this.chartDescription, width-40);
    //   doc.text(20, 226, splitTitle);
    // }
    // // Chart data title
    // doc.setFontSize(12);
    // doc.text("Chart Data", 20, !includes(this.chartDescription, noDescriptionPlaceholder) ? 300 : 220);
    // // Chart data table
    // const columns = ["Dataset name", ...dataStore.columns];
    // const rows = dataStore.getPreparedRowsForReportTable();
    // doc.autoTable(columns, rows, {
    //   startY: !includes(this.chartDescription, noDescriptionPlaceholder) ? 305 : 226,
    //   margin: 20,
    //   styles: {
    //     fontSize: 8,
    //     fontStyle: 'normal',
    //     overflow: 'ellipsize',
    //     valign: 'middle'
    //   },
    //   headerStyles: {
    //     fillColor: [235, 30, 100]
    //   }
    // });
    // // Save document
    // doc.save(`${this.exportFileName}`);
  }

  @action.bound
  showButtonContent() {
    const { dataStore } = this.props;
    const { isFileLoading, isFileParsed } = this;
    if(!isFileLoading && !isFileParsed) {
      return 'Import CSV file';
    } else if(isFileLoading && !isFileParsed) {
      return(
        <PulseLoader
          size={8}
          color={'#eb1e64'}
          loading={true}
        />
      );
    } else if(isFileLoading === false && isFileParsed) {
      return dataStore.csvFile.name;
    } 
  }

  render() {
    const AddRowPopup = (
      <CustomModal
        title="Create row data"
        width="300" 
        height="368" 
        effect="fadeInDown" 
        visible={this.isAddRowPopupShown} 
        onClose={this.hideAddRowPopup}
        isFooter={true}
        buttonRight={
          <Button
            buttonStyle="button-primary"
            textColor="light"
            className="add-column-button"
            onClick={this.addRow}
          >
            Add 
          </Button>
        }
      >
        <React.Fragment>
          <div className="option">
            <div className="label">Category name</div>
          </div>
          <Input 
            type="text" 
            value={this.newRowCategory}
            onChange={this.handleRowCategory} 
            inputClassName="column-input"
          />
          <div className="option">
            <div className="label">Initial row value</div>
          </div>
          <Input 
            type="number" 
            disabled={!this.isRandomValuesDisabled}
            value={this.initialRowValue}
            onChange={this.handleInitialRowValue} 
            inputClassName="column-input"
          />
          <div className="option">
            <div className="label">Generate random values</div>
            <Switch
              style={{ width: 80 }}
              defaultValue={800}
              onChange={this.onRandomValuesChange}
              checked={!this.isRandomValuesDisabled}
              precision={0}
            />
          </div>
          <div className="option">
            <InputNumber 
              style={{ marginRight: 16 }}
              defaultValue={0}
              precision={0}
              step={1}
              value={this.randomFrom}
              onChange={this.onRandomFromChange}
              disabled={this.isRandomValuesDisabled}

            />
            <InputNumber 
              defaultValue={100}
              precision={0}
              step={1}
              value={this.randomTo}
              onChange={this.onRandomToChange}
              disabled={this.isRandomValuesDisabled}
            />
          </div>
        </React.Fragment>
      </CustomModal>
    );

    const ExportChartPopup = (
      <CustomModal
        title="Export chart"
        width="430" 
        height="220" 
        effect="fadeInDown" 
        visible={this.isExportChartPopupShown} 
        onClose={this.hideExportPopup}
        isFooter={true}
        buttonLeft={
          <Button
            buttonStyle="button-primary"
            textColor="light"
            className="export-button"
            onClick={this.downloadPDF}
          >
            Generate a report in PDF
          </Button> 
        }
        buttonRight={
          <Button
            buttonStyle="button-primary"
            textColor="light"
            className="export-button"
            onClick={this.downloadPNG}
          >
            Export to PNG
          </Button>
        }
      >
        <React.Fragment>
          <div className="option">
            <div className="label">File name</div>
          </div>
          <Input 
            type="text" 
            value={this.exportFileName}
            onChange={this.handleExportFileNameChange} 
            inputClassName="column-input"
          />
        </React.Fragment>
      </CustomModal>
    );

    const DescriptionPopup = (
      <CustomModal
        title="Description"
        width="620" 
        height="320" 
        effect="fadeInDown" 
        visible={this.isDescriptionPopupShown} 
        onClose={this.hideDescriptionPopup}
        isFooter={true}
        buttonRight={
          <Button
            buttonStyle="button-primary"
            textColor="light"
            className="add-description-button"
            onClick={this.hideDescriptionPopup}
          >
            Add
          </Button>
        }
      >
        <React.Fragment>
          <Input
            textarea
            value={this.chartDescription}
            onTextareaChange={this.handleChartDescriptionChange} 
          />
        </React.Fragment>
      </CustomModal>
    );

    return (
      <div className="chart-data-box" ref={this.chartDataBox}>
        <div className="chart-data-options">
          <div className="table-buttons">
            <Button 
              className="add-button"
              onClick={this.showAddRowPopup}
            >
              Add Row
            </Button>
            <Button 
              className="add-button"
              onClick={this.showAddDatasetPopup}
            >
              Add Dataset
            </Button>
          </div>
          <div className="table-buttons">
            <FileInput 
              buttonContent={this.showButtonContent()}
              isFileLoading={this.isFileLoading}
              isFileParsed={this.isFileParsed}
              onChange={this.handleFileChange} 
            />
            <Button 
              className="add-button"
              onClick={this.showDescriptionPopup}
            >
              <div className="button-label">
                <div className="b-label">Add description</div>
              </div>
            </Button>
            <Button 
              className="add-button"
              onClick={() => this.props.dataStore.saveChart()}
            >
              <div className="button-label">
                <div className="b-label">Save</div>
                <SaveIcon width={14} height={14} />
              </div>
            </Button>
            <Button 
              className="add-button"
              onClick={this.showExportPopup}
            >
              <div className="button-label">
                <div className="b-label">Export</div>
                <ExportIcon width={14} height={14} />
              </div>
            </Button>
          </div>
        </div>
        <TableC
          parentHeight={this.props.height}
          ref={this.table} 
          dataStore={this.props.dataStore} 
          commonStore={this.props.commonStore} 
        />
        {AddRowPopup}
        {ExportChartPopup}
        {DescriptionPopup}
        {this.isAddDatasetPopupShown && <AddDatasetPopup
          visible={this.isAddDatasetPopupShown}
          onClose={this.hideAddDatasetPopup}
          addDataset={this.addDataset}
        />}
      </div>
    );
  }
}