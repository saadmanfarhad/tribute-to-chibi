import { motion } from "framer-motion";

const Carousel = ({
  images,
  previousImage,
  nextImage,
  setImage,
  imageIndex,
}) => {
  const getSmallerImages = () => {
    const startIndex = imageIndex - 2;
    const endIndex = imageIndex + 3;
    let smallerImages = [];
    if (startIndex >= 0 && endIndex <= images.length) {
      smallerImages = images.slice(startIndex, endIndex);
    } else {
      if (imageIndex === 0) {
        smallerImages = [
          ...images.slice(images.length - 2),
          ...images.slice(0, 3),
        ];
      } else if (imageIndex === 1) {
        smallerImages = [
          ...images.slice(images.length - 1),
          ...images.slice(0, 4),
        ];
      } else if (imageIndex === images.length - 1) {
        smallerImages = [
          ...images.slice(images.length - 3),
          ...images.slice(0, 2),
        ];
      } else {
        smallerImages = [
          ...images.slice(images.length - 4),
          ...images.slice(0, 1),
        ];
      }
    }

    return smallerImages.map((image, index) => (
      <div>
        <img
          className={`image1 description ${
            images[imageIndex] === image ? `opacity-100` : `opacity-50`
          } h-24 hover:opacity-100 cursor-pointer`}
          src={image}
          onClick={() => {
            const index = images.findIndex((url: string) => image === url);
            setImage(index);
          }}
          alt="Dog's Nose"
        />
      </div>
    ));
  };
  return (
    <section className="mx-auto max-w-2xl">
      <h2 className="text-4xl text-gray-200 text-center tracking-wide font-extrabold font-serif leading-loose mb-2">
        Tribute to Chibi
      </h2>
      <div className="shadow-2xl relative">
        {/* <!-- large image on slides --> */}
        <div className="mySlides">
          <motion.div
            key={images[imageIndex]}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                scale: 0.8,
                opacity: 0,
              },
              visible: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: 0.5,
                },
              },
            }}
            className="image1 w-full object-cover"
          >
            <img src={images[imageIndex]} />
          </motion.div>
        </div>

        {/* <!-- butttons --> */}
        <a
          className="absolute left-0 text-blue-500 inset-y-0 flex items-center -mt-32 px-4 text-white hover:text-gray-800 cursor-pointer text-3xl font-extrabold"
          onClick={() => previousImage()}
        >
          ???
        </a>
        <a
          className="absolute right-0 text-blue-500 inset-y-0 flex items-center -mt-32 px-4 text-white hover:text-gray-800 cursor-pointer text-3xl font-extrabold"
          onClick={() => nextImage()}
        >
          ???
        </a>

        {/* <!-- image description --> */}
        <div className="text-center text-white font-light tracking-wider bg-gray-800 py-2">
          <p id="caption"></p>
        </div>

        {/* <!-- smaller images under description --> */}
        <div className="flex items-center justify-center">
          {getSmallerImages()}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
