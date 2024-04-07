import { Icon } from '@iconify-icon/react';
import { FC } from 'react';

const IconPicker: FC<{ icon: string; size: number | undefined }> = ({ icon, size }) => {
  return <Icon icon={icon} style={{ fontSize: size }}/>;
};
export default IconPicker;