import React from 'react';
import PropTypes, { array } from 'prop-types';
import { Link } from 'react-router-dom';

const UserListRow = ({ user, deleteUser, checkedUserList }) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          style={{ marginRight: '8px' }}
          onChange={() => {
            if (checkedUserList.includes(user.id)) {
              const index = checkedUserList.indexOf(user.id);
              if (index > -1) {
                checkedUserList.splice(index, 1);
              }
            } else {
              checkedUserList.push(user.id);
            }
          }}
        />
        <a href="#" onClick={event => deleteUser(event, user.id)}>
          Delete
        </a>
      </td>
      <td>
        <Link to={`/user/${user.id}`}>{user.id}</Link>
      </td>
      <td>
        {user.firstName} {user.lastName}
      </td>
    </tr>
  );
};

UserListRow.propTypes = {
  user: PropTypes.object.isRequired,
};
export default UserListRow;
