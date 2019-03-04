import { library } from '@fortawesome/fontawesome-svg-core';

/**
 * Only import the definitions for icons actually in use to cut down on bundle size
 * Including the full far library increases the bundle by 1mb
 */
import { definition as faCheckCircle } from '@fortawesome/pro-regular-svg-icons/faCheckCircle';
import { definition as faCircle } from '@fortawesome/pro-regular-svg-icons/faCircle';
import { definition as faUsdSquare } from '@fortawesome/pro-regular-svg-icons/faUsdSquare';
import { definition as faClock } from '@fortawesome/pro-regular-svg-icons/faClock';
import { definition as faCameraRetro } from '@fortawesome/pro-regular-svg-icons/faCameraRetro';
import { definition as faStickyNote } from '@fortawesome/pro-regular-svg-icons/faStickyNote';
import { definition as faCog } from '@fortawesome/pro-regular-svg-icons/faCog';
import { definition as faSignOut } from '@fortawesome/pro-regular-svg-icons/faSignOut';
import { definition as faBars } from '@fortawesome/pro-regular-svg-icons/faBars';
import { definition as faTimes } from '@fortawesome/pro-regular-svg-icons/faTimes';
import { definition as faChevronDown } from '@fortawesome/pro-regular-svg-icons/faChevronDown';


export default () => {
  library.add(faCheckCircle);
  library.add(faCircle);
  library.add(faUsdSquare);
  library.add(faClock);
  library.add(faCameraRetro);
  library.add(faStickyNote);
  library.add(faCog);
  library.add(faSignOut);
  library.add(faBars);
  library.add(faTimes);
  library.add(faChevronDown);
};
