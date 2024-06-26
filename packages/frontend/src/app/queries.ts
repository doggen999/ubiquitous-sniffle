import { graphql } from '../gql';

export const UsersQuery = graphql(`
  query UsersQuery {
    users {
      id
      name
      cameras {
        id
        name
        niceName
        address
      }
    }
  }
`);

export const CamerasQuery = graphql(`
  query CamerasQuery {
    cameras {
      id
      name
      niceName
      address
    }
  }
`);

export const addCameraToUserMutation = `
  mutation ($userId: ID!, $cameraId: ID!) {
    assignCameraToUser(userId: $userId, cameraId: $cameraId) {
        cameras {
            id
            name
            niceName
        }
    }
  }
`;

export const removeCameraFromUserMutation = `
  mutation ($userId: ID!, $cameraId: ID!) {
    removeCameraFromUser(userId: $userId, cameraId: $cameraId) {
      cameras {
        id
        name
        niceName
      }
    }
  }
`;
