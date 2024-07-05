import { ExclamationCircleFilled } from '@ant-design/icons'
import { App } from 'antd'

const useDeleteConfirm = (api: any, record: any, ref: any) => {
  const { modal } = App.useApp()
  modal.confirm({
    title: '确认删除吗？',
    icon: <ExclamationCircleFilled />,
    content: '删除后不可恢复！',
    onOk() {
      api({ id: record.id }).then(() => ref.current.reload())
    }
  })
}
export default useDeleteConfirm
