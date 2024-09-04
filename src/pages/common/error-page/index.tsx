import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="此页面不存在！"
      extra={
        <Button
          type="primary"
          onClick={() =>
            navigate('/', {
              replace: true
            })
          }
        >
          返回主页面
        </Button>
      }
    />
  )
}
export default ErrorPage
