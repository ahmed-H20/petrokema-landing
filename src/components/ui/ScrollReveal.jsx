import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable ScrollReveal Wrapper Component using Framer Motion
 * 
 * Creates a smooth, premium 'Fade In and Slide Up' animation as sections
 * enter the viewport during scrolling.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children The section or element(s) to wrap and reveal
 * @param {number} [props.delay=0] Optional delay in seconds before animation triggers
 * @param {number} [props.yOffset=50] Initial vertical slide distance in pixels (defaults to 50)
 * @param {number} [props.duration=0.6] Animation duration in seconds (defaults to 0.6)
 * @param {number|string} [props.amount=0.2] Viewport threshold (0.2 = triggers when 20% visible)
 * @param {string} [props.className=''] Additional Tailwind / CSS classes for the container
 */
export const ScrollReveal = ({
  children,
  delay = 0,
  yOffset = 50,
  duration = 0.6,
  amount = 0.2,
  className = '',
  ...rest
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration,
        ease: 'easeOut',
        delay,
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
