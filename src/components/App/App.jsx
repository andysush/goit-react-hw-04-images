import { useEffect, useState } from 'react';
import SearchBar from '../Searchbar/Searchbar';
import * as ImageService from 'services/pixabay';
import { ImgGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import Modal from '../Modal/Modal';
import css from './App.module.css';

export default function App() {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [imagesData, setImagesData] = useState([]);
  const [showBtn, setShowBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [err, setErr] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (value === '') return;
    setIsLoading(true);
    ImageService.getImages(value, page)
      .then(({ hits, totalHits }) => {
        if (!hits.length) {
          setIsEmpty(true);
          return;
        }
        setImagesData(prevImagesData => [...prevImagesData, ...hits]);
        setShowBtn(page < Math.ceil(totalHits / ImageService.perPage));
      })
      .catch(err => setErr(err.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, value]);

  const handleSubmit = value => {
    setValue(value);
    setPage(1);
    setImagesData([]);
    setErr('');
    setIsEmpty(false);
    setShowBtn(false);
  };
  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onModalOpen = (largeImageURL, tags) => {
    setIsOpenModal(true);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const onModalClose = () => {
    setIsOpenModal(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit}></SearchBar>
      {isEmpty && (
        <span className={css.text}>Sorry. There are no images found... 😭</span>
      )}
      {err && <span className={css.text}>Sorry. {err}😭</span>}
      <ImgGallery imagesData={imagesData} onModalOpen={onModalOpen} />
      {showBtn && <Button onClick={loadMore}></Button>}
      {isLoading && <Loader />}
      {isOpenModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          onModalClose={onModalClose}
        />
      )}
    </div>
  );
}
// }
