import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { map, uniqueId } from 'lodash';
import jsPDF from 'jspdf';
import { action, observable } from 'mobx';
import { PulseLoader } from 'react-spinners';
import { Bind } from 'lodash-decorators';

// stores
import { DataStore } from '../../stores/data';
import { LineChartSettingsStore } from '../../stores/lineChartSettings';

// components
import Table from './../../common/components/Table/Table';
import Button from './../../common/components/Button/Button';
import Input from './../../common/components/Input/Input';
import InputNumber from './../../common/components/InputNumber/InputNumber';
import FileInput from './../../common/components/FileInput/FileInput';
import Switch from './../../common/components/Switch/Switch';
import CustomModal from './../../common/components/CustomModal/CustomModal';

// icons
import ExportIcon from './../../common/icons/export.svg';
// import ImportIcon from './../../common/icons/import.svg';
import SaveIcon from './../../common/icons/save.svg';

// styles
import './ChartDataBox.view.scss';

@inject('dataStore', 'lineChartSettingsStore')
@observer
export default class ChartDataBox extends Component {
  static propTypes = {
    dataStore: PropTypes.instanceOf(DataStore).isRequired,
    lineChartSettingsStore: PropTypes.instanceOf(LineChartSettingsStore).isRequired
  }

  constructor(props) {
    super(props);
    this.table = React.createRef();
  }

  @observable isAddColumnPopupShown = false;
  @observable isExportChartPopupShown = false;
  @observable isDescriptionPopupShown = false;

  @observable newColumnName = '';
  @observable isRandomValuesDisabled = true;
  @observable randomFrom = 0;
  @observable randomTo = 100;
  @observable initialRowValue = '0';

  @observable isFileLoading = false;
  @observable isFileParsed = false;
  @observable fileName = null;
  @observable exportFileName = `chart_${uniqueId()}`;

  @observable chartDescription = 'Type description here ...';

  @action.bound
  handleColumnName(event) {
    this.newColumnName = event.target.value;
  }

  @action.bound
  handleExportFileNameChange(event) {
    this.exportFileName = event.target.value;
  }

  @action.bound
  handleChartDescriptionChange(event) {
    this.chartDescription = event.target.value;
    console.log(this.chartDescription);
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
  addRow() {
    this.table.current.addRow();
  }

  @action.bound
  addColumn() {
    const { newColumnName, randomFrom, randomTo, initialRowValue } = this; 
    if(this.isRandomValuesDisabled) {
      this.table.current.addColumn(newColumnName, null, null, initialRowValue);
    } else {
      this.table.current.addColumn(newColumnName, randomFrom, randomTo);
    }
    this.isRandomValuesDisabled = true;
    this.hideAddColumnPopup();
  }

  @action.bound
  showAddColumnPopup() {
    this.newColumnName = 'Column' + uniqueId();
    this.isAddColumnPopupShown = true;
  }

  @action.bound
  hideAddColumnPopup() {
    this.isAddColumnPopupShown = false;
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
    const { dataStore } = this.props;
    this.isFileLoading = true;
    this.isFileParsed = false;

    // User cancelled
    if (!event.target.files[0]) {
      this.isFileLoading = false;
      this.isFileParsed = false;
      return;
    }

    const file = event.target.files[0];

    await dataStore.parseFile(file).then(result => {
      const { data, meta, errors } = result;
      const { fields } = meta;
      dataStore.errors = errors;
      dataStore.columns.clear();
      dataStore.rows.clear();
      map(fields, field => {
        dataStore.columns.push(field);
      });
      map(data, row => {
        const rowObject = JSON.parse(JSON.stringify(row));
        if(Object.keys(rowObject).length === fields.length) {
          rowObject.id = uniqueId('row_');
          dataStore.rows.push(rowObject);
        }
      });
      dataStore.csvFile = file;
      this.isFileParsed = true;
      this.isFileLoading = false;
    })
  }

  @Bind()
  downloadPNG() {
    /// create an "off-screen" anchor tag
    var lnk = document.createElement('a'), e;

    /// the key here is to set the download attribute of the a tag
    lnk.download = this.exportFileName;

    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = this.props.lineChartSettingsStore.canvasRef.current.toDataURL("image/png");

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
    const imgData = this.props.lineChartSettingsStore.canvasRef.current.toDataURL("image/jpeg",1.0);
    const pdf = new jsPDF({orientation: 'landscape',});
    var width = pdf.internal.pageSize.getWidth();
    var height = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'JPEG', 0, 25, width, height-100);
    pdf.save(`${this.exportFileName}`);
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
    const AddColumnPopup = (
      <CustomModal
        title="Create data column"
        width="300" 
        height="368" 
        effect="fadeInDown" 
        visible={this.isAddColumnPopupShown} 
        onClose={this.hideAddColumnPopup}
        isFooter={true}
        buttonRight={
          <Button
            buttonStyle="button-primary"
            textColor="light"
            className="add-column-button"
            onClick={this.addColumn}
          >
            Add 
          </Button>
        }
      >
        <React.Fragment>
          <div className="option">
            <div className="label">Column name</div>
          </div>
          <Input 
            type="text" 
            value={this.newColumnName}
            onChange={this.handleColumnName} 
            inputClassName="column-input"
          />
          <div className="option">
            <div className="label">Initial row value</div>
          </div>
          <Input 
            type="text" 
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
            Export to PDF
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
            className="export-button"
            onClick={this.saveChart}
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
      <div className="chart-data-box">
        <div className="chart-data-options">
          <div className="table-buttons">
            <Button 
              className="add-button"
              onClick={this.addRow}
            >
              Add Dataset
            </Button>
            <Button 
              className="add-button"
              onClick={this.showAddColumnPopup}
            >
              Add Column
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
                <div className="label">Add description</div>
              </div>
            </Button>
            <Button 
              className="add-button"
              onClick={this.showSaveChartPopup}
            >
              <div className="button-label">
                <div className="label">Save</div>
                <SaveIcon width={14} height={14} />
              </div>
            </Button>
            <Button 
              className="add-button"
              onClick={this.showExportPopup}
            >
              <div className="button-label">
                <div className="label">Export chart</div>
                <ExportIcon width={14} height={14} />
              </div>
            </Button>
          </div>
        </div>
        <Table 
          ref={this.table} 
          rows={this.props.dataStore.rows} 
          columns={this.props.dataStore.columns}
        />
        {AddColumnPopup}
        {ExportChartPopup}
        {DescriptionPopup}
      </div>
    );
  }
}