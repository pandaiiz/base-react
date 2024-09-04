import { useState } from 'react'

function SerialPortReader() {
  const [port, setPort] = useState<any>()
  //   const [reader, setReader] = useState<any>()
  const [output, setOutput] = useState('')

  const connectSerialPort = async () => {
    const selectedPort = await navigator.serial.requestPort()
    // await openSerial()
    // await selectedPort.open({ baudRate: 9600 })
    setPort(selectedPort)
    /* const reader = selectedPort?.readable?.getReader()
    try {
      while (true && reader) {
        const { value, done } = await reader.read()
        if (done) {
          break
        }
        setOutput((prev) => prev + new TextDecoder().decode(value))
      }
    } catch (error) {
      console.error('Error opening the serial port:', error)
    } finally {
      reader?.releaseLock()
    } */
  }

  const openSerial = async () => {
    const SerialOptions = {
      baudRate: 9600,
      dataBits: 8,
      stopBits: 1,
      parity: 'none',
      bufferSize: 1024,
      flowControl: 'none'
    }
    if (port) {
      await port.open(SerialOptions)
      await readData()
    }
  }

  const readData = async () => {
    while (port.readable) {
      const reader = port.readable.getReader()
      try {
        while (true && reader) {
          const { value, done } = await reader.read()
          if (done) {
            break
          }
          setOutput((prev) => prev + new TextDecoder().decode(value))
        }
      } catch (error) {
        console.log(error)
      } finally {
        // reader.releaseLock()
      }
    }
    await port.close()
  }

  const closePort = async () => {
    const reader = port.readable.getReader()
    await reader?.cancel()
    setOutput('')
  }

  return (
    <div>
      <button onClick={connectSerialPort}>Connect Serial Port</button>
      <button onClick={openSerial}>Read Data</button>
      <button onClick={closePort}>Close Port</button>
      <div>
        <h3>Serial Output:</h3>
        <textarea rows={10} cols={50} value={output} readOnly></textarea>
      </div>
    </div>
  )
}

export default SerialPortReader
