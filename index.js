/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './js/App';
import {name as appName} from './app.json';
import Root from './js/store'

AppRegistry.registerComponent(appName, () => Root);
