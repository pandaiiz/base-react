import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';

const { confirm } = Modal;
const deleteConfirm = (api: any, record: any, ref: any) => {
  confirm({
    title: '确认删除吗？',
    icon: <ExclamationCircleFilled />,
    content: '删除后不可恢复！',
    onOk() {
      api({ id: record.id }).then(() => ref.current.reload());
    }
  });
};
export default deleteConfirm;