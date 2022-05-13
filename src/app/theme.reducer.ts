import { createReducer, on } from '@ngrx/store';
import { setTheme } from './theme.actions';

export const initialState: string = 'dark';

export const themeReducer = createReducer(
  initialState,
  on(setTheme, (state) => state === 'dark' ? 'light' : 'dark')
);