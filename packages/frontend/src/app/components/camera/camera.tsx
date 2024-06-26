import { useContext } from 'react';

// TODO: Configure Vite alias and tsconfig paths
import {
  makeStyles,
  mergeClasses,
  Subtitle2,
  Body1,
  Text,
  tokens,
} from '@fluentui/react-components';

import {
  CameraAddFilled,
  CameraOffFilled,
} from '@fluentui/react-icons';

import { Context } from '../../app';

/* TODO: Better reusage of types;
   camera data can be retrieved from e.g. codegen or single types files, and extended with component specifics
  */
type CameraProps = {
  name: string;
  niceName?: string;
  id: string;
  disabled: boolean;
  assignable: boolean;
  address: string;
};

const useStyles = makeStyles({
  camera: {
    border: `solid 2px #997000`,
    padding: '0.25rem 0.5rem',
    borderRadius: '8px',
  background: 'rgb(255, 224, 153)',
    display: 'flex',
    gap: '1rem',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  disabledCamera: {
    color: tokens.colorNeutralForeground4,
    background: '#fff7e6',
    border: 'solid 2px #c9c967',
  }, 
  icon: {
    position: 'relative',
    color: '#009DDC',
    cursor: 'pointer',
    alignSelf: 'center',
    display: 'grid',
    placeItems: 'center',
    fontSize: '2rem',
  },
  disabledIcon: { color: tokens.colorNeutralForegroundDisabled, cursor: 'default' },

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
  disabled,
  assignable,
  address,
}: CameraProps) => {
  const styles = useStyles();

  const { currentUser, assignCameraToUser, removeCameraFromUser } =
    useContext(Context);

  return (
    <div className={mergeClasses(styles.camera, disabled && styles.disabledCamera)}>
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
        className={mergeClasses(styles.icon, disabled && styles.disabledIcon)}
      >
        {/* TODO: Refactor to reusable/extensable icon component */}
        {assignable ? (
          <CameraAddFilled
            tabIndex={disabled ? -1 : 0}
            aria-label={!disabled && 'Assign camera to active user'}
            onClick={() => {
              !disabled && assignCameraToUser(id, currentUser?.id);
            }}
            onKeyUp={e => {
              e.key === 'Enter' && assignCameraToUser(id, currentUser?.id);
            }}
          />
        ) : (
          <CameraOffFilled
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
