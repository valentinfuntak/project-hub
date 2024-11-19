import { render } from 'solid-js/web';
import App from './App';
import './index.css';
import 'flowbite';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
  );
}

render(() => <App />, root);
