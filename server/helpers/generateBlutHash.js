const sharp = require('sharp');
const { encode } = require('blurhash');

// Function to convert image to raw pixel data
const getImageData = async (imagePath) => {
  const image = sharp(imagePath);
  const { data, info } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
};

// Function to generate BlurHash from image data
const generateBlurHash = async (imagePath) => {
  try {
    const { data, width, height } = await getImageData(imagePath);
    const blurHash = encode(new Uint8ClampedArray(data), width, height, 4, 4); // Components x, y
    return blurHash;
  } catch (error) {
    console.error('Error generating BlurHash:', error);
  }
};

// Example usage
const imagePath = 'p1.webp'; // Replace with the path to your image
let blurHash = await generateBlurHash(imagePath);

console.log(blurHash)