import React, { useEffect, useRef } from 'react'
import {motion,useAnimation, useInView} from 'framer-motion'
const  Animate = ({children,transition={duration:1,delay:0.3},once=true,initial={opacity:0,y:80},final={opacity:1,y:10}}) => {
  const ref = useRef(null);
  const isInView = useInView(ref,{once});
  const controllAnimation = useAnimation();

  useEffect(()=>{
    if(isInView) controllAnimation.start('final')

  },[isInView])

  return <motion.div ref={ref}
    variants={
      {
        initial,
        final
      }
    }
    initial="initial"
    animate={controllAnimation}
    transition={transition}
  >{children}</motion.div>
}

export default Animate;