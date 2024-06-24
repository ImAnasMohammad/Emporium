import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Blurhash } from 'react-blurhash';
import PropTypes from 'prop-types';

const LazyLoadImage = ({ src, alt, blurHash, width, height,style }) => {
  const [loaded, setLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} style={{ position: 'relative', width,height }}>
      {!loaded && (
        <Blurhash
          hash={blurHash}
          width={width}
          height={height}
          punch={1}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      )}
      {inView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          style={{
            ...style,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.7s ease-in-out',
          }}
        />
      )}
    </div>
  );
};

LazyLoadImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  blurHash: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default LazyLoadImage;
