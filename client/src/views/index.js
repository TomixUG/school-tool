import Home from './pages/Home';
import ErrorPage from './pages/404';
import Test from './pages/Test';
import Account from './pages/Account';
import PrivacyPolicy from './pages/PrivacyPolicy';

import CardDeckList from './pages/flashcards/CardDeckList';
import Deck from './pages/flashcards/Deck';
import AddCard from './pages/flashcards/Deck/AddCard';
import FPlay from './pages/flashcards/Play/Play';

//admin
import ListOfUsers from './pages/admin/ListOfUsers';

const pageList = [
  {
    name: 'Home',
    path: '/home',
    component: Home,
  },
  {
    name: 'My test page',
    path: '/test',
    component: Test,
  },
  {
    name: 'Account',
    path: '/account',
    component: Account,
  },
  {
    name: 'Privacy policy',
    path: '/privacy',
    component: PrivacyPolicy,
  },
  {
    name: 'List of all users',
    path: '/admin/users',
    component: ListOfUsers,
    admin: true,
  },
  {
    name: '404',
    path: '/pages/404',
    component: ErrorPage,
  },
  {
    name: 'Flashcards',
    path: '/flashcards',
    component: CardDeckList,
  },
  {
    name: 'Deck',
    path: '/flashcards/deck/:id',
    component: Deck,
  },
  {
    name: 'Add new card',
    path: '/flashcards/deck/:id/addcard',
    component: AddCard,
  },
  {
    name: 'Play',
    path: '/flashcards/deck/:id/play',
    component: FPlay,
  },
];

export default pageList;
