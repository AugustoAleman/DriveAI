import { Store } from 'react-stores';

export interface CompareListStore {
  compareList: number[];
}

export const ListCompareStore = new Store<CompareListStore>({
  compareList: localStorage.getItem('compareList')
  ? JSON.parse(localStorage.getItem('compareList')!)
  : [],
});
export const addToCompareListAction = (element: number) => {
  ListCompareStore.setState({ compareList: ListCompareStore.state.compareList.concat(element) });
  localStorage.setItem('compareList', JSON.stringify(ListCompareStore.state.compareList));
};
export const deleteFromCompareListAction = (value: number) => {
  ListCompareStore.setState({
    compareList: ListCompareStore.state.compareList.filter((element) => element !== value),
  });
  localStorage.setItem('compareList', JSON.stringify(ListCompareStore.state.compareList));
};
export const isElementInCompareList = (element: number): boolean => {
  const compareList = ListCompareStore.state.compareList;
  const storedNumbers = compareList.filter((num) => typeof num === 'number');
  return storedNumbers.includes(element);
};
export const getCompareList = (): number[] => {
  return ListCompareStore.state.compareList;
};