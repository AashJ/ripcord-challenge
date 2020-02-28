import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import UserList from './UserList';
import toastr from 'toastr';

class UsersPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { checkedUsers: [], sorted: false };
  }

  redirectToAddUserPage = () => {
    this.props.history.push('/user');
  };

  deleteUser = (event, id) => {
    event.preventDefault();
    this.props.actions
      .deleteUser(id)
      .then(() => toastr.success('User deleted!'))
      .catch(error => toastr.error(error));
  };

  render() {
    let users = this.props.users;
    if (this.state.sorted) {
      users = [...this.props.users].sort((a, b) => {
        return a.id.localeCompare(b.id);
      });
    }
    return (
      <div>
        <h2>Users</h2>
        <input
          className="btn btn-primary"
          type="submit"
          value="Add User"
          onClick={this.redirectToAddUserPage}
        />
        <input
          className="btn btn-secondary"
          type="submit"
          value="Delete User"
          onClick={event => {
            this.state.checkedUsers.forEach(checkedUser => this.deleteUser(event, checkedUser));
            this.setState({ checkedUsers: [] });
          }}
        />
        <input
          className="btn btn-secondary"
          type="submit"
          value="Sort"
          onClick={event => {
            this.setState({ sorted: true });
          }}
        />
        <UserList
          users={users}
          deleteUser={this.deleteUser}
          checkedUserList={this.state.checkedUsers}
        />
      </div>
    );
  }
}

UsersPage.propTypes = {
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(userActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersPage);
