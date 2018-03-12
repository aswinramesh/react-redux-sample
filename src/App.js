import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux';
import {fetchManagers, removeManager, editManager} from './reducers';

import ListManagers from "./ListManagers"

class App extends Component {

  state = {
    managerList: "",
    currentPage: 1,
    totalPages: 0
  }

  static defaultProps = {
    itemPerPage: 5
  }

  componentWillMount() {
    this.props.fetchManagers()
  }

  componentWillReceiveProps(nextProps) {
    this.generatePages(nextProps);

    if(nextProps.deleted || nextProps.updated) {
      window.alert(nextProps.deleted || nextProps.updated);
    }
  }

  generatePages(props, currentPage = this.state.currentPage){
    const {itemPerPage} = this.props;
    const totalPages = Math.ceil((props.managers.length + 1) / itemPerPage);
    
    currentPage = totalPages < currentPage ? currentPage - 1: currentPage;

    this.setState({
      managerList: props.managers.slice((currentPage-1) * itemPerPage, currentPage * itemPerPage),
      totalPages,
      currentPage
    })
  }

  paginate = (currentPage) => {
    this.generatePages(this.props, currentPage);
  }

  removeManager = (id) => {
    this.props.removeManager(id, this.props.managers);
  }

  editManager = (manager) => {
    this.props.editManager(manager, this.props.managers);
  }

  render() {
    const {
      managerList,
      currentPage,
      totalPages
    } = this.state;

    return (
      <div className="App">
        <div className="App-header"><h2>Manager List</h2></div>
        <br /> <br />

        {
          managerList && <div>
            <button onClick={() => this.paginate(currentPage - 1)} disabled={currentPage == 1}> Prev </button>
            {currentPage} / {totalPages}
            <button onClick={() => this.paginate(currentPage + 1)} disabled={currentPage >= totalPages}> Next </button>
            {managerList.map((manager, index) => 
              <ListManagers
                {...manager}
                key={index}
                removeManager={this.removeManager}
                editManager={this.editManager}
              />
            )}
          </div>
        }
        
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {...state}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchManagers: ()       => {dispatch(fetchManagers())},
    removeManager: (id, managers = [])     => {dispatch(removeManager(id, managers))},
    editManager: (manager, managers = [])  => {dispatch(editManager(manager, managers))},
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

