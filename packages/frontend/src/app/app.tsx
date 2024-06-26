import { createContext, useEffect, useState } from 'react';

import { useMutation, useQuery } from 'urql';

import {
  makeStyles,
  makeStaticStyles,
  tokens,
  LargeTitle,
  Title1,
  Title3,
  Body1,
  Subtitle1,
} from '@fluentui/react-components';

import {
  UsersQuery,
  CamerasQuery,
  addCameraToUserMutation,
  removeCameraFromUserMutation,
} from './queries';

import { SelectUser, AllCameras, UserCameras } from './components';

const useStaticStyles = makeStaticStyles({
  '@font-face': {
    fontFamily: 'Open Sans',
    src: `url("../../assets/OpenSans-Medium.ttf")`,
  },
  body: {
    margin: '0',
    padding: '0',
    background: 'linear-gradient(90deg, #fff 50%, #FFCC32)',
    backgroundSize: '100% 20px',
    backgroundRepeat: 'no-repeat',
  },
});

const useStyles = makeStyles({
  //N.B. dont use colors directly, i.e. !'red'; use color tokens from themes
  app: {
    margin: '1rem',

    '& ul': {
      listStyleType: 'none',
      padding: '0',
      paddingLeft: '1rem',
      '& li': { marginBottom: '1rem', '&:last-child': { margin: '0' } },
    },
  },
  error: { color: tokens.colorPaletteRedForeground3, fontWeight: 'bold' },
  cameraGridWrapper: { padding: '0 0.5rem', paddingTop: '0.5rem' },
  cameraGrid: {
    display: 'grid',
    gridTemplate: 'auto auto auto / 1fr 1fr',
    gridGap: '0.25rem',
    padding: '1rem',
    background: 'linear-gradient(270deg, white -25%, #ffcc33)',
    borderRadius: '8px',
    border: '2px solid #997000',
  },
});

export const Context = createContext(null);

const App = () => {
  useStaticStyles();
  const styles = useStyles();

  const [currentUser, setCurrentUser] = useState(null);

  const [usersResult] = useQuery({
    query: UsersQuery,
  });

  const [camerasResult] = useQuery({
    query: CamerasQuery,
  });

  // TODO user type from codegen
  // @ts-expect-error: typing of user
  const selectUser = user => {
    setCurrentUser(user);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [assignCameraToUserResult, assignCameraToUserExecutor] = useMutation(
    addCameraToUserMutation
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [removeCameraFromUserResult, removeCameraFromUserExecutor] =
    useMutation(removeCameraFromUserMutation);

  const assignCameraToUser = (cameraId: string, userId: string) => {
    if (cameraId && userId) {
      assignCameraToUserExecutor({ cameraId, userId });
    }
  };

  const removeCameraFromUser = (cameraId: string, userId: string) => {
    if (cameraId && userId) {
      removeCameraFromUserExecutor({
        cameraId,
        userId,
      });
    }
  };

  useEffect(() => {
    // make sure currentUser have user data that is up to date by reassigning on any change of userResult queried from GraphQL
    setCurrentUser(usersResult.data?.users.find(u => u.id === currentUser?.id));
  }, [usersResult]);

  return (
    // TODO useMemo on context value: https://react.dev/reference/react/useContext#optimizing-re-renders-when-passing-objects-and-functions
    <Context.Provider
      value={{
        currentUser,
        selectUser,
        assignCameraToUser,
        removeCameraFromUser,
      }}
    >
      <div className={styles.app}>
        <div>
          <LargeTitle as="h1" block>
            Ubiquitous Sniffle
          </LargeTitle>

          <Body1 as="p" block>
            View all cameras, view cameras assigned to a user and administrate
            the assignment of cameras.
          </Body1>

          <Title1 as="h2">Cameras</Title1>

          <div className={styles.cameraGridWrapper}>
            {usersResult.fetching || camerasResult.fetching ? (
              <Body1 as="p" block>
                Loading...
              </Body1>
            ) : usersResult.error || camerasResult.error ? (
              <div>
                <Title3 as="h3" block>
                  Error
                </Title3>

                <Body1 className={styles.error}>
                  {usersResult.error.message}
                </Body1>
              </div>
            ) : (
              <div className={styles.cameraGrid}>
                <div>
                  <Subtitle1 as="h3">Available cameras</Subtitle1>
                </div>

                <div>
                  <Subtitle1 as="h3">Assigned cameras</Subtitle1>
                </div>

                {/* HACK to get UI to align with grid */}
                {/* TODO Refactor, use grid area and remove this "spacer" */}
                <div></div>

                <SelectUser users={usersResult.data.users} />

                <AllCameras cameras={camerasResult.data.cameras} />

                <UserCameras
                  cameras={
                    currentUser
                      ? usersResult?.data?.users.filter(
                          u => u.id === currentUser.id
                        )[0].cameras
                      : null
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Context.Provider>
  );
};

export default App;
