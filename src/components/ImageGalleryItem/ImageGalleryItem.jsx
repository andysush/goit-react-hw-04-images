import PropTypes from 'prop-types';
import { GalleryItem, Image } from './ImageGalleryItem.styled';

export const ImgItem = ({ tags, webformatURL, largeImageURL, onModalOpen }) => {
  return (
    <GalleryItem
      onClick={() => {
        onModalOpen(largeImageURL, tags);
      }}
    >
      <Image src={webformatURL} alt={tags} />
    </GalleryItem>
  );
};

ImgItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onModalOpen: PropTypes.func.isRequired,
};
