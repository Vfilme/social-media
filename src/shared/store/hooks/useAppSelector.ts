import { useSelector } from 'react-redux';
import { RootState } from '..';

export const useAppSelector = useSelector.withTypes<RootState>();
