import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheck, faEye, faEyeSlash, faChevronDown, faTrash, faBars, faArrowDownWideShort, faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons";
import { faCircle, faCircleCheck, faPenToSquare } from "@fortawesome/free-regular-svg-icons";

library.add(faCheck, faEye, faEyeSlash, faChevronDown, faTrash, faCircle, faCircleCheck, faPenToSquare, faBars, faArrowDownWideShort, faArrowUpWideShort);

export { FontAwesomeIcon, dom, library };
