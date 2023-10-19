import data from './data';
import contacts from './data';

export const deleteData = (index) => {
  data.splice(index, 1);
};