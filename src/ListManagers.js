import React, { Component } from 'react';

class ListManagers extends Component {

  state = {
    showEdit: false,
    showBids: false,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showEdit: false,
      showBids: false,
    });
  }

  removeManager = () => {
    if(window.confirm(`Are you sure you want to delete manager: ${this.props.firstname}`)){
      this.props.removeManager(this.props.id);
    }
  }

  saveManager = () => {
    this.props.editManager(this.state.manager);
  }

  showHideBids = () => {
    this.setState({showBids: !this.state.showBids})
  }

  showHideEdit = () => {
    let manager = {};

    if(!this.state.showEdit) {
      manager = {
        id: this.props.id,
        firstname: this.props.firstname,
        lastname: this.props.lastname,
        email: this.props.email,
        phone: this.props.phone,
      }
    }
    this.setState({showEdit: !this.state.showEdit, manager})
  }

  inputChanger = (event) => {
    const elem = event.target.dataset.name;
    const manager = this.state.manager;
    manager[elem] = event.target.value;
    this.setState({manager});
  }

  render() {
    const {
      id,
      firstname,
      lastname,
      avatarUrl,
      email,
      phone,
      hasPremium,
      bids
    } = this.props;

    const {
      showBids,
      showEdit,
      manager
    } = this.state;

    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-left"> <img src={avatarUrl} width="50" /> </div>
          {
            !showEdit && 
            <div className="panel-right">
              <div className="panel-child">First Name  <span> {firstname} </span> </div>
              <div className="panel-child">Last Name   <span> {lastname} </span> </div>
              <div className="panel-child">Email       <span> {email} </span> </div>
              <div className="panel-child">Phone       <span> {phone} </span> </div>
            </div>
          }

          {
            showEdit &&
            <div className="panel-right">
              <div className="panel-child">First Name  <span> <input type="text" onChange={this.inputChanger} data-name="firstname" value={manager.firstname} /> </span> </div>
              <div className="panel-child">Last Name   <span> <input type="text" onChange={this.inputChanger} data-name="lastname" value={manager.lastname} /> </span> </div>
              <div className="panel-child">Email       <span> <input type="text" onChange={this.inputChanger} data-name="email" value={manager.email} /> </span> </div>
              <div className="panel-child">Phone       <span> <input type="text" onChange={this.inputChanger} data-name="phone" value={manager.phone} /> </span> </div>
              <br />
              <button onClick={this.saveManager} className="save"> Save </button>
            </div>
          }

          <div className="panel-right">
            <button onClick={this.showHideEdit}>  Edit </button> 
            <button onClick={this.removeManager}> Remove </button> 
            <button onClick={this.showHideBids}>  Bids </button> 
          </div>
        </div>

        {
          showBids &&
          <div className="panel panel-default">
            <table>
              <thead>
                <tr><th colSpan="3">Bids</th></tr>
                <tr>
                  <th>Car Title</th>
                  <th>Amount</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {
                  bids.map((bid, index) => 
                    <tr key={index}>
                      <td>{bid.carTitle}</td>
                      <td>{bid.amount}</td>
                      <td>{bid.created}</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    );
  }
}

export default ListManagers

