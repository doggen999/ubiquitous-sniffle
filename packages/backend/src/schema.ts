import { GraphQLError } from "graphql";
import { createSchema } from "graphql-yoga";

const typeDefinition = /* GraphQL */ `
  type Query {
    cameras: [Camera!]!
    users: [User]
  }

  type Mutation {
    addCamera(name: String!, niceName: String, address: String!): Camera!
    assignCameraToUser(userId: ID!, cameraId: ID!): User
    removeCameraFromUser(userId: ID!, cameraId: ID!): User
  }

  type Camera {
    id: ID!
    name: String!
    niceName: String
    address: String!
  }

  type User {
    id: ID!
    name: String!
    cameras: [Camera!]!
  }
`;

// TODO: Refactor - this types can be reused in frontend solution
type Camera = {
  id: string;
  name: string;
  niceName?: string;
  address: string;
};

type User = {
  id: string;
  name: string;
  cameras: Camera[];
};

const cameras: Camera[] = [
  {
    id: "0",
    name: "A8207-VE MKII",
    address: "192.168.1.101",
  },
  {
    id: "1",
    name: "I8307-VE",
    niceName: "My Device",
    address: "192.168.1.102",
  },
  {
    id: "2",
    name: "Camera name",
    niceName: "Nice camera",
    address: "192.0.0.255",
  },
];

const users: User[] = [
  { id: "0", name: "User 1", cameras: [cameras[1]] },
  {
    id: "1",
    name: "User 2",
    cameras: [],
  },
];

const resolvers = {
  Query: {
    cameras: () => cameras,
    users: () => users,
  },

  Mutation: {
    addCamera: (parent: unknown, args: Omit<Camera, "id">) => {
      const id = cameras.length;

      const camera: Camera = {
        id: `${id}`,
        ...args,
      };

      cameras.push(camera);

      return camera;
    },

    assignCameraToUser: (_, args) => {
      const user = users.find((u) => u.id === args.userId),
        camera = cameras.find((c) => c.id === args.cameraId);

      if (user.cameras.some((c) => c.id === camera.id)) {
        throw new GraphQLError("Camera is already assigned to user");
      }

      user.cameras.push(camera);

      return user;
    },

    removeCameraFromUser: (_, args) => {
      const user = users.find((u) => u.id === args.userId);

      const indexOfCameraToRemove = user.cameras.findIndex(
        (c) => c.id === args.cameraId
      );

      if (indexOfCameraToRemove === -1) {
        throw new GraphQLError("Cant find camera to remove");
      }

      user.cameras.splice(indexOfCameraToRemove, 1);

      return user;
    },
  },
  // STUDY: Vad gör denna, "Camera" i resovlers?
  Camera: {
    id: (parent: Camera) => parent.id,
    name: (parent: Camera) => parent.name,
    niceName: (parent: Camera) => parent.niceName,
    address: (parent: Camera) => parent.address,
  },
};

export const schema = createSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinition],
});
