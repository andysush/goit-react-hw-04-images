import PropTypes from 'prop-types';
import { ImgItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';
export const ImgGallery = ({ imagesData, onModalOpen }) => {
  return (
    <GalleryList>
      {imagesData.map(({ id, tags, webformatURL, largeImageURL }) => {
        return (
          <ImgItem
            key={id}
            tags={tags}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onModalOpen={onModalOpen}
          ></ImgItem>
        );
      })}
    </GalleryList>
  );
};

ImgGallery.propTypes = {
  imagesData: PropTypes.arrayOf(PropTypes.object),
  onModalOpen: PropTypes.func.isRequired,
};
