import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { snakeCase, indexOf, uniqueId, map, capitalize, toLower, includes, find } from 'lodash';
import { Bind } from 'lodash-decorators';
import { Tooltip } from 'react-tippy';
import { observable, action } from 'mobx';

// virtualized table
import { AutoSizer, Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css';

// services
import NotificationService from '../../services/notifications';

// stores
import { DataStore } from '../../../stores/data';
import { CommonStore } from '../../../stores/common';

// icons
import DeleteIcon from '../../icons/delete.svg';
import Delete2Icon from '../../icons/delete2.svg';
import EditIcon from '../../icons/edit.svg';

// components
import Button from '../Button/Button';
import Input from '../Input/Input';
import CustomModal from '../CustomModal/CustomModal';
import Dataset from '../Dataset/Dataset';

// styles
import './Table.scss';

@observer
export default class TableC extends Component {
  static propTypes = {
    parentHeight: PropTypes.number,
    dataStore: PropTypes.instanceOf(DataStore).isRequired,
    commonStore: PropTypes.instanceOf(CommonStore).isRequired
  }

  @observable isRowEditPopupShown = false;
  @observable isEditColumnNamePopupShown = false;
  
  @observable editingRow = {};
  @observable editingColumn = {
    index: null,
    text: ''
  }

  @action.bound
  showEditRowPopup(row) {
    this.editingRow = row;
    this.isRowEditPopupShown = true;
  }

  @action.bound
  hideEditRowPopup() {
    this.isRowEditPopupShown = false;
  }

  @action.bound
  showEditColumnNamePopup(index, dataset) {
    this.editingColumn = {
      index,
      text: dataset.label
    }
    this.isEditColumnNamePopupShown = true;
  }

  @action.bound
  hideEditColumnNamePopup() {
    this.editingColumn = {};
    this.isEditColumnNamePopupShown = false;
  }

  @action.bound
  onColumnNameChange(event) {
    this.editingColumn.text = event.target.value;
  }

  // completeds
  @action.bound
  saveColumnName() {
    const { editingColumn } = this;
    const { dataStore, commonStore } = this.props;
    const oldKey = dataStore.datasets[editingColumn.index].dataKey;
    const newKey = snakeCase(editingColumn.text);
    if(!find(dataStore.datasets,['dataKey', newKey])) {
      dataStore.datasets[editingColumn.index].label = editingColumn.text;
      dataStore.datasets[editingColumn.index].dataKey = newKey;
      map(dataStore.rows, row => {
        const oldValue = row[oldKey];
        delete row[oldKey];
        row[newKey] = oldValue;
      });
      dataStore.chartDatasetsProperties[editingColumn.index].label = editingColumn.text;
      commonStore.editDataset(editingColumn.index, 'label', editingColumn.text)
      commonStore.updateChart();
      this.forceUpdate();
    } else {
      NotificationService.error("This dataset name exists!");
    }
    this.hideEditColumnNamePopup();
  }

  @action.bound
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  @action.bound
  addDataset(datasetProperties){
    const { dataStore, commonStore } = this.props;
    const newDataset = {
      label: datasetProperties.label,
      dataKey: snakeCase(datasetProperties.label)
    }
    if(dataStore.rows.length > 0 && !find(dataStore.datasets, newDataset)) {
      dataStore.datasets.push(newDataset);
      dataStore.chartDatasetsProperties.push(datasetProperties);
      const formattedDataset = [];
      map(dataStore.rows, row => {
        const categoryValue = this.getRandomInt(100,1000).toString();
        row[newDataset.dataKey] = categoryValue;
        formattedDataset.push(categoryValue);
      })
      commonStore.lineChartObject.data.labels = dataStore.categories.slice();
      const newChart = {
        ...datasetProperties,
        data: formattedDataset
      }
      commonStore.addDataset(newChart);
      this.forceUpdate();
    } else {
      NotificationService.error("There is no categories or this dataset exists!");
    }
  }

  // completed
  @action.bound
  addRow(categoryName="Undefined column", randomFrom=null, randomTo=null, initialRowValue) {
    const { dataStore, commonStore } = this.props;
    const newRowCategory = toLower(categoryName);
    const isColumn = includes(dataStore.categories,categoryName);
    if(!isColumn) {
      dataStore.categories.push(newRowCategory);
      commonStore.lineChartObject.data.labels.push(newRowCategory);
      let row = {
        'category': newRowCategory
      };
      if(dataStore.datasets.length > 0) {
        if(randomFrom !== null && randomTo !== null) {
          map(dataStore.datasets, (dataset, index) => {
            const randomValue = this.getRandomInt(randomFrom, randomTo).toString();
            row[dataset.dataKey] = randomValue;
            commonStore.lineChartObject.data.datasets[index].data.push(randomValue);
          });
        } else {
          map(dataStore.datasets, (dataset, index) => {
            const initialValue = initialRowValue.toString();
            row[dataset.dataKey] = initialValue;
            commonStore.lineChartObject.data.datasets[index].data.push(initialValue);
          });
        }
      }
      dataStore.rows.push(row);
      commonStore.updateChart();
      this.forceUpdate();
    } else {
      NotificationService.error("This category exists");
    }
  }

  // completed
  @action.bound
  removeRow(row) {
    const { dataStore, commonStore } = this.props;
    dataStore.categories.remove(row.rowData.category);
    dataStore.rows.remove(row.rowData);
    commonStore.lineChartObject.data.labels.splice(row.rowIndex, 1);
    commonStore.lineChartObject.data.datasets.forEach((dataset) => {
      dataset.data.splice(row.rowIndex, 1);
    });
    commonStore.updateChart();
    this.forceUpdate();
  }

  // completed
  @action.bound
  removeDataset(index,dataset) {
    const { dataStore, commonStore } = this.props;
    dataStore.datasets.remove(dataset);
    map(dataStore.rows, row => {
      delete row[dataset.dataKey]
    })
    dataStore.datasets.remove(dataset);
    commonStore.lineChartObject.data.datasets.splice(index, 1);
    dataStore.chartDatasetsProperties.splice(index, 1);
    commonStore.updateChart();
    this.forceUpdate();
  }

  @Bind()
  renderEditRowPopupBody(){
    return Object.keys(this.editingRow).map((key,index) => key !== 'id' && (
      <div key={index-1}>
        <div className="option">
          <div className="label">{capitalize(key)}</div>
        </div>
        <Input
          key={index-1}
          type="number"
          value={this.editingRow[key]}
          onChange={event => this.handleRowChange(event,key)} 
          inputClassName="input-n"
        />
      </div>
    ))
  }

  @action.bound
  handleRowChange(event, key) {
    this.editingRow[key] = event.target.value;
  } 

  @action.bound
  saveRow() {
    const { dataStore, commonStore } = this.props;
    const indexOfEditingRow = indexOf(dataStore.rows, this.editingRow);
    map(dataStore.rows, row => {
      if(row.id === this.editingRow.id) {
        return row = this.editingRow;
      }
    });
    const arrayOfData = Object.values(this.editingRow).filter(value => !includes(value,"row_"));
    commonStore.lineChartObject.data.datasets[indexOfEditingRow].data = arrayOfData;
    commonStore.updateChart();
    this.editingRow = {};
    this.hideEditRowPopup();
  }

  render() {
    const { dataStore, parentHeight } = this.props;
    const { rows, datasets } = dataStore;

    const EditRowPopup = (
      <CustomModal
        title="Edit row"
        width="360" 
        height="444" 
        effect="fadeInDown" 
        visible={this.isRowEditPopupShown} 
        onClose={this.hideEditRowPopup}
        isFooter={true}
        buttonRight={
          <Button
            buttonStyle="button-primary"
            textColor="light"
            className="add-column-button"
            onClick={this.saveRow}
          >
            Save
          </Button>
        }
      >
        {this.renderEditRowPopupBody()}
      </CustomModal>
    );

    const EditColumnPopup = (
      <CustomModal
        title="Edit column"
        width="430" 
        height="220" 
        effect="fadeInDown" 
        visible={this.isEditColumnNamePopupShown} 
        onClose={this.hideEditColumnNamePopup}
        isFooter={true}
        buttonRight={
          <Button
            buttonStyle="button-primary"
            textColor="light"
            className="export-button"
            onClick={this.saveColumnName}
          >
            Change
          </Button>
        }
      >
        <React.Fragment>
          <div className="option">
            <div className="label">Column name</div>
          </div>
          <Input 
            type="text" 
            value={this.editingColumn.text}
            onChange={this.onColumnNameChange} 
            inputClassName="column-input"
          />
        </React.Fragment>
      </CustomModal>
    );

    const editRowButton = row => (
      <Button key={uniqueId()} className="edit-button" onClick={() => this.showEditRowPopup(row)}>
        <EditIcon 
          className="edit-button"  
          width={14} 
          height={14} 
        />
      </Button>
    );

    const renderEditRowCell = (row) => {
      return (
        <div className="edit-row">
          <Button className="edit-button" onClick={() => this.showEditRowPopup(row)}>
            <EditIcon 
              width={14} 
              height={14} 
            />
          </Button>
          <Button className="remove-button" onClick={() => this.removeRow(row)}>
            <DeleteIcon 
              width={14} 
              height={14} 
            />
          </Button>
        </div>
      );
    }

    const renderDatasetColumnCell = (index,dataset) => {
      return (
        <div className="header-cell">
          <Dataset datasetIndex={0} />
          <Tooltip
            title="Click to rename column"
            position="top"
            arrow={true}
            size="small"
            trigger="mouseenter"
            theme="transparent"
          >
            <div role="button" onClick={() => this.showEditColumnNamePopup(index, dataset)}>{dataset.label}</div>
          </Tooltip>
          <Button className="remove-column-button" onClick={() => this.removeDataset(index,dataset)}>
            <Delete2Icon 
              width={11} 
              height={11} 
            />
          </Button>
        </div>
      );
    }

    const removeRowButton = index => (
      <Button key={index} className="remove-button" onClick={() => this.removeRow(index)}>
        <DeleteIcon 
          className="remove-button"  
          width={14} 
          height={14} 
        />
      </Button>
    );

    const removeColumnButton = column => (
      <Button key={uniqueId()} className="remove-column-button" onClick={() => this.removeColumn(column)}>
        <Delete2Icon 
          width={11} 
          height={11} 
        />
      </Button>
    );

    const renderTable = ({height, width}) => {
      return (
        <Table
          width={width}
          height={height}
          headerHeight={32}
          headerClassName='table-header'
          rowHeight={30}
          rowCount={rows.length}
          rowGetter={({ index }) => rows[index]}
        >
          <Column
            label='Category'
            dataKey='category'
            width={200}
            flexGrow={2}
          />
          {map(datasets, (dataset, index) => (
            <Column
              label={dataset.label}
              dataKey={dataset.dataKey}
              width={200}
              flexGrow={2}
              headerRenderer={() => renderDatasetColumnCell(index,dataset)}
            />
          ))}
          <Column
            label=''
            dataKey=''
            cellRenderer={row => renderEditRowCell(row)}
            width={100}
            flexGrow={1}
          />
        </Table>
      );
    };


    return (
      <React.Fragment>
        <div
          className="AutoSizerContainer" 
          style={{
            height: parentHeight - 104
          }} 
        >
          <AutoSizer>
            {renderTable}
          </AutoSizer>
        </div>
        {EditColumnPopup}
      </React.Fragment>
    );
  }
}