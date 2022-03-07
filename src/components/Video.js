import { useEffect, useRef } from 'react'
import styles from './Video.module.css'

export default function Video({ srcObject, ...props }) {
  const refVideo = useRef(null)

  useEffect(() => {
    if (!refVideo.current) return
    refVideo.current.srcObject = srcObject
    refVideo.current.onloadedmetadata = e => {
      refVideo.current.play();
    };
  }, [srcObject])

  return <video id={styles.videoCamera} ref={refVideo} {...props} />
}
