// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

const gallery = document.querySelector('.gallery');

//Create galery by inserting images and links

console.log(galleryItems);

//Create galery by inserting images and links
galleryItems.forEach(el => {
  const div = document.createElement('div');
  div.classList.add('gallery__item');

  const link = document.createElement('a');
  link.classList.add('gallery__item');
  link.href = el.original;

  const img = document.createElement('img');
  img.classList.add('gallery__image');
  img.src = el.preview;
  img.alt = el.description;

  div.insertAdjacentElement('beforeend', link);
  link.insertAdjacentElement('beforeend', img);
  gallery.insertAdjacentElement('beforeend', div);
});

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
