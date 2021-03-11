import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Table, Button } from 'reactstrap';
import AdminDeleteModal from './AdminDeleteModal';
import { Trash2 } from 'react-feather';

const GET_REGISTERED_USERS = gql`
  query getRegisteredUsers {
    getRegisteredUsers {
      username
      email
      createdAt
      admin
      id
    }
  }
`;

function ListOfUsers() {
  const { loading, error, data, refetch } = useQuery(GET_REGISTERED_USERS);

  const [removeModal, setRemoveModal] = useState(false);
  const [currentRemove, setCurrentRemove] = useState({
    idToDelete: null,
    whatToDelete: null,
    name: null,
  });

  if (loading) return <h1>Loading..</h1>;
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      <AdminDeleteModal
        modal={removeModal}
        close={() => setRemoveModal(false)}
        current={currentRemove}
        refetch={refetch}
      />
      <Table responsive striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Admin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.getRegisteredUsers.map((user) => (
            <tr>
              <th scope="row">{user.id}</th>
              <td onClick={() => console.log(user.username)}>{user.username}</td>
              <td>{user.email}</td>
              <td>{new Date(Number(user.createdAt)).toString()}</td>
              <td>
                {user.admin ? (
                  <b>
                    <p style={{ color: 'green' }}>YES</p>
                  </b>
                ) : (
                  <b>
                    <p style={{ color: 'red' }}>NO</p>
                  </b>
                )}
              </td>
              <td>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => {
                    setCurrentRemove({ idToDelete: user.id, whatToDelete: 'user', name: user.username });
                    setRemoveModal(true);
                  }}
                >
                  <Trash2 size={20} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListOfUsers;
