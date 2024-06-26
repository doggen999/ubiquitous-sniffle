import { useContext } from 'react';

// TODO: Vite alias and tsconfig paths
import { Context } from '../../app';
import { Select } from '@fluentui/react-components';

// TODO: Better reusage of type declarations
type User = {
  id: string;
  name: string;
};

type LoginProps = {
  users: User[];
};

const SelectUser = ({ users }: LoginProps) => {
  const { selectUser } = useContext(Context);

  const selectUserHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectUser(users.filter(u => u.id === e.currentTarget.value)[0]);
  };

  return (
    <div>
      <Select defaultValue="" onChange={selectUserHandler}>
        <option disabled value="">
          Select user
        </option>

        {users.map(u => (
          <option key={`key_${u.id}`} value={u.id}>
            {u.name}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default SelectUser;
