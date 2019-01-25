/* eslint-disable import/no-webpack-loader-syntax */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { map, uniqueId, snakeCase } from 'lodash';

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
import ExportIcon from 'svg-react-loader?name=ExportIcon!./../../common/icons/export.svg';
import SaveIcon from 'svg-react-loader?name=SaveIcon!./../../common/icons/save.svg';
import { logoData } from './../../common/consts/logo';

// styles
import './ChartDataBox.view.scss';

@withRouter
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

  @observable isFileSaving = false;

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
    this.props.dataStore.chartDescription = event.target.value;
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
        const { data, errors } = result;
        if(errors.length > 0) {
          dataStore.errors = errors;
          runInAction(() => {
            this.isFileLoading = false;
            this.isFileParsed = true;
          });
          NotificationService.error("Upload file failed");
        } else {
          const datasets = data[0];
          map(datasets, (category, index) => index !== 0 && (
            dataStore.datasets.push({
              label: category,
              dataKey: snakeCase(category)
            })
          ));
          let rowKeys = map(dataStore.datasets, dataset => {
            return dataset.dataKey;
          })
          const countOfDatasets = rowKeys.length;
          // eslint-disable-next-line no-array-constructor
          let formattedData = Array.from(Array(countOfDatasets+1), () => new Array());
          rowKeys = ['category',...rowKeys];
          const rowLength = data[0].length;
          map(data, (row, rowIndex) => {
            if(row.length === rowLength) {
              const rowObject = {};
              map(rowKeys, (key, index) => {
                rowObject[key] = row[index];
                if(rowIndex !== 0) {
                  formattedData[index].push(row[index]);
                }
              })
              dataStore.rows.push(rowObject);
            }
          });
          dataStore.rows.shift();
          dataStore.categories = formattedData[0];
          commonStore.lineChartObject.data.labels = dataStore.categories.slice();
          map(dataStore.datasets, (dataset, index) => {
            const lineDatasetProperties = new LineDatasetProperties(`Dataset ${index}`, getRandomColor());
            dataStore.addDatasetProperties(lineDatasetProperties);
            const newChart = {
              ...lineDatasetProperties,
              data: formattedData[index+1]
            }
            commonStore.addDataset(newChart);
          });
          commonStore.updateChart();
          dataStore.csvFile = file;
          runInAction(() => {
            this.isFileLoading = false;
            this.isFileParsed = true;
          });
          this.forceUpdate();
          this.table.current.updateTable();
        }
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
    const countOfColumns = dataStore.getDatasetsLabels().length + 1;
    const widths = new Array(countOfColumns).fill('*');
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
          text: dataStore.chartDescription.length > 0 ? 'Chart description' : '',
          style: 'header',
          margin: [0,4,0,4]
        },
        {
          text: dataStore.chartDescription.length > 0 ? dataStore.chartDescription : '',
          style: 'subheader',
        },
        {
          text: 'Chart datasets',
          style: 'header',
          margin: [0,4,0,4]
        },
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths,
            body: [
              ['Category', ...dataStore.getDatasetsLabels()],
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
    try{
      pdfMake.createPdf(doc).download();
      this.hideExportPopup();
    } catch(e) {
      window.console.error(e);
      NotificationService.error(e);
    }
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

  @action.bound
  async saveChart(chartId) {
    const { dataStore } = this.props;
    runInAction(() => {
      this.isFileSaving = true;
    })
    try {
      await dataStore.updateChart(chartId);
      NotificationService.success("Chart was saved.")
    } catch(e) {
      window.console.error(e);
    }
    runInAction(() => {
      this.isFileSaving = false;
    })
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
            value={this.props.dataStore.chartDescription}
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
              className="save-button"
              onClick={() => this.saveChart(this.props.match.params.id)}
            >
              <div className="button-label">
                {this.isFileSaving ? (
                  <PulseLoader
                    size={8}
                    color={'#eb1e64'}
                    loading={this.isFileSaving}
                  />
                ) : (
                  <SaveIcon width={14} height={14} />
                )}
              </div>
            </Button>
            <Button 
              className="export-icon-button"
              onClick={this.showExportPopup}
            >
              <div className="button-label">
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