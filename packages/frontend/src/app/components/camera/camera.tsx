import { useContext } from 'react';

// TODO: Configure Vite alias and tsconfig paths
import {
  makeStyles,
  mergeClasses,
  Subtitle2,
  Body1,
  Text,
} from '@fluentui/react-components';

import { CameraAddFilled, CameraOffRegular } from '@fluentui/react-icons';

import { Context } from '../../app';

/* TODO: 
  Better reusage of types; camera data can be retrieved from e.g. codegen or single types files, and extended with component specifics
  */
type CameraProps = {
  name: string;
  niceName?: string;
  id: string;
  disabledIcon: boolean;
  assignable: boolean;
  address: string;
};

const useStyles = makeStyles({
  camera: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  disabled: { color: 'darkGrey', cursor: 'default' },
  icon: {
    cursor: 'pointer',
    alignSelf: 'center',
    display: 'grid',
    placeItems: 'center',
    fontSize: '2rem',
  },
  cameraData: { display: 'flex', flexDirection: 'column', width: '100%' },
  cameraDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const Camera = ({
  name,
  id,
  niceName = '',
  disabledIcon,
  assignable,
  address,
}: CameraProps) => {
  const styles = useStyles();

  const { currentUser, assignCameraToUser, removeCameraFromUser } =
    useContext(Context);

  return (
    <div className={styles.camera}>
      <div className={styles.cameraData}>
        <div>
          <Subtitle2 as="h4">{`${name}`}</Subtitle2>
        </div>

        <div className={styles.cameraDetails}>
          <Body1 italic block>{`${niceName || '-'}`}</Body1>
          <Text font="monospace">{address}</Text>
        </div>
      </div>

      <div
        className={mergeClasses(styles.icon, disabledIcon && styles.disabled)}
      >
        {/* TODO: Refactor to reusable/extensable icon component */}
        {assignable ? (
          <CameraAddFilled
            tabIndex={disabledIcon ? -1 : 0}
            aria-label={!disabledIcon && 'Assign camera to active user'}
            onClick={() => {
              !disabledIcon && assignCameraToUser(id, currentUser?.id);
            }}
            onKeyUp={e => {
              e.key === 'Enter' && assignCameraToUser(id, currentUser?.id);
            }}
          />
        ) : (
          <CameraOffRegular
            tabIndex={0}
            aria-label="Remove camera from active user"
            onClick={() => removeCameraFromUser(id, currentUser?.id)}
            onKeyUp={e => {
              e.key === 'Enter' && removeCameraFromUser(id, currentUser?.id);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Camera;
