import { motion } from 'framer-motion';

import { Container } from './types';

const MotionButton: Container = ({children}) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
  >
    {children}
  </motion.div>
);

export default MotionButton;
