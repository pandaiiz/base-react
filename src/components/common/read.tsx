/* import React, { useState } from 'react'

const SerialReader: React.FC = () => {
  const [data, setData] = useState<string>('')

  const connectSerial = async () => {
    try {
      // 请求用户选择串口设备
      const port = await navigator.serial.requestPort()

      // 设置串口连接参数，如波特率
      await port.open({ baudRate: 9600 })

      // 创建一个解码器，用于解码串口数据
      const textDecoder = new TextDecoderStream()
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable)
      const reader = textDecoder.readable.getReader()

      // 读取串口数据
      while (true) {
        const { value, done } = await reader.read()
        if (done) {
          break
        }
        setData((prevData) => prevData + value)
      }

      // 关闭连接
      reader.releaseLock()
      await readableStreamClosed
      await port.close()
    } catch (error) {
      console.error('Failed to connect to serial port:', error)
    }
  }

  return (
    <div>
      <button onClick={connectSerial}>Connect to Serial Port</button>
      <textarea value={data} readOnly rows={10} cols={50} />
    </div>
  )
}

export default SerialReader
 */
