'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ProfilePhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex justify-center items-center mb-12"
    >
      {/* Outer frame with gradient */}
      <div className="relative w-64 h-80 md:w-72 md:h-96">
        {/* Glow background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-burnt/20 via-transparent to-gold-light/10 rounded-3xl blur-2xl" />

        {/* Decorative corner accents */}
        <div className="absolute -top-3 -left-3 w-12 h-12 border-2 border-gold-light rounded-full opacity-60" />
        <div className="absolute -bottom-3 -right-3 w-16 h-16 border-2 border-orange-burnt rounded-full opacity-40" />

        {/* Main frame border */}
        <div className="absolute inset-0 rounded-3xl border-2 border-gradient" style={{
          background: 'linear-gradient(135deg, rgba(250, 174, 27, 0.3), rgba(214, 81, 23, 0.2))',
          borderImage: 'linear-gradient(135deg, #FAAE1B, #D65117) 1',
        }} />

        {/* Inner spacing frame */}
        <div className="absolute inset-3 rounded-2xl border border-gold-light/30" />

        {/* Image container */}
        <div className="relative w-full h-full rounded-3xl overflow-hidden bg-navy/80 p-4">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
              src="/randy-jones.jpg"
              alt="Randy Jones - AI Leadership"
              fill
              className="object-cover object-top"
              priority
              quality={95}
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
