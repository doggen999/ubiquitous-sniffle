import { useContext } from 'react';

// TODO: Vite alias & tsconfig paths
import Camera from '../camera';
import { Context } from '../../app';

// TODO: Better reusage of type declarations
type Camera = {
  id: string;
  name: string;
  niceName?: string;
  address: string;
};

type AllCamerasProps = {
  cameras: Camera[];
};

const AllCameras = ({ cameras }: AllCamerasProps) => {
  // TODO: Typing of context (createContext)
  const { currentUser } = useContext(Context);

  return (
    <div>
      {
        <ul>
          {cameras.map(camera => (
            <li key={camera.id}>
              <Camera
                assignable={true}
                disabledIcon={
                  !currentUser ||
                  // TODO: Typing of context (createContext)
                  // @ts-expect-error: c (camera) should be typed
                  currentUser?.cameras.some(c => c.id === camera.id)
                }
                {...camera}
              />
            </li>
          ))}
        </ul>
      }
    </div>
  );
};

export default AllCameras;
