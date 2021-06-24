import React, {useEffect} from 'react'
import { gql, useQuery } from '@apollo/client';

import PageLoading from "../util/PageLoading";

const GET_PROFILE = gql`
  query getOwnProfile {
    getOwnProfile {
      username
      email
      createdAt
    }
  }
`;
// { notifyOnNetworkStatusChange: true}
function Account() {
    const { loading, error, data } = useQuery(GET_PROFILE);

    if (loading) return <PageLoading />;
    if (error) return `Error! ${error.message}`;

    return (
        <div>
            <h1>Here you can see your account info</h1>
            <p>Email: <b>{data.getOwnProfile[0].email}</b></p>
            <p>Username: <b>{data.getOwnProfile[0].username}</b></p>
            <p>Created: <b>{String(new Date(data.getOwnProfile[0].createdAt))}</b></p>
        </div>
    )
}

export default Account
