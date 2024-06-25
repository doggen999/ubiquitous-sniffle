import { useContext } from 'react';

import { makeStyles, mergeClasses, Body1 } from '@fluentui/react-components';

// TODO: Vite alias & tsconfig paths
import { Context } from '../../app';
// TODO: Vite alias & tsconfig paths
import Camera from '../camera';

// TODO: Better reusabe of type declarations
type Camera = {
  id: string;
  name: string;
  niceName?: string;
  address: string;
};

type UserCamerasProps = {
  cameras: Camera[];
};

const useStyles = makeStyles({
  marginV: { marginLeft: '1rem', marginRight: '1rem' },
  marginH: { marginTop: '1rem', marginBottom: '1rem' },
});

// TODO: Typing of Context (createContext & useContext)
const UserCameras = ({ cameras }: UserCamerasProps) => {
  const styles = useStyles();

  const { currentUser } = useContext(Context);

  return (
    <div>
      {currentUser ? (
        cameras?.length ? (
          <ul>
            {cameras?.map(c => (
              <li key={`user-camera-${c.id}`}>
                <Camera
                  name={c.name}
                  niceName={c.niceName}
                  id={c.id}
                  disabledIcon={false}
                  assignable={false}
                  address={c.address}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className={mergeClasses(styles.marginV, styles.marginH)}>
            <Body1>User has no cameras assigned</Body1>
          </div>
        )
      ) : (
        <div className={mergeClasses(styles.marginV, styles.marginH)}>
          <Body1>Please select a user</Body1>
        </div>
      )}
    </div>
  );
};

export default UserCameras;
